const snoowrap = require('snoowrap');
const { convertTime, shortenNum } = require('./utilities');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

module.exports = async () => {
    try {
        const accessToken = await fetchToken();
        const r = createClient(accessToken);

        // The data to be returned (The submission and its comments (without replies))
        let submissions = [];

        // Get the first submission on r/AskReddit when sorting by 'top'
        const subredditIcon = await r.getSubreddit('askReddit').community_icon;
        const submissionListing = await r.getSubreddit('askReddit').getTop({
            limit: 4
        });

        for (let i = 0; i < submissionListing.length; i++) {
            let submission = {};

            // Add all the submission meta data and text to the submission object
            submission['title'] = submissionListing[i].title;
            submission['subreddit'] = submissionListing[i].subreddit_name_prefixed;
            submission['score'] = shortenNum(submissionListing[i].score);
            submission['author'] = "u/" + submissionListing[i].author.name;
            submission['numComments'] = shortenNum(submissionListing[i].num_comments);
            submission['created'] = convertTime(submissionListing[i].created_utc);
            submission['url'] = submissionListing[i].url;
            submission['subredditIcon'] = subredditIcon;

            // Get the actual comments object
            const commentListing = await submissionListing[i].comments;

            // Fetch the comments inside the comments object from reddit
            const comments = await commentListing.fetchMore({
                amount: 4,
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

            submissions.push(submission);
        }
        return submissions;
    } catch (err) {
        console.log(err);
    }
};

async function fetchToken() {
    const response = await axios({
        method: 'post',
        url: 'https://www.reddit.com/api/v1/access_token',
        data: qs.stringify({
            grant_type: 'client_credentials',
        }),
        auth: {
            username: process.env.REDDIT_CLIENT_ID,
            password: process.env.REDDIT_CLIENT_SECRET
        }
    });
    return response.data.access_token;
}

function createClient(accessToken) {
    const r = new snoowrap({
        accessToken: accessToken,
        userAgent: "rslashbot/v0.0 by unrxly",
    });
    return r;
};
