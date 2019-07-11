const categoriesmodel = require('../modle/categoriesmodel');
module.exports = {
    getcategories(req, res) {
        categoriesmodel.getCategoriesShuJu((err, ruen) => {
            if (err) console.error(err);
            res.render('admin/categories', { arr: ruen });
        });
    },
    addCategories(req, res) {
        categoriesmodel.addCategoriesShuJu(req.body, (err, ruen) => {
            // console.log(req.body);
            if (err) console.error(err);
            let resObj = {};
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '新增成功'
                let id = ruen.insertId;
                // console.log(id);
                categoriesmodel.addCategoriesById(id, (err, ruen) => {
                    // console.log(ruen);
                    if (err) console.error(err);
                    if (ruen) {
                        resObj.data = ruen;
                    } else {
                        resObj.msg = '找不到数据';
                    }
                    res.send(resObj);
                });
            } else {
                resObj.code == 401;
                resObj.msg == '新增失败';
                res.send(resObj);
            }
        });
    },
    deleteById(req, res) {

        categoriesmodel.deleteByIdShuJu(req.query.id, (err, ruen) => {
            // console.log(req.query.id);
            if (err) console.error(err);
            let resObj = {}
            // console.log(ruen.affectedRows);
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '删除成功';
            } else {
                resObj.code = 401;
                resObj.msg = '删除失败';
            }
            res.send(resObj);
        });
    },
    xinZengById(req, res) {
        categoriesmodel.addCategoriesById(req.query.id, (err, ruen) => {
            if (err) console.error(err);
            let resObj = {}
            if (ruen) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = ruen;
            } else {
                resObj.code = 401;
                resObj.msg = '获取失败';
            }
            res.send(resObj);
        });
    },
    editCategories(req, res) {
        // console.log(req.body);
        let { id, name, slug, classname } = req.body
        // console.log({ name, slug, classname } = req.body);
        // console.log(id);
        categoriesmodel.categoriesmodel(id, { name, slug, classname }, (err, ruen) => {
            if (err) console.error(err);
            let resObj = {}
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '修改成功';
                // resObj.data = ruen;
                // let id = ruen.id;
                // console.log(id);
                categoriesmodel.addCategoriesById(id, (err, ruen) => {
                    console.log(ruen)
                    if (err) console.error(err);
                    if (ruen) {
                        resObj.data = ruen;
                    } else {
                        resObj.msg = '找不到数据';
                    }
                    res.send(resObj)
                });
            } else {
                resObj.code = 401;
                resObj.msg = '修改失败';
                res.send(resObj);
            }
        });
    },
    piLiangDelete(req, res) {
        categoriesmodel.piLiangDeleteByIds(req.query.ids, (err, ruen) => {
            if (err) console.log(err);
            let resObj = {}
            if (ruen.affectedRows != 0) {
                resObj.code = 200;
                resObj.msg = '删除成功';
            } else {
                resObj.code = 401;
                resObj.msg = '删除失败';
            }
            res.send(resObj);
        });
    },
    getALLCateg(req, res) {
        categoriesmodel.getCategoriesShuJu((err, ruen) => {
            if (err) console.error(err);
            // console.log(ruen);
            let resObj = {};
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = ruen;
            } else {
                resObj.code = 401;
                resObj.msg = '获取失败';
            }
            res.send(resObj);
        });
    },
    getCategoriesName(req, res) {
        categoriesmodel.getCategoriesName((err, ruen) => {
            if (err) console.log(err);
            let resObj = {
                code: 401,
                msg: '获取失败'
            }
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = ruen;
                res.send(resObj);
            } else {
                res.send(resObj);
            }
        })
    },
    xiuGaiYingCang(req, res) {
        categoriesmodel.xiuGaiYingCang(req.query.id, (err, ruen) => {
            if (err) console.log(err);
            let resObj = {}
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '隐藏成功';
            } else {
                resObj.code = 401;
                resObj.msg = '隐藏失败';
            }
            res.send(resObj);
        });
    },
    xiuGaiXianShi(req, res) {
        categoriesmodel.xiuGaiXianShi(req.query.id, (err, ruen) => {
            if (err) console.log(err);
            let resObj = {}
            if (ruen.affectedRows == 1) {
                resObj.code = 200;
                resObj.msg = '显示成功';
            } else {
                resObj.code = 401;
                resObj.msg = '显示失败';
            }
            res.send(resObj);
        });
    }
}