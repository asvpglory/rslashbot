const fs = require('fs');
const { comment, author } = require('./dummy');
fabric = require('fabric').fabric;

function loadFonts() {
    fabric.nodeCanvas.registerFont(__dirname + '/fonts/NotoSans-Medium.ttf', {
        family: 'Noto Sans', weight: 'Medium', style: 'normal'
    });
    fabric.nodeCanvas.registerFont(__dirname + '/fonts/IBMPlexSans-SemiBold.ttf', {
        family: 'IBMPlexSans', weight: 'SemiBold', style: 'normal'
    });
    return null;
}


function loadText() {
    const text = new fabric.Textbox(comment, {
        width: 720,
        top: 57,
        left: 75,
        fill: '#D7DADC',
        fontSize: 18,
        fontFamily: 'NotoSans',
        fontWeight: 'Medium',
    });
    console.log(text.height);
    return text;
}

function renderCanvas(height) {
    const canvas = new fabric.StaticCanvas(null, {
        width: 900,
        height: height + 125,
        backgroundColor: "#1A1A1B"
    });
    return canvas;
}

function renderAvatar(canvas) {
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
        top: 25,
        left: 75,
        fill: "#D7DADC",
        fontSize: 15,
        fontFamily: "IBMPlexSans",
        fontWeight: "SemiBold"
    });
    write(canvas, text);
    return null;
}

function renderText(canvas, text) {
    write(canvas, text);
    return null;
}

function renderTrail(canvas, height) {
    const trail = new fabric.Rect({
        width: 2,
        height: height,
        fill: "#343536",
        top: 70,
        left: 35
    });
    write(canvas, trail);
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

loadFonts();
const text = loadText();
const textHeight = text.height;
const canvas = renderCanvas(textHeight);
renderAvatar(canvas);
renderText(canvas, text);
renderTrail(canvas, textHeight);
renderCommentAuthor(canvas);