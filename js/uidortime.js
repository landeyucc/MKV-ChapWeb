// 生成随机 UID 的函数
function generateRandomUID() {
    let uid = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        uid += characters.charAt(randomIndex);
    }
    return uid;
}

// 验证并格式化时间码的函数
function validateAndFormatTimeCode(timeCode) {
    // 首先检查输入是否为字符串，如果不是则直接返回默认值
    if (typeof timeCode !== 'string') {
        return '00:00:00';
    }

    // 第一步：去除所有非数字和分隔符（冒号、小数点、减号）的字符，并将分隔符统一替换为冒号
    const cleanTimeCode = timeCode.replace(/[^0-9:.-]/g, '').replace(/[.-]/g, ':');

    // 第二步：分割时间码
    const parts = cleanTimeCode.split(':');

    // 第三步：补齐小时、分钟、秒部分，如果缺少则补 0
    while (parts.length < 3) {
        parts.unshift('0');
    }

    // 第四步：解析小时、分钟和秒，并将其转换为整数
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    // 第五步：验证小时、分钟和秒是否为有效的数字，并且在合理范围内
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
        hours < 0 || hours > 23 ||
        minutes < 0 || minutes > 59 ||
        seconds < 0 || seconds > 59) {
        return '00:00:00.000000000';
    }

    // 第六步：格式化输出，确保小时、分钟和秒都为两位数字，并添加小数点与9个0
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.000000000`;
}

// 开发测试调用
// const testTimeCodes = [
//     '00.2.3',
//     '0-2-3',
//     '00 .   2.       3',
//     '00:10:32',
//     '00:10:32.000000000',
//     '0:10:32',
//     '0:1:2',
//     '23:59:59',
//     'invalid time code'
// ];

// testTimeCodes.forEach((timeCode) => {
//     const formattedTime = validateAndFormatTimeCode(timeCode);
//     console.log(`输入: ${timeCode}, 输出: ${formattedTime}`);
// });