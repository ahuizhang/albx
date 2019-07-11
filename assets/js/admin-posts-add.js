$(function () {
    $('#feature').on('change', function () {
        let file = this.files[0]
        let fn = new FormData();
        fn.append('pic', file);
        $.ajax({
            type: 'post',
            url: '/uploadImages',
            contentType: false,
            processData: false,
            data: fn,
            success: function (res) {
                if (res.code == 200) {
                    $('.thumbnail').attr('src', res.data).show();
                    $('#img').val(res.data);
                }
            }
        })
    });
    $.get('/getALLCateg', (res) => {
        // console.log(res);
        let html = `<option value="all">所有分类</option>`;
        for (let i = 0; i < res.data.length; i++) {
            html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`;
        }
        $('#category').html(html);
    });

    CKEDITOR.replace('content');

    let id = utils.idFenGeQi().id;

    if (location.search) {
        $.get('/xiuGaiWenZhang', { id }, (res) => {
            // console.log(res);
            if (res.code == 200) {
                $('#title').val(res.data.title);
                $('#slug').val(res.data.slug);
                $('#img').val(res.data.feature);
                $('#created').val(res.data.created.substring(0, 16));
                $('#category').val(res.data.category_id);
                $('#status').val(res.data.status);
                $('#content').val(res.data.content);
                $('.thumbnail').attr('src', res.data.feature).show();
                // console.log(res.data.feature);
                // console.log(res.data.created);
                let frist = $('#form').children().eq(0);
                // console.log(frist);
                if (frist.attr('type') === 'hidden') {
                    frist.val(res.data.id);
                } else {
                    let input = $(`<input type="hidden" name="id" value="${res.data.id}">`);
                    $('#form').prepend(input);
                }
            }
        });
        $('#btn-sere').on('click', function () {
            CKEDITOR.instances.content.updateElement();
            let data = $('#form').serialize();
            console.log(data)
            $.post('/addPostAddNew', data, (res) => {
                if (res.code == 200) {

                }
            });
        })
    } else {
        $('#btn-sere').on('click', function () {
            // if (utils.feiKong('#title') != 0
            //     || utils.feiKong('#slug') != 0
            //     || utils.feiKong('#category') != 0
            //     || utils.feiKong('#created') != 0
            //     || utils.feiKong('#status') != 0
            //     || CKEDITOR.instances.content.updateElement().trim().length != 0) {
            //     $('.modal-body>container-fluid').text('不能为空');
            //     $('#modelId').modal();
            // }
            CKEDITOR.instances.content.updateElement();
            // console.log(CKEDITOR.instances.content.updateElement());
            let data = $('#form').serialize();
            // console.log(data)
            $.post('/postAddNew', data, (res) => {
                if (res.code == 200) {
                    // $('.modal-body>container-fluid').text('保存成功');
                    // $('#modelId').modal();
                }
            });
        });
    }
})