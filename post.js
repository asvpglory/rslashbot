const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (subredditName, subredditIcon, postAuthor, postTimeago, postTitle, postScore, postCommentAmount, postActions) => {
    loadFonts();
    const title = loadPostTitle(postTitle);

    // Rendering main content
    const canvas = renderCanvas(title.height);
    renderSubredditIcon(canvas, subredditIcon);
    renderSubredditName(canvas, subredditName);
    renderPostTitle(canvas, title);
    const postAuthorTextWidth = renderPostAuthor(canvas, postAuthor);
    renderPostTimeago(canvas, postAuthorTextWidth, postTimeago);

    // Rendering bottom row
    renderPostUpvoteIcon(canvas);
    const scoreWidth = renderPostScore(canvas, postScore);
    renderPostDownvoteIcon(canvas, scoreWidth);
    renderPostCommentIcon(canvas, scoreWidth);
    renderCommentAmount(canvas, scoreWidth, postCommentAmount);
    renderPostActions(canvas, scoreWidth, postActions);
};

function write(canvas, object) {
    canvas.add(object);
    canvas.renderAll();
    out = fs.createWriteStream(__dirname + `/output/submission.png`);
    const stream = canvas.createPNGStream();
    stream.on('data', function (chunk) {
        out.write(chunk);
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

function renderSubredditIcon(canvas, subredditIcon) {
    queueMicrotask(() => {
        const src = subredditIcon;
        fabric.util.loadImage('file://' + __dirname + '/resources/askreddit.png', function (img) {
            const subredditIcon = new fabric.Image(img);
            subredditIcon.set({
                top: 40,
                left: 40,
            });
            subredditIcon.scale(0.7);
            write(canvas, subredditIcon);
        });
    });
    return null;
}

function renderPostTitle(canvas, postTitleText) {
    write(canvas, postTitleText);
    return null;
}

function renderPostAuthor(canvas, postAuthor) {
    const postAuthorText = new fabric.Text(postAuthor, {
        top: 130,
        left: 240,
        fill: oldSilver,
        fontSize: 54,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    write(canvas, postAuthorText);
    return postAuthorText.width;
}

function renderSubredditName(canvas, subredditName) {
    const subredditNameText = new fabric.Text(subredditName, {
        top: 60,
        left: 240,
        fill: lightSilver,
        fontSize: 50,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    write(canvas, subredditNameText);
    return null;
}

function renderPostTimeago(canvas, offset, postTimeago) {
    const postTimeagoText = new fabric.Text(postTimeago, {
        top: 140,
        left: offset + 250,
        fill: oldSilver,
        fontSize: 40,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, postTimeagoText);
    return null;
}

function renderPostUpvoteIcon(canvas) {
    queueMicrotask(() => {
        const src = 'file://' + __dirname + '/resources/upvote.png';
        fabric.util.loadImage(src, function (img) {
            const postUpvoteIcon = new fabric.Image(img);
            postUpvoteIcon.set({
                top: 895,
                left: 77,
            });
            postUpvoteIcon.scale(0.1);
            write(canvas, postUpvoteIcon);
        });
    });
    return null;
}

function renderPostScore(canvas, postScore) {
    const text = new fabric.Text(postScore, {
        top: 915,
        left: 180,
        fill: oldSilver,
        fontSize: 50,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return text.width;
}

function renderPostDownvoteIcon(canvas, postScoreWidth) {
    queueMicrotask(() => {
        const src = 'file://' + __dirname + '/resources/upvote.png';
        fabric.util.loadImage(src, function (img) {
            const postDownvoteIcon = new fabric.Image(img);
            postDownvoteIcon.set({
                top: 895,
                left: postScoreWidth + 190,
            });
            postDownvoteIcon.scale(0.1);
            postDownvoteIcon.rotate(180);
            write(canvas, postDownvoteIcon);
        });
    });
    return null;
}

function renderPostCommentIcon(canvas, postScoreWidth) {
    queueMicrotask(() => {
        const src = 'file://' + __dirname + '/resources/commenticon.png';
        fabric.util.loadImage(src, function (img) {
            const postCommentIcon = new fabric.Image(img);
            postCommentIcon.set({
                top: 885,
                left: postScoreWidth + 325,
            });
            write(canvas, postCommentIcon);
        });
    });
    return null;
}

function renderCommentAmount(canvas, postScoreWidth, commentAmount) {
    const commentAmountText = new fabric.Text(commentAmount, {
        top: 915,
        left: postScoreWidth + 450,
        fill: oldSilver,
        fontSize: 45,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentAmountText);
    return null;
}

function renderPostActions(canvas, postScoreWidth, commentActions) {
    const postActionsText = new fabric.Text(commentActions, {
        top: 915,
        left: postScoreWidth + 700,
        fill: oldSilver,
        fontSize: 45,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, postActionsText);
    return null;
}