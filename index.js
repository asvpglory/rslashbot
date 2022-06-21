// Node/npm modules
const generateUniqueId = require('generate-unique-id');
const fs = require('fs');

// Local modules
const renderPost = require('./post');
const renderComment = require('./comment');
const tweet = require('./tweet');
const { fetchPost } = require('./db-modules');

async function rslashbot() {
    try {
        // Get data from database
        console.log("Fetching data...");
        const data = await fetchPost();
        console.log("Data fetched");

        // console.log(data);
        // // Render posts and comments and get the ids of the comments
        console.log("Rendering images...");
        const ids = await render(data[0]);
        console.log("Images rendered.");

        // // Tweet images
        console.log("Tweeting images...");
        await tweet(ids, data[0].url);
        console.log("Images tweeted.");

        await clean();
    }
    catch (err) {
        console.log(err);
    }
}

async function render(data) {
    let ids = [];

    await renderPost(data.subreddit, data.subredditIcon, data.author, data.created, data.title, data.score, data.numComments);

    for (comment of data.comments) {
        const id = generateUniqueId({
            length: 5
        });
        ids.push(id);
        renderComment(comment.author, comment.created, comment.body, comment.score, id);
    }

    return ids;
}

async function clean() {
    await new Promise((resolve, reject) => {
        try {
            fs.rm('output', { recursive: true, force: true }, () => {
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
    await new Promise((resolve, reject) => {
        try {
            fs.mkdir('output', () => {
                resolve();
            });
        } catch (error) {
            reject(error);
        }

    });
    return null;
}

rslashbot();
