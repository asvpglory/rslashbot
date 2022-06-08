var Jimp = require('jimp');

async function main() {
    try {
        const image = await Jimp.read('./reddit.png');

        const titlefont = await Jimp.loadFont('gaXvlmnaX_0w2gFxHhk7SWDg.ttf.fnt');
        image.print(titlefont, 65, 40, "What is a record, sports or otherwise, that will likely never be broken?", 850);

        const upvotefont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        image.print(upvotefont, 13, 45, "2.1k", 900);

        const authorfont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        image.print(authorfont, 263, 14, "badblackguy");

        const hmm = await image.write('./test.png');
    } catch (error) {
        console.log(error);
    }
}

main();