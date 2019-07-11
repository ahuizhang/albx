$(function () {
    $('.icons').on('click', function () {
        $('.icons-contain').toggle();
    });
    $('.icons-inner > .fa').on('click', function () {
        let classname = $(this).attr('class');
        $('.icons > .fa').attr('class', classname);
        $('#classname').val(classname.substring(3));
        // console.log($('#classname').val(classname.substring(3)));
    });
    let lang = false;
    $('#btn-add').on('click', function () {
        if (utils.feiKong('#name') != 0
            || utils.feiKong('#slug') != 0) {
            return;
        }
        let data = $('#categories-form').serialize();
        // console.log(data);
        $.post('/addCategories', data, (res) => {
            if (res.code == 200) {
                let html = template('tp', res.data);
                $('tbody').append(html);
                $('.modal-body>.container-fluid').text('添加成功');
                // location.href = '/admin/categories'
                $('#modelId').modal();
                lang = true;
            }
        });
    });
    $('.btn-secondary').on('click', function () {
        if (lang) {
            location.href = '/admin/categories'
        }
    })
    let delTr = null;
    let delId = null;
    $('tbody').on('click', '.btn-danger', function () {
        delTr = $(this).parents('tr');
        delId = delTr.attr('data-id');
        $.get('/deleteById', { id: delId }, (res) => {
            if (res.code == 200) {
                delTr.remove();
            }
        });
    });
    $('tbody').on('click', '.btn-info', function () {
        let id = $(this).parents('tr').attr('data-id');
        $.get('/xinZengById', { id: id }, (res) => {
            $('#name').val(res.data.name);
            $('#slug').val(res.data.slug);
            $('.icons > .fa').attr('class', 'fa ' + res.data.classname);
            $('#classname').val(res.data.classname);
            let form = $('#categories-form');
            let frist = form.children().eq(0);
            // console.log(frist);
            if (frist.attr('type') == 'hidden') {
                frist.val(res.data.id);
            } else {
                let input = $('<input name="id" type="hidden" value="' + res.data.id + '">');
                form.prepend(input);
            }
            $('#btn-add').parents().attr('hidden', 'true');
            $('#btn-qd').parents().removeAttr('hidden');
        });
    });
    $('#btn-qd').on('click', function () {
        if (utils.feiKong('#name') != 0
            || utils.feiKong('#slug') != 0) {
            return;
        }
        let data = $('#categories-form').serialize();
        // console.log(data);
        $.post('/editCategories', data, (res) => {
            if (res.code == 200) {
                $('#btn-add').parents().attr('hidden');
                $('#btn-qd').parents().removeAttr('hidden', 'true');
                // console.log(res.data);
                let html = template('tp', res.data);
                $('tbody').append(html);
                $('.modal-body>.container-fluid').text('修改成功');
                // location.href = '/admin/categories'
                $('#modelId').modal();
                lang = true;
            }
        });
    });
    $('.btn-secondary').on('click', function () {
        if (lang) {
            location.href = '/admin/categories'
        }
    })
    $('#btn-qx').on('click', function () {
        $('#name').val('');
        $('#slug').val('');
        $('.icons > span').attr('class', 'fa fa-glass');
        $('#classname').val('fa-glass');
        $('#categories-form > input[type=hidden]').remove();
        $('#btn-add').parents().removeAttr('hidden', 'true');
        $('#btn-qd').parents('.form-group').attr('hidden', 'true');
        // let hiddenInput = $('#categories-form > input[type=hidden]');
        // console.log(hiddenInput);
        // if (hiddenInput.length == 1) {
        //     hiddenInput.val();
        // console.log(hiddenInput.val());
        // }
    });
    let piLiangDelete = $('.page-action > .btn-danger');
    $('thead input[type=checkbox]').on('click', function () {
        // let fristInput = $(this).prop('checked');
        // let minInput = $('tbody input[type=checkbox]');
        $('tbody input[type=checkbox]').prop('checked', $(this).prop('checked'));
        $(this).prop('checked') ? piLiangDelete.show() : piLiangDelete.hide();
    });
    $('tbody').on('click', 'input[type=checkbox]', function () {
        let minAll = $('tbody input[type=checkbox]')
        // console.log(minAll.length)
        // console.log(checkedAll.length)
        let checkedAll = $('tbody input[type=checkbox]:checked');
        let isCheckedAll = minAll.length === checkedAll.length
        $('thead input[type=checkbox]').prop('checked', isCheckedAll);
        checkedAll.length > 1 ? piLiangDelete.show() : piLiangDelete.hide();
    });
    piLiangDelete.on('click', function () {
        let checked = $('tbody input[type=checkbox]:checked');
        let ids = []
        checked.each((i, e) => {
            let id = $(e).parents('tr').attr('data-id')
            ids.push(id);
        });
        // console.log(ids);
        $.get('/piLiangDelete', { ids }, (res) => {
            // console.log(res);
        });
    });
    // console.dir($('tbody>tr>td').eq(4));
    $('tbody').on('click', '#nangao', function () {
        let tr = $(this).parents('tr');
        let id = tr.attr('data-id')
        let td = tr.children().eq(4);
        // console.log(td.children('a').text())
        // console.log($(this).text())
        if ($(this).text() != '显示') {
            $.get('/xiuGaiYingCang', { id }, (res) => {
                // console.log(res)
                if (res.code == 200) {
                    let html = `
                    <a id="nangao" href="javascript:;" class="btn btn-success btn-sm">显示</a>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-warning">当前没有在网站导航中显示</span> `
                    td.html(html);
                }
            });
        }
        if ($(this).text() != '隐藏') {
            $.get('/xiuGaiXianShi', { id }, (res) => {
                // console.log(res)
                if (res.code == 200) {
                    let html = `
                    <a id="nangao" href="javascript:;" class="btn btn-warning btn-sm">隐藏</a>&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="text-success">当前在网站导航中显示</span>`
                    td.html(html);
                }
            })
        }
    })
});