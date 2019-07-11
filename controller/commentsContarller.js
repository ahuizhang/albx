const commentsModel = require('../modle/commentsmodel');
module.exports = {
    commentsFenYeQi(req, res) {
        let { pageIndex, pageSize } = req.query
        // console.log(pageIndex, pageSize);
        commentsModel.commentsFenYeQi(pageIndex, pageSize, (err, ruen) => {
            if (err) console.error(err)
            // console.log(ruen);
            let resObj = {}
            if (ruen.length > 0) {
                resObj.code = 200;
                resObj.msg = '获取成功';
                resObj.data = ruen;
                commentsModel.commentsCount((err, ruen) => {
                    if (err) console.error(err);
                    if (ruen.length > 0) {
                        let total = ruen[0].total
                        resObj.max = Math.ceil(total / pageSize);
                    }
                    res.send(resObj);
                });
            } else {
                resObj.code = 401;
                resObj.msg = '获取失败';
                res.send(resObj);
            }
        })
    }
}