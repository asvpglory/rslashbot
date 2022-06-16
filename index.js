const { postActions, commentActions } = require('./dummy');
const generateUniqueId = require('generate-unique-id');
const fetchData = require('./reddit');
const renderPost = require('./post');
const renderComment = require('./comment');
const tweet = require('./tweet');

async function rslashbot() {
    // Get data from reddit
    const data = await fetchData();

    // Render posts and comments and get the ids of the comments
    const ids = await render(data);

    // Tweet images
    const l = await tweet(ids);
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

rslashbot();