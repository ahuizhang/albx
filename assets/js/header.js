$(function () {
    $.get('/getCategoriesName', (res) => {
        // console.log(res);
        if (res.code == 200) {
            // console.log(res.data);
            let html = ''
            res.data.forEach(e => {
                html += `<li><a href="/list?id=${e.id}"><i class="fa ${e.classname}"></i>${e.name}</a></li>`
            });
            $('.nav').html(html);
        }
    })
})