const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver, jet } = require('./palette');
const { comment, author, timeago, commentScore, commentActions } = require('./dummy');
fabric = require('fabric').fabric;

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

function loadText() {
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

function renderCommentAvatar(canvas) {
    const src = 'file://' + __dirname + '/resources/avatar.png';
    fabric.util.loadImage(src, function (img) {
        const avatar = new fabric.Image(img);
        avatar.set({
            left: 17,
            top: 17,
        });
        avatar.scale(0.15);
        write(canvas, avatar);
    });
    return null;
}

function renderCommentAuthor(canvas) {
    const text = new fabric.Text(author, {
        top: 30,
        left: 67,
        fill: lightSilver,
        fontSize: 16,
        fontFamily: "IBMPlexSans",
        fontWeight: "SemiBold"
    });
    write(canvas, text);
    return text.width;
}

function renderCommentTimeago(canvas, offset) {
    const text = new fabric.Text(timeago, {
        top: 30,
        left: offset + 73,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, text);
}

function renderText(canvas, text) {
    write(canvas, text);
    return null;
}

function renderTrail(canvas, height) {
    const trail = new fabric.Rect({
        width: 2,
        height: height,
        fill: jet,
        top: 65,
        left: 35
    });
    write(canvas, trail);
    return null;
}

function renderUpvote(canvas, textHeight) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const upvote = new fabric.Image(img);
        upvote.set({
            left: 65,
            top: textHeight + 78,
        });
        upvote.scale(0.025);
        write(canvas, upvote);
    });
}

function renderCommentScore(canvas, textHeight) {
    const text = new fabric.Text(commentScore, {
        left: 95,
        top: textHeight + 83,
        fill: lightSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return text.width;
}

function renderDownvote(canvas, textHeight, scoreWidth) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const downvote = new fabric.Image(img);
        downvote.set({
            left: scoreWidth + 102,
            top: textHeight + 78,
        });
        downvote.scale(0.025);
        downvote.rotate(180);
        write(canvas, downvote);
    });
}

function renderCommentActions(canvas, textHeight, scoreWidth) {
    const text = new fabric.Text(commentActions, {
        left: scoreWidth + 140,
        top: textHeight + 83,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return null;
}

function write(canvas, object) {
    canvas.add(object);
    canvas.renderAll();
    out = fs.createWriteStream(__dirname + '/desktop/resources/models/helloworld.png');
    // out = fs.createWriteStream(__dirname + '/resources/canvas.png');
    const stream = canvas.createPNGStream();
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
}

function render() {
    loadFonts();
    const text = loadText();
    const textHeight = text.height;
    const canvas = renderCanvas(textHeight);
    renderCommentAvatar(canvas);
    renderText(canvas, text);
    renderTrail(canvas, textHeight);
    const authorTextWidth = renderCommentAuthor(canvas);
    renderCommentTimeago(canvas, authorTextWidth);

    // Bottom row
    renderUpvote(canvas, textHeight);
    const scoreWidth = renderCommentScore(canvas, textHeight);
    renderDownvote(canvas, textHeight, scoreWidth);
    renderCommentActions(canvas, textHeight, scoreWidth);
}

render();