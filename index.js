const { postActions, commentActions } = require('./dummy');
const generateUniqueId = require('generate-unique-id');
const fetchData = require('./reddit');
const renderPost = require('./post');
const renderComment = require('./comment');
const tweet = require('./tweet');

async function rslashbot() {
    const data = await fetchData();
    const ids = render(data);
    // tweet();
}

function render(data) {
    let ids = [];

    renderPost(data.subreddit, data.subredditIcon, data.author, data.created, "What is your favourite color?", data.score, data.commentCount, postActions);

    // for (comment of data.comments) {
    //     const id = generateUniqueId({
    //         length: 5
    //     });
    //     ids.push(id);
    //     renderComment(comment.author, comment.created, comment.body, comment.score, commentActions, id);
    // }

    return ids;
}

rslashbot();