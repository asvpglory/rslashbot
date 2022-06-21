const mongoose = require('mongoose');
const Post = require('./model');

module.exports.createPost = async (post, id) => {
    await mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    // db.once("open", () => {
    //     console.log("Connected to database.");
    // });
    const newPost = new Post({
        _id: id,
        title: post.title,
        author: post.author,
        subreddit: post.subreddit,
        score: post.score,
        numComments: post.numComments,
        created: post.created,
        link: post.link,
        subredditIcon: post.subredditIcon,
        comments: [
            {
                author: post.comments[0].author,
                authorIcon: post.comments[0].authorIcon,
                body: post.comments[0].body,
                score: post.comments[0].score,
                created: post.comments[0].created
            },
            {
                author: post.comments[1].author,
                authorIcon: post.comments[1].authorIcon,
                body: post.comments[1].body,
                score: post.comments[1].score,
                created: post.comments[1].created
            },
            {
                author: post.comments[2].author,
                authorIcon: post.comments[2].authorIcon,
                body: post.comments[2].body,
                score: post.comments[2].score,
                created: post.comments[2].created
            },
            {
                author: post.comments[3].author,
                authorIcon: post.comments[3].authorIcon,
                body: post.comments[3].body,
                score: post.comments[3].score,
                created: post.comments[3].created
            },
        ]
    });
    await newPost.save();
    await db.close();
    return newPost;
};

module.exports.fetchPost = async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    const post = await Post.find({ _id: process.env.POST });
    await db.close();
    return post;
};

module.exports.cleanDatabase = async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    await Post.deleteMany({});
    await db.close();
    return null;
};