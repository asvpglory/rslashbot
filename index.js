const { postActions, commentActions } = require('./dummy');
const generateUniqueId = require('generate-unique-id');
const fetchData = require('./reddit');
const renderPost = require('./post');
const renderComment = require('./comment');

async function rslashbot() {
    const data = await fetchData();

    // let ids = [];

    renderPost(data.subreddit, data.subredditIcon, data.author, data.created, data.title, data.score, data.commentCount, postActions);

    for (comment of data.comments) {
        const id = generateUniqueId({
            length: 5
        });
        // ids.push(id);
        renderComment(comment.author, comment.created, comment.body, comment.score, commentActions, id);
    }
}

rslashbot();