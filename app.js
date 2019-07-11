const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const router = require('./router');
const port = 8080;
const ip = '127.0.0.1';
app.listen(port, ip, () => {
    console.log(`准备就绪 http://${ip}:${port} 访问`);
});
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: 'wanmeimiyaozhh',
    resave: false,
    saveUninitialized: true
}));
app.use(router);