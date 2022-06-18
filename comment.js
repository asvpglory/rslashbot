const fs = require('fs');
const { lightSilver, eerieBlack, oldSilver, jet } = require('./palette');
fabric = require('fabric').fabric;

module.exports = (commentAuthor, commentTimeago, commentText, commentScore, commentActions, commentId) => {
    try {
        loadFonts();
        const text = loadCommentText(commentText);
        const canvas = renderCanvas();

        // Rendering main content
        renderCommentAvatar(canvas, commentId);
        renderCommentText(canvas, text, commentId);
        renderTrail(canvas, text.height, commentId);
        const commentAuthorTextWidth = renderCommentAuthor(canvas, commentAuthor, commentId);
        renderCommentTimeago(canvas, commentAuthorTextWidth, commentTimeago, commentId);

        // Rendering bottom row
        renderCommentUpvoteIcon(canvas, commentId);
        const scoreWidth = renderCommentScore(canvas, commentScore, commentId);
        renderCommentDownvoteIcon(canvas, scoreWidth, commentId);
        renderCommentActions(canvas, scoreWidth, commentActions, commentId);
    } catch (err) {
        console.log(err);
    }
};

function write(canvas, object, commentId) {
    canvas.add(object);
    canvas.renderAll();
    out = fs.createWriteStream(__dirname + `/output/${commentId}.png`);
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

function loadCommentText(comment) {
    const commentText = new fabric.Textbox(comment, {
        top: 220,
        left: 230,
        width: 1600,
        fill: lightSilver,
        fontSize: 160,
        fontFamily: 'Noto Sans',
        fontWeight: 'Medium'
    });

    // Fit the text into the image
    let fit = false;
    while (!fit) {
        let size = commentText.fontSize;
        if (Math.round(commentText.height) > 653) {
            commentText.set({
                fontSize: size - 1
            });
        }
        else {
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
            top: 40,
            left: 40,
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
    return null;
}

function renderCommentText(canvas, commentText, commentId) {
    write(canvas, commentText, commentId);
    return null;
}

function renderTrail(canvas, textHeight, commentId) {
    const trail = new fabric.Rect({
        top: 240,
        left: 115,
        width: 6,
        height: textHeight,
        fill: jet
    });
    write(canvas, trail, commentId);
    return null;
}

function renderCommentUpvoteIcon(canvas, commentId) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const commentUpvoteIcon = new fabric.Image(img);
        commentUpvoteIcon.set({
            top: 930,
            left: 120,
        });
        commentUpvoteIcon.scale(0.09);
        write(canvas, commentUpvoteIcon, commentId);
    });
    return null;
}

function renderCommentScore(canvas, commentScore, commentId) {
    const commentScoreText = new fabric.Text(commentScore, {
        top: 950,
        left: 220,
        fill: lightSilver,
        fontSize: 40,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentScoreText, commentId);
    return commentScoreText.width;
}

function renderCommentDownvoteIcon(canvas, scoreWidth, commentId) {
    const src = 'file://' + __dirname + '/resources/upvote.png';
    fabric.util.loadImage(src, function (img) {
        const commentDownvoteIcon = new fabric.Image(img);
        commentDownvoteIcon.set({
            left: scoreWidth + 240,
            top: 930,
        });
        commentDownvoteIcon.scale(0.09);
        commentDownvoteIcon.rotate(180);
        write(canvas, commentDownvoteIcon, commentId);
    });
    return null;
}

function renderCommentActions(canvas, scoreWidth, commentActions, commentId) {
    const commentActionsText = new fabric.Text(commentActions, {
        top: 950,
        left: scoreWidth + 370,
        fill: oldSilver,
        fontSize: 40,
        fontFamily: "IBM Plex Sans",
        fontWeight: "Bold"
    });
    write(canvas, commentActionsText, commentId);
    return null;
}
