$(function () {
    $.get('/getPostsWenZhangShuJu', (res) => {
        console.log(res);
        console.log(res.data)
        let html = template('tp', res.data)
        $('.new').html(html);
    })
})