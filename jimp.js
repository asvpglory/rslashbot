const Jimp = require('jimp');
const { title, comment } = require('./dummy');
require('dotenv').config();
const fontPath = process.env.FONT_PATH;

async function main() {
    try {
        const image = await Jimp.read('images/reddit.png');

        // Render title
        const titlefont = await Jimp.loadFont(fontPath);
        image.print(titlefont, 65, 40, title, 800);

        // Render upvotes
        const upvotefont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        image.print(upvotefont, 13, 45, "2.1k", 900);

        // Render author
        const authorfont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        image.print(authorfont, 263, 14, "badblackguy");

        // Write image to file
        const hmm = await image.write('images/test.png');
    } catch (error) {
        console.log(error);
    }
}

main();