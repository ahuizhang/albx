const mysql = require('mysql');
const come = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'albx'
});
module.exports = {
    getCategoriesShuJu(callback) {
        come.query(`SELECT * FROM categories`, (err, ruen) => {
            callback(err, ruen);
        });
    },
    addCategoriesShuJu(data, callback) {
        come.query(`INSERT INTO categories SET NAME='${data.name}',slug='${data.slug}',classname='${data.classname}'`, (err, ruen) => {
            callback(err, ruen);
        });
    },
    addCategoriesById(id, callback) {
        come.query(`SELECT * FROM categories WHERE id=${id}`, (err, ruen) => {
            callback(err, ruen[0]);
        });
    },
    deleteByIdShuJu(id, callback) {
        come.query(`DELETE FROM categories WHERE id=${id}`, (err, ruen) => {
            callback(err, ruen);
        });
    },
    categoriesmodel(id, data, callback) {
        come.query(`UPDATE categories SET ? WHERE id=${id}`, data, (err, ruen) => {
            callback(err, ruen);
        });
    },
    piLiangDeleteByIds(ids, callback) {
        let data = ids.join()
        come.query(`DELETE FROM categories WHERE id in (${data})`, (err, ruen) => {
            callback(err, ruen)
        })
    },
    getCategoriesName(callback) {
        come.query(`SELECT *FROM categories WHERE isShow=1`, (err, ruen) => {
            callback(err, ruen);
        })
    },
    xiuGaiYingCang(id, callback) {
        come.query(`UPDATE categories SET isShow=0 WHERE id=${id}`, (err, ruen) => {
            callback(err, ruen);
        })
    },
    xiuGaiXianShi(id, callback) {
        come.query(`UPDATE categories SET isShow=1 WHERE id=${id}`, (err, ruen) => {
            callback(err, ruen);
        })
    }
}