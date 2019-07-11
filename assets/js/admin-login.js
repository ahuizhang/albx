$(function () {
    $('#btn-login').on('click', function () {
        let lang = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (utils.feiKong('#email')
            || !lang.test($('#email').val())) {
            $('.container-fluid').text('用户名为空或格式不正确');
            $('#modelId').modal();
            return;
        } else if (utils.feiKong('#password')) {
            $('.container-fluid').text('密码不能为空');
            $('#modelId').modal();
            return;
        }
        let data = $('.login-wrap').serialize();
        $.post('getLoginUser', data, (res) => {
            if (res.code == 200) {
                $('.container-fluid').text('登入成功');
                $('#modelId').modal();
                islang = true;
            } else {
                $('.container-fluid').text('登入失败，用户名或密码错误');
                $('#modelId').modal();
            }
        });
    });
    let islang = false;
    $('#modelId').on('hide.bs.modal', event => {
        if (islang) {
            location.href = '/admin/index';
        }
    });
});