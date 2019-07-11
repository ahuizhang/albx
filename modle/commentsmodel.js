const mysql = require('mysql');
const come = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'albx'
});
module.exports = {
    commentsFenYeQi(pageIndex, pageSize, callback) {
        come.query(`SELECT comments.id,author,comments.created,comments.content,comments.\`status\`,posts.\`status\`
        FROM comments
        JOIN posts
        ON comments.post_id=posts.id
        LIMIT ${(pageIndex - 1) * pageSize},${pageSize}`,
            (err, ruen) => {
                callback(err, ruen);
            });
    },
    commentsCount(callback) {
        come.query(`SELECT COUNT(*) AS total FROM comments`, (err, ruen) => {
            callback(err, ruen);
        });
    }
}