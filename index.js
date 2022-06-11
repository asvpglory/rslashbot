const { postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions } = require('./dummy');

const renderPost = require('./post');

renderPost(postSubreddit, postAuthor, postTimeago, postText, postScore, postCommentAmount, postActions);







// const renderComment = require('./fabric');
// const commentNo = 3;
// for (let i = 1; i <= commentNo; i++) {
//     render(comment, author, timeago, commentScore, commentActions, i);
// }