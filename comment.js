const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver, jet } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (commentAuthor, commentTimeago, commentText, commentScore, commentActions, commentId) => {
    loadFonts();
    const text = loadCommentText(commentText);
    const textHeight = text.height;
    const canvas = renderCanvas();

    // Main rendering
    renderCommentAvatar(canvas, commentId);
    renderCommentText(canvas, text, commentId);
    renderTrail(canvas, textHeight, commentId);
    const commentAuthorTextWidth = renderCommentAuthor(canvas, commentAuthor, commentId);
    renderCommentTimeago(canvas, commentAuthorTextWidth, commentTimeago, commentId);

    // Bottom row rendering
    renderCommentUpvoteIcon(canvas, textHeight, commentId);
    const scoreWidth = renderCommentScore(canvas, textHeight, commentScore, commentId);
    renderCommentDownvoteIcon(canvas, textHeight, scoreWidth, commentId);
    renderCommentActions(canvas, textHeight, scoreWidth, commentActions, commentId);
};

function write(canvas, object, commentId) {
    canvas.add(object);
    canvas.renderAll();
    out = fs.createWriteStream(__dirname + `/output/${commentId}.png`);
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
        width: 1600,
        top: 220,
        left: 230,
        fill: lightSilver,
        fontSize: 160,
        fontFamily: 'Noto Sans',
        fontWeight: 'Medium'
    });

    console.log(commentText.height);

    let fit = false;
    while (!fit) {
        let size = commentText.fontSize;
        if (Math.round(commentText.height) > 653) {
            console.log(`Text height is now ${commentText.height}`);
            console.log(`Font size is now ${size}`);
            commentText.set({
                fontSize: size - 1
            });
        }
        else {
            console.log(`Text height is now ${commentText.height}`);
            console.log('This worked', size);
            fit = true;
        }
    }

    return commentText;
}

function renderCanvas() {
    const canvas = new fabric.StaticCanvas(null, {
        width: 1920,
        height: 1080,

        backgroundColor: eerieBlack
    });
    return canvas;
}

function renderCommentAvatar(canvas, commentId) {
    const src = 'file://' + __dirname + '/resources/avatar.png';
    fabric.util.loadImage(src, function (img) {
        const avatar = new fabric.Image(img);
        avatar.set({
            left: 40,
            top: 40,
        });
        avatar.scale(0.6);
        write(canvas, avatar, commentId);
    });
    return null;
}

function renderCommentAuthor(canvas, author, commentId) {
    const commentAuthorText = new fabric.Text(author, {
        top: 95,
        left: 230,
        fill: lightSilver,
        fontSize: 50,
        fontFamily: "IBM Plex Sans",
        fontWeight: "SemiBold"
    });
    write(canvas, commentAuthorText, commentId);
    return commentAuthorText.width;
}

function renderCommentTimeago(canvas, offset, timeago, commentId) {
    const commentTimeagoText = new fabric.Text(timeago, {
        top: 102,
        left: offset + 250,
        fill: oldSilver,
        fontSize: 40,
        fontFamily: "Noto Sans",
        fontWeight: "Medium"
    });
    write(canvas, commentTimeagoText, commentId);
}

function renderCommentText(canvas, commentText, commentId) {
    // commentText.set({
    // fontSize: 14.79,
    // width: canvas.width * 0.8333333333333
    // });
    // console.log(canvas.width);
    write(canvas, commentText, commentId);
    return null;
}

function renderTrail(canvas, textHeight, commentId) {
    const trail = new fabric.Rect({
        width: 6,
        height: textHeight,
        fill: jet,
        top: 240,
        left: 115
    });
    write(canvas, trail, commentId);
    return null;
}

function renderCommentUpvoteIcon(canvas, textHeight, commentId) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const commentUpvoteIcon = new fabric.Image(img);
        commentUpvoteIcon.set({
            left: 120,
            top: textHeight + 280,
        });
        commentUpvoteIcon.scale(0.09);
        write(canvas, commentUpvoteIcon, commentId);
    });
}

function renderCommentScore(canvas, textHeight, commentScore, commentId) {
    const commentScoreText = new fabric.Text(commentScore, {
        left: 220,
        top: textHeight + 300,
        fill: lightSilver,
        fontSize: 40,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentScoreText, commentId);
    return commentScoreText.width;
}

function renderCommentDownvoteIcon(canvas, textHeight, scoreWidth, commentId) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const commentDownvoteIcon = new fabric.Image(img);
        commentDownvoteIcon.set({
            left: scoreWidth + 240,
            top: textHeight + 280,
        });
        commentDownvoteIcon.scale(0.09);
        commentDownvoteIcon.rotate(180);
        write(canvas, commentDownvoteIcon, commentId);
    });
}

function renderCommentActions(canvas, textHeight, scoreWidth, commentActions, commentId) {
    const commentActionsText = new fabric.Text(commentActions, {
        left: scoreWidth + 370,
        top: textHeight + 300,
        fill: oldSilver,
        fontSize: 40,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentActionsText, commentId);
    return null;
}
