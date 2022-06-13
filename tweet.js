const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.LYRICK_ACCESS,
    accessSecret: process.env.LYRICK_SECRET
});

module.exports = async () => {
    try {

        const mediaIds = await Promise.all([
            client.v1.uploadMedia('./output/submission.png'),

        ]);

        await client.v1.tweet('Images.', { media_ids: mediaIds });

        // console.log('Tweet', createdTweet.id, ':', createdTweet.text);

        // return createdTweet;

    } catch (error) {
        console.log(error);
    }
};