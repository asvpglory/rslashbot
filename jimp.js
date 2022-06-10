const Jimp = require('jimp');
const { title, comment } = require('./dummy');
const width = 900;

async function createCanvas(height) {
    const canvas = new Jimp(width, height, "#1A1A1B", (err, image) => {
        image.write('resources/canvas.png');
    });
    return null;
}

async function createAvatar() {
    // Create a Jimp version of the avatar
    const avatarpng = await Jimp.read('resources/avatar.png');
    const bitmap = avatarpng.bitmap;
    const avatar = new Jimp({ data: bitmap["data"], width: bitmap["width"], height: bitmap["height"] }, (err, image) => {
        avatar.write('resources/jimp-avatar.png');
    });

    // Resize the avatar
    avatar.scale(0.15);
    return avatar;
}

async function blit() {
    // Load canvas and avatar
    const canvas = await Jimp.read('resources/canvas.png');
    const avatar = await createAvatar();

    // Blit the avatar onto the canvas
    canvas.blit(avatar, 17, 17);
    canvas.write('resources/canvas.png');

    // const canvas = await Jimp.read('resources/canvas.png');
    const font = await Jimp.loadFont('fonts/XdeiyxtJqEGlHBlFVZ8PrUQg.ttf.fnt');
    canvas.print(font, 75, 50, comment, 790);
    canvas.write('resources/canvas.png');
    return canvas;
}

// Canvas size logic
const addedRows = Math.round(comment.length / 110);
const base = 140;
const row = 30;
const height = base + row * addedRows;

createCanvas(height);
blit();
// blit().then((canvas) => write(canvas));