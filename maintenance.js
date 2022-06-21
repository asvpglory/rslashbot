const fetchRedditData = require('./reddit');
const { createPost, cleanDatabase } = require('./db-modules');

if (process.env.MODE === 'store') {
    async function storeData() {
        const data = await fetchRedditData();
        // start index at '1' because index of '0' on MongoDB looks odd
        for (let i = 1; i <= data.length; i++) {
            await createPost(data[i - 1], i);
        }
        return null;
    }
    storeData();
}

if (process.env.MODE === 'clean') {
    cleanDatabase();
}
