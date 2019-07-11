const postsmodle = require('../modle/postsmodle');
const formidable = require('formidable');
const moment = require('moment');
module.exports = {
    getPosts(req, res) {
        res.render('admin/posts');
    },
    // allpostsBy(req, res) {
    //     postsmodle.getPostsData(req.body.pageIndex, req.body.pageSize, (err, ruen) => {
    //         if (err) console.error(err);
    //         // console.log(ruen);
    //         // moment(ruen[0].created).format('YYYY-MM-DD HH:mm:ss');
    //         // console.log(moment(ruen[0].created).format('YYYY-MM-DD HH:mm:ss'))
    //         ruen.forEach(e => {
    //             e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss');
    //         });
    //         let resObj = {}
    //         if (ruen.length > 0) {
    //             resObj.code = 200;
    //             resObj.msg = '成功';
    //             resObj.data = ruen;
    //             // console.log(ruen);
    //             postsmodle.getMax((err, ruen) => {
    //                 if (err) console.error(err);
    //                 if (ruen) {
    //                     max = Math.ceil(ruen[0].total / req.body.pageSize);
    //                     resObj.max = max;
    //                 }
    //                 res.send(resObj);
    //             });
    //         } else {
    //             resObj.code = 401;
    //             resObj.msg = '失败';
    //             res.send(resObj);
    //         }
    //     });
    // },
    getPostByFilter(req, res) {
        // console.log(req.body);
        let { pageIndex, pageSize, id, status } = req.body;
        // let offset = (pageIndex - 1) * pageSize;
        let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` 
        FROM posts 
        JOIN users ON posts.user_id=users.id
        JOIN categories ON posts.category_id=categories.id    `
        // let content = '';
        // if (id != 'all' || status != 'all') {
        //     content += ` where `;
        // }
        // if (id != 'all') {
        //     content += ` posts.category_id=${id} `
        // }
        // if (status != 'all') {
        //     if (id != 'all') {
        //         content += ' and '
        //     }
        //     content += ` posts.\`status\`=${status} `
        // }
        let content = '';
        if (id != 'all' || status != 'all') {
            content += ` where `;
        }
        if (id != 'all') {
            content += ` posts.category_id=${id} `;
        }
        if (status != 'all') {
            if (id != 'all') {
                content += ' and ';
            }
            content += ` posts.\`status\`='${status}' `;
        }
        sql += content;
        sql += ` LIMIT ${(pageIndex - 1) * pageSize},${pageSize} `;
        postsmodle.getPostsByFilter(sql, (err, ruen) => {
            // console.log(sql)
            // console.log(ruen);
            if (err) console.error(err);
            let resObj = {}
            ruen.forEach(e => {
                e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss');
            });
            // console.log(ruen)
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '成功';
                resObj.data = ruen;
                postsmodle.getMax(content, (err, ruen) => {
                    if (err) console.error(err);
                    if (ruen) {
                        max = Math.ceil(ruen[0].total / req.body.pageSize);
                        resObj.max = max;
                    }
                    res.send(resObj);
                })
            } else {
                resObj.code = 401;
                resObj.msg = '失败';
                res.send(resObj);
            }
        });
    },
    uploadImages(req, res) {
        let form = new formidable.IncomingForm();
        form.uploadDir = __dirname + '/../uploads';
        form.keepExtensions = true;
        form.parse(req, (err, file, files) => {
            let resObj = {
                code: 401,
                msg: '上传失败'
            }
            if (!err) {
                resObj.code = 200;
                resObj.msg = '上传成功';
                let index = files.pic.path.indexOf('uploads');
                resObj.data = '/' + files.pic.path.substring(index);
            }
            res.send(resObj);
        });
    },
    postAddNew(req, res) {
        user_id = req.session.isUser.id;
        req.body.user_id = user_id;
        postsmodle.postAddNew(req.body, (err, ruen) => {
            if (err) console.error(err);
            let resObj = {}
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '新增成功';
            } else {
                resObj.code = 401;
                resObj.msg = '新增失败';
            }
            res.send(resObj);
        });
    },
    xiuGaiWenZhang(req, res) {
        postsmodle.getWenZhangById(req.query.id, (err, ruen) => {
            if (err) console.error(err);
            let resObj = {}
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = ruen[0]
            } else {
                resObj.code = 401;
                resObj.msg = '获取失败';
            }
            res.send(resObj);
        });
    },
    addPostAddNew(req, res) {
        let id = req.body.id
        delete req.body.id
        postsmodle.addPostAddNewWenZhang(id, req.body, (err, ruen) => {
            if (err) console.error(err);
            let resObj = {}
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '修改成功';
            } else {
                resObj.code = 401;
                resObj.msg = '修改失败';
            }
            res.send(resObj);
        })
    },
    getPostsWenZhangShuJu(req, res) {
        postsmodle.getPostsWenZhangShuJu((err, ruen) => {
            if (err) console.log(err);
            let resObj = {}
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = ruen;
            } else {
                resObj.code = 401;
                resObj.msg = '获取失败';
            }
            res.send(resObj)
        })
    },
    huoQuListPost(req, res) {
        // console.log(req.query.id)
        postsmodle.huoQuListPost(req.query.id, req.query.pageIndex, req.query.pageSize, (err, ruen) => {
            if (err) console.log(err);
            // console.log(ruen)
            let resObj = {}
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '成功';
                resObj.data = ruen;
            } else {
                resObj.code = 200;
                resObj.msg = '失败';
            }
            res.send(resObj);
        })
    },
    detailPosts(req, res) {
        postsmodle.detailPosts(req.query.id, (err, ruen) => {
            if (err) console.log(err);
            let resObj = {}
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '成功'
                resObj.data = ruen[0];
            } else {
                resObj.code = 401;
                resObj.msg = '失败'
            }
            res.send(resObj)
        })
    }
}