const { postActions, commentActions } = require('./dummy');
const generateUniqueId = require('generate-unique-id');
const fetchData = require('./reddit');
const renderPost = require('./post');
const renderComment = require('./comment');
const tweet = require('./tweet');
const fs = require('fs');

async function rslashbot() {
    try {
        // Get data from reddit
        console.log("Fetching data...");
        const data = await fetchData();
        console.log("Data fetched");

        // // Render posts and comments and get the ids of the comments
        console.log("Rendering images...");
        const ids = await render(data);
        console.log("Images rendered.");

        // // Tweet images
        console.log("Tweeting images...");
        await tweet(ids);
        console.log("Images tweeted.");

        await clean();
    }
    catch (err) {
        console.log(err);
    }
}

async function render(data) {
    let ids = [];

    await renderPost(data.subreddit, data.subredditIcon, data.author, data.created, data.title, data.score, data.commentCount, postActions);

    for (comment of data.comments) {
        const id = generateUniqueId({
            length: 5
        });
        ids.push(id);
        renderComment(comment.author, comment.created, comment.body, comment.score, commentActions, id);
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
