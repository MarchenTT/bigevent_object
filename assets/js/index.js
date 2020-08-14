$(function () {
    // 获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // console.log(11);
        layer.confirm('确定退出登录？', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            // 1.清空本地存储中的token
            localStorage.removeItem("token")
            // 2.重新跳转到登录页面
            location.href = '/login.html'

            // 关闭confirm询问框
            layer.close(index)
        })
    })

})


function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        // 渲染文字头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}