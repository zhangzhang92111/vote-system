// 后台登录处理
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // 默认账号密码验证
        if (username === 'admin' && password === '123456') {
            // 登录成功，设置登录状态
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            // 跳转到后台首页
            window.location.href = 'index.html';
        } else {
            // 登录失败，显示错误提示
            loginError.textContent = '账号或密码错误';
            loginError.style.display = 'block';
        }
    });
});