const { postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions, commentAuthor, commentTimeago, commentText, commentScore, commentActions } = require('./dummy');
const renderPost = require('./post');
const renderComment = require('./comment');
const commentNo = 3;

renderPost(postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions);
for (let i = 1; i <= commentNo; i++) {
    renderComment(commentAuthor, commentTimeago, commentText, commentScore, commentActions, i);
}