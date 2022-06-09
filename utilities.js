const timeAgo = require('epoch-to-timeago').timeAgo;

// Converts epoch time into human readable 'time ago' format
module.exports.convertTime = (created) => {
    const now = new Date().getTime();
    const timeSince = timeAgo(created * 1000, now);
    return timeSince;
};

