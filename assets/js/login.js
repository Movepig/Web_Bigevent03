$(function () {

    // 点击去注册登录跳转
    $('#link_reg').on('click', function () {
        // alert(1)
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //密码校验(如何验证？？)
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能有空格'],
        repwd: function (value) { 
            //先获取上次I=密码输入的值
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) { 
                return '两次密码输入不一致'
            }
        }
    })

    // 注册表单提交事件
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('注册成功');
                //成功之后直接跳转到登录界面
                $('#link_login').click()
             }
        })
    })
    
    // 点击登录提交表单事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.getItem('token', res.token);
                //成功之后跳转到后台页面
                location.href= '/index.html'

            }
        })
    })

})