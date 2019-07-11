const usermodle = require('../modle/usermodle');
module.exports = {
    getIndex(req, res) {
        res.render('index');
    },
    getList(req, res) {
        res.render('list');
    },
    getDetail(req, res) {
        res.render('detail');
    },
    getIndexView(req, res) {
        if (req.session.lang) {
            res.render('admin/index');
        } else {
            res.send('<script>location.href = "/admin/login"</script>');
        }
    },
    getLogin(req, res) {
        res.render('admin/login');
    },
    getcomments(req, res) {
        res.render('admin/comments');
    },
    getPasswordReset(req, res) {
        res.render('admin/password-reset');
    },
    getPostAdd(req, res) {
        res.render('admin/post-add');
    },
    getprofile(req, res) {
        res.render('admin/profile');
    },
    getsettings(req, res) {
        res.render('admin/settings');
    },
    getslides(req, res) {
        res.render('admin/slides');
    },
    getUsers(req, res) {
        usermodle.postUsersShuJu((err, ruen) => {
            if (err) console.error(err);
            res.render('admin/users', { data: ruen });
        });
    }
}