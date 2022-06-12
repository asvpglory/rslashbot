const timeAgo = require('epoch-to-timeago').timeAgo;

// Converts epoch time into human readable 'time ago' format
module.exports.convertTime = (created) => {
    const now = new Date().getTime();
    let timeSince = timeAgo(created * 1000, now);
    timeSince = '∙ ' + timeSince;
    return timeSince;
};

module.exports.shortenNum = (number) => {
    const numString = number.toString();
    switch (numString.length) {
        case 4: {
            if (numString[1] > 0) {
                return `${numString[0]}.${numString[1]}k`;
            }
            return `${numString[0]}k`;
        }
        case 5: {
            if (numString[2] > 0) {
                return `${numString.slice(0, 2)}.${numString[2]}k`;
            }
            return `${numString.slice(0, 2)}k`;
        }
        case 6: {
            if (numString[3] > 0) {
                return `${numString.slice(0, 3)}.${numString[3]}k`;
            }
            return `${numString.slice(0, 3)}k`;
        }
        default:
            return numString;
    }
};
