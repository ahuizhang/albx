$(function () {
    $('tbody').on('click', '.btn-danger', function () {
        let id = $(this).parents('tr').attr('data-id');
        $.get('usersDeleteById', { id: id }, (res) => {
            if (res.code == 200) {
                $('.container-fluid').text('删除成功');
                $('#modelId').modal();
                islang = true;
            } else {
                $('.container-fluid').text('删除有误');
                $('#modelId').modal();
            }
            console.log(res);
        });
    });
    let islang = false;
    $('#modelId').on('hide.bs.modal', event => {
        if (islang) {
            location.href = '/admin/users';
        }
    });
});