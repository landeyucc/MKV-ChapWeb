window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            
            // 模拟加载进度条
            let progress = 0;
            const progressBar = document.querySelector('.progress-bar');
            
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // 进度条加载完成后淡出
                    setTimeout(() => {
                        progressBar.classList.add('fade-out');
                    }, 1000);
                }
                progressBar.style.width = progress + '%';
            }, 100);
        });