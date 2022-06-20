const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver } = require('./palette');
fabric = require('fabric').fabric;

module.exports = async (subredditName, subredditIcon, postAuthor, postTimeago, postTitle, postScore, postCommentAmount) => {
    try {
        loadFonts();
        const title = loadPostTitle(postTitle);

        // Rendering main content
        const canvas = renderCanvas(title.height);
        await renderSubredditIcon(canvas, subredditIcon);
        await renderSubredditName(canvas, subredditName);
        await renderPostTitle(canvas, title);
        const postAuthorTextWidth = await renderPostAuthor(canvas, postAuthor);
        await renderPostTimeago(canvas, postAuthorTextWidth, postTimeago);

        // Rendering bottom row
        await renderPostUpvoteIcon(canvas);
        const scoreWidth = await renderPostScore(canvas, postScore);
        await renderPostDownvoteIcon(canvas, scoreWidth);
        await renderPostCommentIcon(canvas, scoreWidth);
        await renderCommentAmount(canvas, scoreWidth, postCommentAmount);
        await renderPostActions(canvas, scoreWidth);
    } catch (err) {
        console.log(err);
    }
};

async function write(canvas, object) {
    canvas.add(object);
    canvas.renderAll();
    out = fs.createWriteStream(__dirname + `/output/submission.png`);
    const stream = canvas.createPNGStream();
    await new Promise((resolve, reject) => {
        stream.on('data', function (chunk) {
            out.write(chunk);
            resolve();
        });
    });
    return null;
}

function loadFonts() {
    fabric.nodeCanvas.registerFont(__dirname + '/fonts/NotoSans-Medium.ttf', {
        family: 'Noto Sans', weight: 'Medium', style: 'normal'
    });
    fabric.nodeCanvas.registerFont(__dirname + '/fonts/IBMPlexSans-SemiBold.ttf', {
        family: 'IBM Plex Sans', weight: 'SemiBold', style: 'normal'
    });
    fabric.nodeCanvas.registerFont(__dirname + '/fonts/IBMPlexSans-Bold.ttf', {
        family: 'IBM Plex Sans', weight: 'Bold', style: 'normal'
    });
    return null;
}

function loadPostTitle(postTitle) {
    const postTitleText = new fabric.Textbox(postTitle, {
        width: 1800,
        top: 280,
        left: 45,
        fill: lightSilver,
        fontSize: 230,
        fontFamily: 'IBM Plex Sans',
        fontWeight: 'Bold'
    });

    // Fit text into image
    let fit = false;
    while (!fit) {
        let size = postTitleText.fontSize;
        if (Math.round(postTitleText.height) > 561) {
            postTitleText.set({
                fontSize: size - 1
            });
        } else {
            fit = true;
        }
    }

    return postTitleText;
}

function renderCanvas() {
    const canvas = new fabric.StaticCanvas(null, {
        width: 1920,
        height: 1080,
        backgroundColor: eerieBlack
    });
    return canvas;
}

async function renderSubredditIcon(canvas, subredditIcon) {
    await new Promise((resolve, reject) => {
        try {
            const src = subredditIcon;
            fabric.util.loadImage('file://' + __dirname + '/resources/askreddit.png', async function (img) {
                const subredditIcon = new fabric.Image(img);
                subredditIcon.set({
                    top: 40,
                    left: 40,
                });
                subredditIcon.scale(0.7);
                await write(canvas, subredditIcon);
                resolve();
            });
        } catch (error) {
            reject(error);
        }

    });
    return null;
}

async function renderPostTitle(canvas, postTitleText) {
    await write(canvas, postTitleText);
    return null;
}

async function renderPostAuthor(canvas, postAuthor) {
    const postAuthorText = new fabric.Text(postAuthor, {
        top: 130,
        left: 240,
        fill: oldSilver,
        fontSize: 54,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    await write(canvas, postAuthorText);
    return postAuthorText.width;
}

async function renderSubredditName(canvas, subredditName) {
    const subredditNameText = new fabric.Text(subredditName, {
        top: 60,
        left: 240,
        fill: lightSilver,
        fontSize: 50,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    await write(canvas, subredditNameText);
    return null;
}

async function renderPostTimeago(canvas, offset, postTimeago) {
    const postTimeagoText = new fabric.Text(postTimeago, {
        top: 140,
        left: offset + 250,
        fill: oldSilver,
        fontSize: 40,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    await write(canvas, postTimeagoText);
    return null;
}

async function renderPostUpvoteIcon(canvas) {
    await new Promise((resolve, reject) => {
        try {
            const src = 'file://' + __dirname + '/resources/upvote.png';
            fabric.util.loadImage(src, async function (img) {
                const postUpvoteIcon = new fabric.Image(img);
                postUpvoteIcon.set({
                    top: 895,
                    left: 77,
                });
                postUpvoteIcon.scale(0.1);
                await write(canvas, postUpvoteIcon);
                resolve();
            });
        } catch (error) {
            reject(error);
        }

    });
    return null;
}

async function renderPostScore(canvas, postScore) {
    const text = new fabric.Text(postScore, {
        top: 915,
        left: 180,
        fill: oldSilver,
        fontSize: 50,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    await write(canvas, text);
    return text.width;
}

async function renderPostDownvoteIcon(canvas, postScoreWidth) {
    await new Promise((resolve, reject) => {
        try {
            const src = 'file://' + __dirname + '/resources/upvote.png';
            fabric.util.loadImage(src, async function (img) {
                const postDownvoteIcon = new fabric.Image(img);
                postDownvoteIcon.set({
                    top: 895,
                    left: postScoreWidth + 190,
                });
                postDownvoteIcon.scale(0.1);
                postDownvoteIcon.rotate(180);
                await write(canvas, postDownvoteIcon);
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
    return null;
}

async function renderPostCommentIcon(canvas, postScoreWidth) {
    await new Promise((resolve, reject) => {
        try {
            const src = 'file://' + __dirname + '/resources/commenticon.png';
            fabric.util.loadImage(src, async function (img) {
                const postCommentIcon = new fabric.Image(img);
                postCommentIcon.set({
                    top: 885,
                    left: postScoreWidth + 325,
                });
                await write(canvas, postCommentIcon);
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
    return null;
}

async function renderCommentAmount(canvas, postScoreWidth, commentAmount) {
    const commentAmountText = new fabric.Text(commentAmount, {
        top: 915,
        left: postScoreWidth + 450,
        fill: oldSilver,
        fontSize: 45,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    await write(canvas, commentAmountText);
    return null;
}

async function renderPostActions(canvas, postScoreWidth) {
    const postActionsText = new fabric.Text("@rslashbot v1.0.0", {
        top: 915,
        left: postScoreWidth + 700,
        fill: oldSilver,
        fontSize: 45,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    await write(canvas, postActionsText);
    return null;
}