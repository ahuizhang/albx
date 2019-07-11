$(function () {
    function getAjaxFenYe(option) {
        $.post('/getPostByFilter', option, (res) => {
            // console.log(res);
            if (res.code == 200) {
                // console.log(res);
                let html = template('tp', res.data);
                $('tbody').html(html);
                feiYeQi(option.pageIndex, res.max);
            }
        });
    }
    getAjaxFenYe({
        id: 'all',
        status: 'all',
        pageIndex: 1,
        pageSize: 10
    });

    function feiYeQi(dangQian, max) {
        let zongFenYeGe = 5;
        // let dangQian = 10;
        let stars = dangQian - Math.floor(zongFenYeGe - 1) / 2;
        if (stars <= 1) {
            stars = 1;
        }
        let end = stars + (zongFenYeGe - 1);
        if (end >= max) {
            end = max;
            stars = end - (zongFenYeGe - 1);
            if (stars <= 1) {
                stars = 1;
            }
        }
        let html = '';
        if (dangQian != 1) {
            html += `<li class="page-item"><a data-index="${dangQian - 1}" class="page-link" href="javascript:void(0);">上一页</a></li>`;
        }
        for (var i = stars; i <= end; i++) {
            if (i === dangQian) {
                html += `<li class="page-item active"><a data-index="${i}" class="page-link" href="javascript:void(0);">${i}</a></li>`;
            } else {
                html += `<li class="page-item"><a data-index="${i}" class="page-link" href="javascript:void(0);">${i}</a></li>`;
            }
        }
        if (dangQian != max) {
            html += `<li class="page-item"><a data-index="${dangQian + 1}" class="page-link" href="javascript:void(0);">下一页</a></li>`;
        }

        $('.pagination').html(html);
    }
    $('.pagination').on('click', '.page-link', function () {
        let pageIndex = parseInt($(this).attr('data-index'));
        let pageSize = 10;
        let id = $('#fenLei').val();
        let status = $('#stutas').val();
        getAjaxFenYe({
            pageIndex,
            pageSize,
            id,
            status
        });
        // $.post('/allpostsBy', { pageIndex, pageSize }, (res) => {
        //     // console.log(res);
        //     if (res.code == 200) {
        //         let html = template('tp', res.data);
        //         $('tbody').html(html);
        //         feiYeQi(pageIndex, res.max);
        //     }
        // });
    });
    $.get('/getALLCateg', (res) => {
        // console.log(res);
        let html = `<option value="all">所有分类</option>`;
        for (let i = 0; i < res.data.length; i++) {
            html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`;
        }
        $('#fenLei').html(html);
    });
    $('#sx').on('click', function () {
        let id = $('#fenLei').val();
        let status = $('#stutas').val();
        getAjaxFenYe({
            id,
            status,
            pageIndex: 1,
            pageSize: 10
        });
    });
});