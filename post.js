const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (subredditName, subredditIcon, postAuthor, postTimeago, postTitle, postScore, postCommentAmount, postActions) => {
    loadFonts();
    const title = loadPostTitle(postTitle);
    const titleHeight = title.height;

    // Main rendering
    const canvas = renderCanvas(titleHeight);
    renderSubredditIcon(canvas, subredditIcon);
    renderSubredditName(canvas, subredditName);
    renderPostTitle(canvas, title);
    const postAuthorTextWidth = renderPostAuthor(canvas, postAuthor);
    renderPostTimeago(canvas, postAuthorTextWidth, postTimeago);

    // Rendering bottom row
    renderPostUpvoteIcon(canvas, titleHeight);
    const scoreWidth = renderPostScore(canvas, titleHeight, postScore);
    renderPostDownvoteIcon(canvas, titleHeight, scoreWidth);
    renderPostCommentIcon(canvas, titleHeight, scoreWidth);
    renderCommentAmount(canvas, titleHeight, scoreWidth, postCommentAmount);
    renderPostActions(canvas, titleHeight, scoreWidth, postActions);
};

function write(canvas, object) {
    canvas.add(object);
    canvas.renderAll();
    // out = fs.createWriteStream(__dirname + '/desktop/output/models/submission.png');
    out = fs.createWriteStream(__dirname + `/output/submission.png`);
    const stream = canvas.createPNGStream();
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
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
        left: 37,
        fill: lightSilver,
        fontSize: 135,
        fontFamily: 'IBM Plex Sans',
        fontWeight: 'Bold'
    });
    return postTitleText;
}

function renderCanvas(titleHeight) {
    const canvas = new fabric.StaticCanvas(null, {
        // width: 900,
        // height: titleHeight + 140,

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
                left: 40,
                top: 40,
            });
            subredditIcon.scale(0.7);
            write(canvas, subredditIcon);
        });
    });
    // return null;
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
}

function renderPostUpvoteIcon(canvas, textHeight) {
    queueMicrotask(() => {
        const src = 'file://' + __dirname + '/resources/upvote.png';
        fabric.util.loadImage(src, function (img) {
            const postUpvoteIcon = new fabric.Image(img);
            postUpvoteIcon.set({
                left: 77,
                top: textHeight + 400,
            });
            postUpvoteIcon.scale(0.1);
            write(canvas, postUpvoteIcon);
        });
    });
}

function renderPostScore(canvas, textHeight, postScore) {
    const text = new fabric.Text(postScore, {
        left: 180,
        top: textHeight + 420,
        fill: oldSilver,
        fontSize: 50,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return text.width;
}

function renderPostDownvoteIcon(canvas, titleHeight, postScoreWidth) {
    queueMicrotask(() => {
        const src = 'file://' + __dirname + '/resources/upvote.png';
        fabric.util.loadImage(src, function (img) {
            const postDownvoteIcon = new fabric.Image(img);
            postDownvoteIcon.set({
                left: postScoreWidth + 190,
                top: titleHeight + 400,
            });
            postDownvoteIcon.scale(0.1);
            postDownvoteIcon.rotate(180);
            write(canvas, postDownvoteIcon);
        });
    });
}

function renderPostCommentIcon(canvas, titleHeight, postScoreWidth) {
    queueMicrotask(() => {
        const src = 'file://' + __dirname + '/resources/commenticon.png';
        fabric.util.loadImage(src, function (img) {
            const postCommentIcon = new fabric.Image(img);
            postCommentIcon.set({
                left: postScoreWidth + 325,
                top: titleHeight + 390,
            });
            // postCommentIcon.scale();
            write(canvas, postCommentIcon);
        });
    });
}

function renderCommentAmount(canvas, titleHeight, postScoreWidth, commentAmount) {
    const commentAmountText = new fabric.Text(commentAmount, {
        top: titleHeight + 420,
        left: postScoreWidth + 450,
        fill: oldSilver,
        fontSize: 45,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentAmountText);
}

function renderPostActions(canvas, titleHeight, postScoreWidth, commentActions) {
    const postActionsText = new fabric.Text(commentActions, {
        left: postScoreWidth + 700,
        top: titleHeight + 420,
        fill: oldSilver,
        fontSize: 45,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, postActionsText);
    return null;
}