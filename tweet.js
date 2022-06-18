const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.LYRICK_ACCESS,
    accessSecret: process.env.LYRICK_SECRET
});

module.exports = async (ids) => {
    try {
        // Upload post title image
        const mediaId = await Promise.all([
            client.v1.uploadMedia('output/submission.png'),
        ]);

        // Tweet post title image
        const createdTweet = await client.v1.tweet("", { media_ids: mediaId });

        // Upload comments
        const mediaIds = await Promise.all([
            client.v1.uploadMedia(`output/${ids[0]}.png`),
            client.v1.uploadMedia(`output/${ids[1]}.png`),
            client.v1.uploadMedia(`output/${ids[2]}.png`),
            client.v1.uploadMedia(`output/${ids[3]}.png`),
        ]);

        // Tweet comments in reply to title image
        await client.v1.reply(
            '',
            createdTweet.id_str, { media_ids: mediaIds }
        );

        // console.log('Tweet', createdTweet.id, ':', createdTweet.text);
        return createdTweet;

    } catch (error) {
        console.log(error);
    }
};
