const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver, jet } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (commentAuthor, commentTimeago, commentText, commentScore, commentActions, commentIndex) => {
    loadFonts();
    const text = loadCommentText(commentText);
    const textHeight = text.height;
    const canvas = renderCanvas(textHeight);

    // Main rendering
    renderCommentAvatar(canvas, commentIndex);
    renderCommentText(canvas, text, commentIndex);
    renderTrail(canvas, textHeight, commentIndex);
    const commentAuthorTextWidth = renderCommentAuthor(canvas, commentAuthor, commentIndex);
    renderCommentTimeago(canvas, commentAuthorTextWidth, commentTimeago, commentIndex);

    // Bottom row rendering
    renderCommentUpvoteIcon(canvas, textHeight, commentIndex);
    const scoreWidth = renderCommentScore(canvas, textHeight, commentScore, commentIndex);
    renderCommentDownvoteIcon(canvas, textHeight, scoreWidth, commentIndex);
    renderCommentActions(canvas, textHeight, scoreWidth, commentActions, commentIndex);
};

function write(canvas, object, commentIndex) {
    canvas.add(object);
    canvas.renderAll();
    // out = fs.createWriteStream(__dirname + '/desktop/resources/models/helloworld.png');
    out = fs.createWriteStream(__dirname + `/resources/comment${commentIndex}.png`);
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
        family: 'IBMPlexSans', weight: 'SemiBold', style: 'normal'
    });
    fabric.nodeCanvas.registerFont(__dirname + '/fonts/IBMPlexSans-Bold.ttf', {
        family: 'IBMPlexSans', weight: 'Bold', style: 'normal'
    });
    return null;
}

function loadCommentText(comment) {
    const commentText = new fabric.Textbox(comment, {
        width: 760,
        top: 64,
        left: 67,
        fill: lightSilver,
        fontSize: 18,
        fontFamily: 'Noto Sans',
        fontWeight: 'Medium'
    });
    return commentText;
}

function renderCanvas(textHeight) {
    const canvas = new fabric.StaticCanvas(null, {
        width: 900,
        height: textHeight + 125,
        backgroundColor: eerieBlack
    });
    return canvas;
}

function renderCommentAvatar(canvas, commentIndex) {
    const src = 'file://' + __dirname + '/resources/avatar.png';
    fabric.util.loadImage(src, function (img) {
        const avatar = new fabric.Image(img);
        avatar.set({
            left: 17,
            top: 17,
        });
        avatar.scale(0.15);
        write(canvas, avatar, commentIndex);
    });
    return null;
}

function renderCommentAuthor(canvas, author, commentIndex) {
    const commentAuthorText = new fabric.Text(author, {
        top: 30,
        left: 67,
        fill: lightSilver,
        fontSize: 16,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    write(canvas, commentAuthorText, commentIndex);
    return commentAuthorText.width;
}

function renderCommentTimeago(canvas, offset, timeago, commentIndex) {
    const commentTimeagoText = new fabric.Text(timeago, {
        top: 30,
        left: offset + 73,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, commentTimeagoText, commentIndex);
}

function renderCommentText(canvas, commentText, commentIndex) {
    write(canvas, commentText, commentIndex);
    return null;
}

function renderTrail(canvas, textHeight, commentIndex) {
    const trail = new fabric.Rect({
        width: 2,
        height: textHeight,
        fill: jet,
        top: 65,
        left: 35
    });
    write(canvas, trail, commentIndex);
    return null;
}

function renderCommentUpvoteIcon(canvas, textHeight, commentIndex) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const commentUpvoteIcon = new fabric.Image(img);
        commentUpvoteIcon.set({
            left: 65,
            top: textHeight + 78,
        });
        commentUpvoteIcon.scale(0.025);
        write(canvas, commentUpvoteIcon, commentIndex);
    });
}

function renderCommentScore(canvas, textHeight, commentScore, commentIndex) {
    const commentScoreText = new fabric.Text(commentScore, {
        left: 95,
        top: textHeight + 83,
        fill: lightSilver,
        fontSize: 15,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentScoreText, commentIndex);
    return commentScoreText.width;
}

function renderCommentDownvoteIcon(canvas, textHeight, scoreWidth, commentIndex) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const commentDownvoteIcon = new fabric.Image(img);
        commentDownvoteIcon.set({
            left: scoreWidth + 102,
            top: textHeight + 78,
        });
        commentDownvoteIcon.scale(0.025);
        commentDownvoteIcon.rotate(180);
        write(canvas, commentDownvoteIcon, commentIndex);
    });
}

function renderCommentActions(canvas, textHeight, scoreWidth, commentActions, commentIndex) {
    const commentActionsText = new fabric.Text(commentActions, {
        left: scoreWidth + 140,
        top: textHeight + 83,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentActionsText, commentIndex);
    return null;
}
