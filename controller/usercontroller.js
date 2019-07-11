const usermodle = require('../modle/usermodle');
module.exports = {
    postUser: (req, res) => {
        usermodle.getUserAndPassword(req.body.email, req.body.password, (err, ruen) => {
            if (err) console.error(err);
            let resObj = {}
            if (ruen) {
                resObj.code = 200;
                resObj.msg = '登录成功';
                req.session.lang = true;
                req.session.isUser = ruen;
                // console.log(req.session);
            } else {
                resObj.code = 401;
                resObj.msg = '登入失败';
            }
            res.send(resObj);
        });
    },
    getDeleteById: (req, res) => {
        usermodle.getDeteleIdShuJu(req.query.id, (err, ruen) => {
            if (err) console.error(err);
            if (ruen.affectedRows == 1) {
                res.send({
                    code: 200,
                    msg: '删除成功'
                })
            } else {
                res.send({
                    code: 401,
                    msg: '删除失败'
                })
            }
        });
    },
    allUserTouXiang: (req, res) => {
        if (req.session.isUser) {
            let { nickname, avatar } = req.session.isUser;
            res.send({
                code: 200,
                msg: '获取成功',
                data: { nickname, avatar }
            });
        } else {
            res.send({
                code: 401,
                msg: '获取失败'
            });
        }
    },
    userOut: (req, res) => {
        req.session.lang = false;
        res.send({
            code: 200,
            msg: '成功'
        });
    }
}