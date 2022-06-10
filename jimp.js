const Jimp = require('jimp');
const { title, comment, author } = require('./dummy');
const width = 900;

// Render all metadata and text onto the canvas
async function render() {
    // Load canvas and avatar
    const canvas = await Jimp.read('resources/canvas.png');
    const trail = await Jimp.read('resources/trail.png');
    const avatar = await createAvatar();

    // Blit the avatar onto the canvas
    canvas.blit(avatar, 17, 17);
    canvas.write('resources/canvas.png');

    // Blit the trail onto the canvas
    canvas.blit(trail, 35, 65);
    canvas.write('resources/canvas.png');

    // Render author text
    const commentAuthorFont = await Jimp.loadFont('fonts/comment-author/6c_zkIxXJO8eXy7WEuZBHWC5.ttf.fnt');
    canvas.print(commentAuthorFont, 75, 25, author);

    // Render body text
    // const canvas = await Jimp.read('resources/canvas.png');
    const commentBodyFont = await Jimp.loadFont('fonts/comment-body/L9FR1o_iJeZA78OxxTFKIIKv.ttf.fnt');
    canvas.print(commentBodyFont, 75, 57, comment, 790);
    // canvas.write('resources/canvas.png');
    canvas.write('desktop/resources/models/canvas2.png');
    return canvas;
}

function canvasSize() {
    // Canvas size logic
    const addedRows = Math.round(comment.length / 110);
    const base = 140;
    const row = 30;
    const height = base + row * addedRows;
    return height;
}

function createCanvas(height) {
    // Create blank canvas
    const canvas = new Jimp(width, height, "#1A1A1B", (err, image) => {
        image.write('resources/canvas.png');
    });
    return null;
}

function createTrail(height) {
    // Create trail
    const trail = new Jimp(2, height - 100, "#343536", (err, image) => {
        image.write('resources/trail.png');
    });
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



const height = canvasSize();
createCanvas(height);
createTrail(height);
render();
// blit().then((canvas) => write(canvas));