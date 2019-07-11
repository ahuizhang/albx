$(function () {
    if (location.href.indexOf('/admin/posts') != -1
        || location.href.indexOf('/admin/post-add') != -1
        || location.href.indexOf('/admin/categories') != -1
    ) {
        $('#posts-tab').attr('aria-expanded', 'true').removeClass('collapsed');
        $('#menu-posts').addClass('show');
    } else if (location.href.indexOf('/admin/slides') != -1
        || location.href.indexOf('/admin/settings') != -1
    ) {
        $('#sheZhi-tab').attr('aria-expanded', 'true').removeClass('collapsed');
        $('#menu-settings').addClass('show');
    }
    // let index = location.href.indexOf('/admin') + 7;
    // console.log(location.href.indexOf('/admin'));
    // let delid = location.href.substring(index);
    let delid = location.pathname.substring(7)
    // console.log(delid)
    $("#" + delid).addClass('active');
    $.post('/allUserTouXiang', (res) => {
        if (res.code == 200) {
            $('.avatar').attr('src', res.data.avatar);
            $('.name').text(res.data.nickname);
        }
    });
});