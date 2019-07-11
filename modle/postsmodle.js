const mysql = require('mysql');
const come = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'albx'
});
module.exports = {
    // getPostsData: (callback) => {
    //     come.query(`SELECT * FROM posts`, (err, ruen) => {
    //         callback(err, ruen);
    //     });
    // }
    // getPostsData: (pageIndex, pageSize, callback) => {
    //     let sql = ` SELECT posts.id,title,posts.\`status\`,created,nickname,\`NAME\` FROM posts
    //     JOIN users ON posts.user_id=user_id 
    //     JOIN categories ON posts.category_id=category_id   
    //     LIMIT ${(pageIndex - 1) * pageSize},${pageSize}`;
    //     come.query(sql, (err, ruen) => {
    //         callback(err, ruen);
    //     });
    // },
    getMax: (content, callback) => {
        come.query(`SELECT COUNT(*) AS total FROM posts ` + content, (err, ruen) => {
            callback(err, ruen);
        });
    },
    getPostsByFilter: (sql, callback) => {
        come.query(sql, (err, ruen) => {
            callback(err, ruen);
        });
    },
    postAddNew: (data, callback) => {
        come.query(`INSERT INTO posts SET ?`, data, (err, ruen) => {
            callback(err, ruen);
        });
    },
    getWenZhangById: (id, callback) => {
        come.query(`SELECT * FROM posts WHERE id=${id}`, (err, ruen) => {
            callback(err, ruen);
        });
    },
    addPostAddNewWenZhang: (id, data, callback) => {
        come.query(`UPDATE posts SET ? WHERE id=${id}`, data, (err, ruen) => {
            callback(err, ruen);
        })
    },
    getPostsWenZhangShuJu: (callback) => {
        come.query(`SELECT 
        posts.id,title,content,created,feature,views,likes,
        users.nickname,
        (SELECT count(*) FROM comments WHERE post_id = posts.id)
        as commentTotal,
        categories.\`name\`
         FROM posts
        JOIN categories ON posts.category_id=categories.id
        JOIN users ON posts.user_id=users.id
        ORDER BY created DESC
        LIMIT 5`, (err, ruen) => {
                callback(err, ruen)
            })
    },
    huoQuListPost: (id, pageIndex, pageSize, callback) => {
        let offset = (pageIndex - 1) * pageSize;
        come.query(`SELECT 
        posts.id,title,content,created,feature,views,likes,
        users.nickname,
        categories.\`name\`
        FROM posts
        JOIN categories ON posts.category_id=categories.id
        JOIN users ON posts.user_id=users.id
        WHERE category_id = ${id}
        LIMIT ${offset},${pageSize}`,
            (err, ruen) => {
                callback(err, ruen)
            })
    },
    detailPosts: (id, callback) => {
        come.query(`SELECT 
        categories.\`name\`,categories.id as category_id,
        posts.id,title,content,created,views,
        users.nickname
        FROM posts
        JOIN categories ON posts.category_id=categories.id
        JOIN users ON users.id=posts.user_id
        WHERE posts.id = ${id}`, (err, ruen) => {
                callback(err, ruen);
            })
    }

}