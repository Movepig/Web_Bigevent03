$(function () {
    gerUserInfo()

    //点击退出，实现退出事件
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地存储token
            localStorage.removeItem('token')
            // 2.跳转到登录界面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

//获取用户信息
var layer = layui.layer
function gerUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ""
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('获取成功')
            // 成功之后，调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //控制访问权限
        complete: function (res) {
            console.log(res);
            //如果responseJSON等于1且认证失败，则强制清空token（本地存储），且返回登录页面
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清空本地存储token
                localStorage.removeItem('token')
                // 2.跳转到登录界面
                location.href = '/login.html'
            }
        }
    })
}

//渲染用户信息
function renderAvatar(user) {
    // 1.获取用户昵称(nickname是图片头像，优先nickname)
    var name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user_avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var firsr = name[0].toUpperCase()
        $('.user_avatar').html(firsr).show()
    }
}