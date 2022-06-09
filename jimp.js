const Jimp = require('jimp');
const { title, comment } = require('./dummy');
const width = 900;

async function createCanvas(height) {
    const canvas = new Jimp(width, height, "#1A1A1B", (err, image) => {
        image.write('resources/canvas.png');
    });
}

async function blit() {
    const canvas = await Jimp.read('resources/canvas.png');

    // Create a Jimp version of the avatar
    const avatarpng = await Jimp.read('resources/avatar.png');
    const bitmap = avatarpng.bitmap;
    const avatar = new Jimp({ data: bitmap["data"], width: bitmap["width"], height: bitmap["height"] }, (err, image) => {
        avatar.write('resources/jimp-avatar.png');
    });
}

createCanvas(200);
blit();