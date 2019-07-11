$(function () {
    let id = utils.idFenGeQi().id;
    function qianTaiFenYeQi() {
        $.get('/huoQuListPost', { pageIndex: index, pageSize: 5, id }, (res) => {
            // console.log(res);
            if (res.code == 200) {
                $('.new>h3').text(res.data[0].name);
                let html = template('tp', res.data)
                $('.new').append(html);
            }
        })
    }
    let index = 1;
    qianTaiFenYeQi();
    $('#btn-load-more').on('click', () => {
        index++;
        qianTaiFenYeQi();
    })
})