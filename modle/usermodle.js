const mysql = require('mysql');
const come = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'albx'
});
module.exports = {
    getUserAndPassword: (email, password, callback) => {
        come.query(`SELECT * FROM users WHERE email='${email}' AND \`password\`='${password}'`, (err, ruen) => {
            callback(err, ruen[0]);
        });
    },
    postUsersShuJu: (callback) => {
        come.query(`SELECT * FROM users WHERE isdelete=0`, (err, ruen) => {
            callback(err, ruen);
        });
    },
    getDeteleIdShuJu: (id, callback) => {
        come.query(`UPDATE users SET isdelete=1 WHERE id=${id}`, (err, ruen) => {
            callback(err, ruen);
        });
    }
}