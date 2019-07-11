$(function () {
    let id = utils.idFenGeQi().id
    console.log(id)
    $.get('/detailPosts', { id: id }, (res) => {
        console.log(res)
        if (res.code == 200) {
            let html = template('tp', res.data)
            $(".content").prepend(html);
        }
    })
})