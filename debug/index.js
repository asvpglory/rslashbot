// const { postActions, commentActions } = require('./dummy');
const { postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions, commentAuthor, commentTimeago, commentText, commentScore, commentActions } = require('./dummy');
const generateUniqueId = require('generate-unique-id');
const fetchData = require('./reddit');
const renderPost = require('./post');
const renderComment = require('./comment');
const tweet = require('./tweet');
const fs = require('fs');

async function rslashbot() {
    // const data = await fetchData();
    const ids = render();
    // tweet();
}

function render() {
    let ids = [];

    // renderPost(data.subreddit, data.subredditIcon, data.author, data.created, data.title, data.score, data.commentCount, postActions);

    // for (comment of data.comments) {
    // const id = generateUniqueId({
    // length: 5
    // });
    // ids.push(id);
    // renderComment(comment.author, comment.created, comment.body, comment.score, commentActions, "hello");
    renderComment(commentAuthor, commentTimeago, commentText, commentScore, commentActions, "hello");
    // }

    return ids;
}

rslashbot();