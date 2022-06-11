const { postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions, commentAuthor, commentTimeago, commentText, commentScore, commentActions } = require('./dummy');
const renderPost = require('./post');

// renderPost(postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions);

const renderComment = require('./fabric');
const commentNo = 3;
// for (let i = 1; i <= commentNo; i++) {
renderComment(commentAuthor, commentTimeago, commentText, commentScore, commentActions, 0);
// }