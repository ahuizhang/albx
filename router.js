const express = require('express');
const router = express.Router();
const pagecontorller = require('./controller/pagecontorller');
const usercontroller = require('./controller/usercontroller');
const postscontarller = require('./controller/postscontroller');
const categoriesContarller = require('./controller/categoriesContarller');
router.get('/', (req, res) => {
    pagecontorller.getIndex(req, res);
});
router.get('/index', (req, res) => {
    pagecontorller.getIndex(req, res);
});
router.get('/list', (req, res) => {
    pagecontorller.getList(req, res);
});
router.get('/detail', (req, res) => {
    pagecontorller.getDetail(req, res);
});
router.get('/admin/login', (req, res) => {
    pagecontorller.getLogin(req, res);
});
router.get('/admin', (req, res) => {
    pagecontorller.getIndexView(req, res);
});
router.get('/admin/index', (req, res) => {
    pagecontorller.getIndexView(req, res);
});
router.get('/admin/categories', (req, res) => {
    categoriesContarller.getcategories(req, res);
});
router.get('/admin/comments', (req, res) => {
    pagecontorller.getcomments(req, res);
});
router.get('/admin/password-reset', (req, res) => {
    pagecontorller.getPasswordReset(req, res);
});
router.get('/admin/post-add', (req, res) => {
    pagecontorller.getPostAdd(req, res);
});
router.get('/admin/posts', (req, res) => {
    postscontarller.getPosts(req, res);
});
router.get('/admin/profile', (req, res) => {
    pagecontorller.getprofile(req, res);
});
router.get('/admin/settings', (req, res) => {
    pagecontorller.getsettings(req, res);
});
router.get('/admin/slides', (req, res) => {
    pagecontorller.getslides(req, res);
});
router.get('/admin/users', (req, res) => {
    pagecontorller.getUsers(req, res);
});
router.post('/admin/getLoginUser', (req, res) => {
    usercontroller.postUser(req, res);
});
router.get('/admin/usersDeleteById', (req, res) => {
    usercontroller.getDeleteById(req, res);
});
router.post('/allUserTouXiang', (req, res) => {
    usercontroller.allUserTouXiang(req, res);
});
router.post('/addCategories', (req, res) => {
    categoriesContarller.addCategories(req, res);
});
router.get('/deleteById', (req, res) => {
    categoriesContarller.deleteById(req, res);
});
router.get('/xinZengById', (req, res) => {
    categoriesContarller.xinZengById(req, res);
});
router.post('/editCategories', (req, res) => {
    categoriesContarller.editCategories(req, res);
});
router.post('/allpostsBy', (req, res) => {
    postscontarller.allpostsBy(req, res);
});
router.get('/piLiangDelete', (req, res) => {
    categoriesContarller.piLiangDelete(req, res);
});
router.get('/getALLCateg', (req, res) => {
    categoriesContarller.getALLCateg(req, res);
});
router.post('/getPostByFilter', (req, res) => {
    postscontarller.getPostByFilter(req, res);
});
router.post('/uploadImages', (req, res) => {
    postscontarller.uploadImages(req, res);
});
router.post('/postAddNew', (req, res) => {
    postscontarller.postAddNew(req, res);
});
router.get('/xiuGaiWenZhang', (req, res) => {
    postscontarller.xiuGaiWenZhang(req, res);
});
router.post('/addPostAddNew', (req, res) => {
    postscontarller.addPostAddNew(req, res);
});
const commentsContarller = require('./controller/commentsContarller')
router.get('/commentsFenYeQi', (req, res) => {
    commentsContarller.commentsFenYeQi(req, res);
});
router.get('/userOut', (req, res) => {
    usercontroller.userOut(req, res);
});
router.get('/getCategoriesName', (req, res) => {
    categoriesContarller.getCategoriesName(req, res);
});
router.get('/xiuGaiYingCang', (req, res) => {
    categoriesContarller.xiuGaiYingCang(req, res);
})
router.get('/getPostsWenZhangShuJu', (req, res) => {
    postscontarller.getPostsWenZhangShuJu(req, res);
});
router.get('/xiuGaiXianShi', (req, res) => {
    categoriesContarller.xiuGaiXianShi(req, res);
});
router.get('/huoQuListPost', (req, res) => {
    postscontarller.huoQuListPost(req, res);
})
router.get('/detailPosts', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    postscontarller.detailPosts(req, res)
})
module.exports = router;