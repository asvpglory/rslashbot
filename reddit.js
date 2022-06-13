const snoowrap = require('snoowrap');
const { convertTime, shortenNum } = require('./utilities');
require('dotenv').config();

const r = new snoowrap({
    accessToken: process.env.REDDIT_ACCESS_TOKEN,
    userAgent: "rslashbot/v0.0 by unrxly",
});

module.exports = async () => {
    // The data to be returned (The submission and its comments (without replies))
    let submission = {};
    // Get the first submission on r/AskReddit when sorting by 'top'
    const subredditIcon = await r.getSubreddit('askReddit').community_icon;
    const submissionListing = await r.getSubreddit('askReddit').getTop({
        limit: 1
    });

    // Add all the submission meta data and text to the submission object
    submission['title'] = submissionListing[0].title;
    submission['subreddit'] = submissionListing[0].subreddit_name_prefixed;
    submission['score'] = shortenNum(submissionListing[0].score);
    submission['author'] = submissionListing[0].author.name;
    submission['commentCount'] = shortenNum(submissionListing[0].num_comments);
    submission['created'] = convertTime(submissionListing[0].created_utc);
    submission['link'] = submissionListing[0].url;
    submission['subredditIcon'] = subredditIcon;

    // Get the actual comments object
    const commentListing = await submissionListing[0].comments;
    // Fetch the comments inside the comments object from reddit
    const comments = await commentListing.fetchMore({
        amount: 3,
        // skipReplies: false
    });
    // For every comment, print that comment with 0 reply depth (no replies)
    submission['comments'] = [];
    for (dirtyComment of comments) {
        const cleanComment = await dirtyComment.expandReplies({
            depth: 0
        });
        submission.comments.push({
            author: cleanComment.author.name,
            authorIcon: await r.getUser(cleanComment.author.name).icon_img,
            body: cleanComment.body,
            score: shortenNum(cleanComment.score),
            created: convertTime(cleanComment.created_utc)
        });
    }
    return submission;
};

// fetchData()
    // .then((res) => console.log(res));