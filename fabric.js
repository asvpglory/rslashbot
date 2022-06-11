const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver, jet } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (comment, author, timeago, commentScore, commentActions, commentIndex) => {
    loadFonts();
    const text = loadText(comment);
    const textHeight = text.height;
    const canvas = renderCanvas(textHeight);
    renderCommentAvatar(canvas, commentIndex);
    renderText(canvas, text, commentIndex);
    renderTrail(canvas, textHeight, commentIndex);
    const authorTextWidth = renderCommentAuthor(canvas, author, commentIndex);
    renderCommentTimeago(canvas, authorTextWidth, timeago, commentIndex);

    // Bottom row
    renderUpvote(canvas, textHeight, commentIndex);
    const scoreWidth = renderCommentScore(canvas, textHeight, commentScore, commentIndex);
    renderDownvote(canvas, textHeight, scoreWidth, commentIndex);
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

function loadText(comment) {
    const text = new fabric.Textbox(comment, {
        width: 760,
        top: 64,
        left: 67,
        fill: lightSilver,
        fontSize: 18,
        fontFamily: 'Noto Sans',
        fontWeight: 'Medium'
    });
    return text;
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
    const text = new fabric.Text(author, {
        top: 30,
        left: 67,
        fill: lightSilver,
        fontSize: 16,
        fontFamily: "IBMPlexSans",
        fontWeight: "SemiBold"
    });
    write(canvas, text, commentIndex);
    return text.width;
}

function renderCommentTimeago(canvas, offset, timeago, commentIndex) {
    const text = new fabric.Text(timeago, {
        top: 30,
        left: offset + 73,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, text, commentIndex);
}

function renderText(canvas, text, commentIndex) {
    write(canvas, text, commentIndex);
    return null;
}

function renderTrail(canvas, height, commentIndex) {
    const trail = new fabric.Rect({
        width: 2,
        height: height,
        fill: jet,
        top: 65,
        left: 35
    });
    write(canvas, trail, commentIndex);
    return null;
}

function renderUpvote(canvas, textHeight, commentIndex) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const upvote = new fabric.Image(img);
        upvote.set({
            left: 65,
            top: textHeight + 78,
        });
        upvote.scale(0.025);
        write(canvas, upvote, commentIndex);
    });
}

function renderCommentScore(canvas, textHeight, commentScore, commentIndex) {
    const text = new fabric.Text(commentScore, {
        left: 95,
        top: textHeight + 83,
        fill: lightSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text, commentIndex);
    return text.width;
}

function renderDownvote(canvas, textHeight, scoreWidth, commentIndex) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const downvote = new fabric.Image(img);
        downvote.set({
            left: scoreWidth + 102,
            top: textHeight + 78,
        });
        downvote.scale(0.025);
        downvote.rotate(180);
        write(canvas, downvote, commentIndex);
    });
}

function renderCommentActions(canvas, textHeight, scoreWidth, commentActions, commentIndex) {
    const text = new fabric.Text(commentActions, {
        left: scoreWidth + 140,
        top: textHeight + 83,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text, commentIndex);
    return null;
}
