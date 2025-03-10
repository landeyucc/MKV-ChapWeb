// 检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (!isMobileDevice()) {
    // 创建样式元素
    const style = document.createElement('style');
    style.textContent = `
        #dragTarget.draggable {
            border: 2px dashed #ccc;
            position: fixed;
            top: 0;
            left: 0;
            width: 98%;
            height: 96%;
            z-index: 9999;
			margin: 1%;
			text-align: center;
			border-radius: 10px;
        }
        #dragTarget.dragover {
            border-color: #007BFF;
            background-color: rgba(198, 237, 255, 0.8);
        }
		
		#dragTarget h1 {
			transform: translateY(80px);
		}
		@media screen and (max-width:1000px) {
			#dragTarget.draggable{
				border: 0px;
			}
		}
    `;
    document.head.appendChild(style);

    const dragTarget = document.getElementById('dragTarget');
    let isDragging = false;

    // 拖放事件处理
    document.addEventListener('dragenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            dragTarget.classList.remove('hide');
            dragTarget.classList.add('draggable', 'dragover');
            isDragging = true;
        }
    });

    document.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            dragTarget.classList.add('dragover');
        }
    });

    document.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.relatedTarget === null) {
            dragTarget.classList.add('hide');
            dragTarget.classList.remove('draggable', 'dragover');
            isDragging = false;
        }
    });

    document.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dragTarget.classList.add('hide');
        dragTarget.classList.remove('draggable', 'dragover');
        isDragging = false;

        const fileInput = document.getElementById('uploadXML');
        fileInput.files = e.dataTransfer.files;
        // 调用原有的上传解析函数
        uploadAndParseXML.call(fileInput);
    });
}