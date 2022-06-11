const fs = require('fs');
const { comment } = require('./dummy');
const { lightSilver, eerieBlack, oldSilver, jet } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (subreddit, author, timeago, text, score, commentAmount, actions) => {
    loadFonts();
    const title = loadTitle(text);
    const titleHeight = title.height;
    const canvas = renderCanvas(titleHeight);
    renderSubredditIcon(canvas);
    renderSubreddit(canvas, subreddit);
    renderTitle(canvas, title);
    const authorTextWidth = renderPostAuthor(canvas, author);
    renderPostTimeago(canvas, authorTextWidth, timeago);

    // Bottom row
    renderUpvote(canvas, titleHeight);
    const scoreWidth = renderPostScore(canvas, titleHeight, score);
    renderDownvote(canvas, titleHeight, scoreWidth);
    renderCommentIcon(canvas, titleHeight, scoreWidth);
    renderCommentScore(canvas, titleHeight, scoreWidth, commentAmount);
    renderPostActions(canvas, titleHeight, scoreWidth, actions);
};

function write(canvas, object) {
    canvas.add(object);
    canvas.renderAll();
    // out = fs.createWriteStream(__dirname + '/desktop/resources/models/submission.png');
    out = fs.createWriteStream(__dirname + `/resources/submission.png`);
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

function loadTitle(text) {
    const title = new fabric.Textbox(text, {
        width: 550,
        top: 69,
        left: 17,
        fill: lightSilver,
        fontSize: 20,
        fontFamily: 'IBM Plex Sans',
        fontWeight: 'Bold'
    });
    return title;
}

function renderCanvas(textHeight) {
    const canvas = new fabric.StaticCanvas(null, {
        width: 600,
        height: textHeight + 140,
        backgroundColor: eerieBlack
    });
    return canvas;
}

function renderSubredditIcon(canvas) {
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

function renderTitle(canvas, text) {
    write(canvas, text);
    return null;
}

function renderPostAuthor(canvas, author) {
    const text = new fabric.Text(author, {
        top: 40,
        left: 67,
        fill: oldSilver,
        fontSize: 13,
        fontFamily: "IBMPlexSans",
        fontWeight: "SemiBold"
    });
    write(canvas, text);
    return text.width;
}

function renderSubreddit(canvas, text) {
    const subreddit = new fabric.Text(text, {
        top: 20,
        left: 67,
        fill: lightSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "SemiBold"
    });
    write(canvas, subreddit);
    return null;
}

function renderPostTimeago(canvas, offset, timeago) {
    const text = new fabric.Text(timeago, {
        top: 40,
        left: offset + 73,
        fill: oldSilver,
        fontSize: 13,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, text);
}

function renderUpvote(canvas, textHeight) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const upvote = new fabric.Image(img);
        upvote.set({
            left: 17,
            top: textHeight + 88,
        });
        upvote.scale(0.025);
        write(canvas, upvote);
    });
}

function renderPostScore(canvas, textHeight, postScore) {
    const text = new fabric.Text(postScore, {
        left: 47,
        top: textHeight + 93,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return text.width;
}

function renderDownvote(canvas, titleHeight, scoreWidth) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const downvote = new fabric.Image(img);
        downvote.set({
            left: scoreWidth + 55,
            top: titleHeight + 88,
        });
        downvote.scale(0.025);
        downvote.rotate(180);
        write(canvas, downvote);
    });
}

function renderCommentIcon(canvas, textHeight, scoreWidth) {
    const src = 'file://' + __dirname + '/resources/commenticon.png';
    fabric.util.loadImage(src, function (img) {
        const upvote = new fabric.Image(img);
        upvote.set({
            left: scoreWidth + 90,
            top: textHeight + 84,
        });
        upvote.scale(0.30);
        write(canvas, upvote);
    });
}

function renderCommentScore(canvas, textHeight, scoreWidth, commentAmount) {
    const text = new fabric.Text(commentAmount, {
        top: textHeight + 93,
        left: scoreWidth + 130,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text);
}

function renderPostActions(canvas, textHeight, scoreWidth, commentActions) {
    const text = new fabric.Text(commentActions, {
        left: scoreWidth + 180,
        top: textHeight + 93,
        fill: oldSilver,
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "Bold"
    });
    write(canvas, text);
    return null;
}