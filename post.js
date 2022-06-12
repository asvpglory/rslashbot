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
        width: 550,
        top: 69,
        left: 17,
        fill: lightSilver,
        fontSize: 20,
        fontFamily: 'IBM Plex Sans',
        fontWeight: 'Bold'
    });
    return postTitleText;
}

function renderCanvas(titleHeight) {
    const canvas = new fabric.StaticCanvas(null, {
        width: 600,
        height: titleHeight + 140,
        backgroundColor: eerieBlack
    });
    return canvas;
}

function renderSubredditIcon(canvas, subredditIcon) {
    const src = subredditIcon;
    fabric.util.loadImage(src, function (img) {
        const subredditIcon = new fabric.Image(img);
        subredditIcon.set({
            left: 17,
            top: 17,
        });
        subredditIcon.scale(0.15);
        write(canvas, subredditIcon);
    });
    return null;
}

function renderPostTitle(canvas, postTitleText) {
    write(canvas, postTitleText);
    return null;
}

function renderPostAuthor(canvas, postAuthor) {
    const postAuthorText = new fabric.Text(postAuthor, {
        top: 40,
        left: 67,
        fill: oldSilver,
        fontSize: 13,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    write(canvas, postAuthorText);
    return postAuthorText.width;
}

function renderSubredditName(canvas, subredditName) {
    const subredditNameText = new fabric.Text(subredditName, {
        top: 20,
        left: 67,
        fill: lightSilver,
        fontSize: 15,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    write(canvas, subredditNameText);
    return null;
}

function renderPostTimeago(canvas, offset, postTimeago) {
    const postTimeagoText = new fabric.Text(postTimeago, {
        top: 40,
        left: offset + 73,
        fill: oldSilver,
        fontSize: 13,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, postTimeagoText);
}

function renderPostUpvoteIcon(canvas, textHeight) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const postUpvoteIcon = new fabric.Image(img);
        postUpvoteIcon.set({
            left: 17,
            top: textHeight + 88,
        });
        postUpvoteIcon.scale(0.025);
        write(canvas, postUpvoteIcon);
    });
}

function renderPostScore(canvas, textHeight, postScore) {
    const text = new fabric.Text(postScore, {
        left: 47,
        top: textHeight + 93,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return text.width;
}

function renderPostDownvoteIcon(canvas, titleHeight, postScoreWidth) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const postDownvoteIcon = new fabric.Image(img);
        postDownvoteIcon.set({
            left: postScoreWidth + 55,
            top: titleHeight + 88,
        });
        postDownvoteIcon.scale(0.025);
        postDownvoteIcon.rotate(180);
        write(canvas, postDownvoteIcon);
    });
}

function renderPostCommentIcon(canvas, titleHeight, postScoreWidth) {
    const src = 'file://' + __dirname + '/resources/commenticon.png';
    fabric.util.loadImage(src, function (img) {
        const postCommentIcon = new fabric.Image(img);
        postCommentIcon.set({
            left: postScoreWidth + 90,
            top: titleHeight + 84,
        });
        postCommentIcon.scale(0.30);
        write(canvas, postCommentIcon);
    });
}

function renderCommentAmount(canvas, titleHeight, postScoreWidth, commentAmount) {
    const commentAmountText = new fabric.Text(commentAmount, {
        top: titleHeight + 93,
        left: postScoreWidth + 128,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentAmountText);
}

function renderPostActions(canvas, titleHeight, postScoreWidth, commentActions) {
    const postActionsText = new fabric.Text(commentActions, {
        left: postScoreWidth + 180,
        top: titleHeight + 93,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, postActionsText);
    return null;
}