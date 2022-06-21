const fetchRedditData = require('./reddit');
const { createPost, cleanDatabase } = require('./db-modules');

async function maintenance() {
    await cleanDatabase();
    const data = await fetchRedditData();
    // start index at '1' because index of '0' on MongoDB looks odd
    for (let i = 1; i <= data.length; i++) {
        await createPost(data[i - 1], i);
    }
    return null;
}
maintenance();

