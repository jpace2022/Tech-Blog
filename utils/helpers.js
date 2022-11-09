module.exports = {
    format_date: (date) => {
        return Date.toLocalDateString();
    },
    ifUser: (userId, commentId) => {
        return userId == commentId;
    },
    log: (item) => {
        return console.log(item);
    },
};