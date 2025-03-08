const image = document.getElementById('Rotaimg');
  let isRotated = false; // 标记是否已旋转

  image.addEventListener('click', () => {
    if (!isRotated) {
      // 添加旋转动画
      image.style.transition = 'transform 0.5s ease';
      image.style.transform = 'rotate(180deg)';
    } else {
      // 还原
      image.style.transition = 'transform 0.5s ease';
      image.style.transform = 'rotate(0deg)';
    }
    isRotated = !isRotated; // 切换状态
  });