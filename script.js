document.getElementById('convert-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    const password = generatePassword(url);
    const resultElement = document.getElementById('result');
    resultElement.textContent = `密码: ${password}`;
    
    // 使用环境变量中的域名进行跳转
    const domain = process.env.CUSTOM_DOMAIN || 'default-domain.com';
    window.location.href = `https://${domain}/${password}`;
});

function generatePassword(url) {
    const chars = ['✗', '✘', 'x', '×', 'X', '✕', '☓', '✖'];
    let hash = 0;

    for (let i = 0; i < url.length; i++) {
        hash = (hash << 5) - hash + url.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    let password = '';
    while (hash) {
        password += chars[Math.abs(hash % chars.length)];
        hash = Math.floor(hash / chars.length);
    }

    return password || chars[0]; // Default to first character if empty
}
