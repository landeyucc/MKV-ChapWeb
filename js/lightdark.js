// 获取主题切换按钮和body元素
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 检查localStorage中是否有存储的颜色模式信息
const currentTheme = localStorage.getItem('theme');

// 如果有缓存信息，应用缓存的颜色模式
if (currentTheme) {
    body.classList.add(currentTheme);
} else {
    // 默认使用浅色模式
    body.classList.add('light-mode');
}

// 为主题切换按钮添加点击事件监听器
themeToggle.addEventListener('click', () => {
    // 切换颜色模式
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        // 将深色模式信息存储到localStorage中
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        // 将浅色模式信息存储到localStorage中
        localStorage.setItem('theme', 'light-mode');
    }
});