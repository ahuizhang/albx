$(function () {
    $('#navOut').on('click', function () {
        $.get('/userOut', (res) => {
            if (res.code == 200) {
                location.href = '/admin/login';
            }
        })
    })
})