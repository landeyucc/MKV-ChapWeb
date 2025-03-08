// 上传并解析 XML 文件的函数
function uploadAndParseXML() {
    const fileInput = document.getElementById('uploadXML');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const xmlText = e.target.result;
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                // 检查解析是否出错
                const parseError = xmlDoc.getElementsByTagName('parsererror');
                if (parseError.length > 0) {
                    throw new Error('XML 解析错误: ' + parseError[0].textContent);
                }

                const chapterAtoms = xmlDoc.getElementsByTagName('ChapterAtom');
                const chapterCount = chapterAtoms.length;

                // 更新章节数量输入框的值
                document.getElementById('chapterCount').value = chapterCount;

                // 清空侧边栏内容
                const sidebar = document.getElementById('sidebar');
                sidebar.innerHTML = '';

                // 根据解析出的章节信息生成新的章节参数块
                for (let i = 0; i < chapterCount; i++) {
                    const paramBlock = document.createElement('div');
                    paramBlock.classList.add('param-block');

                    const chapterName = chapterAtoms[i].getElementsByTagName('ChapterString')[0].textContent;
                    const startTime = chapterAtoms[i].getElementsByTagName('ChapterTimeStart')[0].textContent;
                    const endTime = chapterAtoms[i].getElementsByTagName('ChapterTimeEnd')[0]? chapterAtoms[i].getElementsByTagName('ChapterTimeEnd')[0].textContent : '00:00:00';

                    const endTimeInputHtml = endTime!== '00:00:00'? `
                        <div class="end-time-input show">
                            <label for="chapterEndTime-${i}">章节结束时间</label>
                            <input type="text" id="chapterEndTime-${i}" value="${endTime}">
                        </div>
                    ` : `
                        <div class="end-time-input hide">
                            <label for="chapterEndTime-${i}">章节结束时间</label>
                            <input type="text" id="chapterEndTime-${i}" value="${endTime}">
                        </div>
                    `;

                    paramBlock.innerHTML = `
                        <h3>章节参数块 ${i + 1}</h3>
                        <label for="chapterName-${i}">章节名称：</label>
                        <input type="text" id="chapterName-${i}" value="${chapterName}">
                        <label for="chapterStartTime-${i}">章节开始时间</label>
                        <input type="text" id="chapterStartTime-${i}" value="${startTime}">
                        ${endTimeInputHtml}
                        <button class="remove-param-block" onclick="removeParamBlock(this)">×</button>
                    `;

                    sidebar.appendChild(paramBlock);
                }

                // 添加“添加章节参数块”按钮到侧边栏底部
                const addButton = document.createElement('button');
                addButton.id = 'addParamBlock';
                addButton.textContent = '添加章节参数块';
                addButton.onclick = addParamBlock;
                sidebar.appendChild(addButton);
            } catch (error) {
                alert(error.message);
            }
        };
        reader.readAsText(file);
    }
}