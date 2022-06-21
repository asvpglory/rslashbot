const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    author: String,
    subreddit: String,
    score: String,
    numComments: String,
    created: String,
    link: String,
    subredditIcon: String,
    comments: [{
        author: String,
        authorIcon: String,
        body: String,
        score: String,
        created: String
    }]
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
