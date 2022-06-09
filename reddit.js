const snoowrap = require('snoowrap');
require('dotenv').config();

const r = new snoowrap({
    accessToken: process.env.TOKEN,
    userAgent: "rslashbot/v0.0 by unrxly",
});

async function fetchData() {
    // The data to be returned (The submission and its comments (without replies))
    let data = [];
    // Get the first submission on r/AskReddit when sorting by 'top'
    const submissionListing = await r.getSubreddit('askReddit').getTop({
        limit: 1
    });
    data.push(submissionListing);
    // Get the actual comments object
    const commentListing = await submissionListing[0].comments;
    // Fetch the comments inside the comments object from reddit
    const comments = await commentListing.fetchMore({
        amount: 3,
        // skipReplies: false
    });
    // For every comment, print that comment with 0 reply depth (no replies)
    for (dirtyComment of comments) {
        const cleanComment = await dirtyComment.expandReplies({
            depth: 0
        });
        data.push(cleanComment);
    }
    return data;
}

fetchData()
    .then((res) => console.log(res));