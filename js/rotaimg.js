// 创建一个通用的旋转函数
function rotateImage(imageId) {
  const image = document.getElementById(imageId);
  let isRotated = false; // 标记是否已旋转

  image.addEventListener('click', () => {
    image.style.transition = 'transform 0.5s ease';
    image.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(180deg)';
    isRotated = !isRotated; // 切换状态
  });
}

// 初始化旋转功能
rotateImage('Rotaimga');
rotateImage('Rotaimgb');