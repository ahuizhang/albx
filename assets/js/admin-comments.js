$(function () {

    function commentsFenYeQi(pageIndex, pageSize) {
        $.get('/commentsFenYeQi', { pageIndex, pageSize }, (res) => {
            // console.log(res.data);
            if (res.code == 200) {
                let html = template('tp', res.data)
                $('tbody').html(html);
                initPagination(res.max);

            }
        })
    }
    commentsFenYeQi(1, 10);


    function initPagination(max) {
        // console.log(max)
        $(".pagination").twbsPagination({
            totalPages: max,
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                commentsFenYeQi(page, 10);
            }
        });
    }
})