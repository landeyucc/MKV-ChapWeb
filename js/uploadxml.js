function escapeSpecialCharacters(str) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return str.replace(/[&<>"']/g, function (m) { return map[m]; });
        }

        function triggerFileSelection() {
            const fileInput = document.getElementById('uploadXML');
            // 触发文件选择对话框
            fileInput.click();
            fileInput.addEventListener('change', uploadAndParseXML);
        }

        function uploadAndParseXML() {
            const fileInput = document.getElementById('uploadXML');
            if (!fileInput) {
                console.error('未找到上传文件的输入元素');
                return;
            }
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const fileText = e.target.result;
                    // 判断文件扩展名是否为 .txt
                    if (file.name.endsWith('.txt')) {
                        try {
                            const lines = fileText.split('\n');
                            const chapterCount = lines.length / 2;

                            // 更新章节数量输入框的值
                            document.getElementById('chapterCount').value = chapterCount;

                            // 清空侧边栏内容
                            const sidebar = document.getElementById('sidebar');
                            sidebar.innerHTML = '';

                            for (let i = 0; i < chapterCount; i++) {
                                const startTimeLine = lines[i * 2];
                                const nameLine = lines[i * 2 + 1];

                                // 提取章节开始时间和章节名称
                                const startTime = startTimeLine.split('=')[1].split('.')[0]; // 去掉毫秒部分
                                const chapterName = nameLine.split('=')[1];

                                const paramBlock = document.createElement('div');
                                paramBlock.classList.add('param-block');

                                // 对章节名称进行转义
                                const escapedChapterName = escapeSpecialCharacters(chapterName);

                                const endTimeInputHtml = `
                                    <div class="end-time-input hide">
                                        <label for="chapterEndTime-${i}">章节结束时间</label>
                                        <input type="text" id="chapterEndTime-${i}" value="00:00:00">
                                    </div>
                                `;

                                paramBlock.innerHTML = `
                                    <h3>章节参数块 ${i + 1}</h3>
                                    <label for="chapterName-${i}">章节名称</label>
                                    <input type="text" id="chapterName-${i}" value="${escapedChapterName}">
                                    <label for="chapterStartTime-${i}">章节开始时间</label>
                                    <input type="text" id="chapterStartTime-${i}" value="${startTime}">
                                    ${endTimeInputHtml}
                                    <button class="remove-param-block" onclick="removeParamBlock(this)">移除</button>
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
                    } else {
                        // 如果不是 .txt 文件，按原 XML 解析逻辑处理
                        const xmlText = fileText;
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

                                // 对章节名称进行转义
                                const escapedChapterName = escapeSpecialCharacters(chapterName);

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
                                    <label for="chapterName-${i}">章节名称</label>
                                    <input type="text" id="chapterName-${i}" value="${escapedChapterName}">
                                    <label for="chapterStartTime-${i}">章节开始时间</label>
                                    <input type="text" id="chapterStartTime-${i}" value="${startTime}">
                                    ${endTimeInputHtml}
                                    <button class="remove-param-block" onclick="removeParamBlock(this)">移除</button>
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
                    }
                };
                reader.readAsText(file);
            } else {
                console.error('未选择文件');
            }
        }

        function addParamBlock() {
            const sidebar = document.getElementById('sidebar');
            const paramBlocks = sidebar.querySelectorAll('.param-block');
            const newIndex = paramBlocks.length;

            const paramBlock = document.createElement('div');
            paramBlock.classList.add('param-block');

            const endTimeInputHtml = `
                <div class="end-time-input hide">
                    <label for="chapterEndTime-${newIndex}">章节结束时间</label>
                    <input type="text" id="chapterEndTime-${newIndex}" value="00:00:00">
                </div>
            `;

            paramBlock.innerHTML = `
                <h3>章节参数块 ${newIndex + 1}</h3>
                <label for="chapterName-${newIndex}">章节名称</label>
                <input type="text" id="chapterName-${newIndex}" value="">
                <label for="chapterStartTime-${newIndex}">章节开始时间</label>
                <input type="text" id="chapterStartTime-${newIndex}" value="00:00:00">
                ${endTimeInputHtml}
                <button class="remove-param-block" onclick="removeParamBlock(this)">移除</button>
            `;

            // 将新的参数块插入到“添加章节参数块”按钮之前
            const addButton = document.getElementById('addParamBlock');
            sidebar.insertBefore(paramBlock, addButton);

            // 更新章节数量输入框的值
            document.getElementById('chapterCount').value = newIndex + 1;
        }

        function removeParamBlock(button) {
            const paramBlock = button.parentNode;
            const sidebar = document.getElementById('sidebar');
            sidebar.removeChild(paramBlock);

            // 更新章节数量输入框的值
            const paramBlocks = sidebar.querySelectorAll('.param-block');
            document.getElementById('chapterCount').value = paramBlocks.length;

            // 重新编号参数块标题
            paramBlocks.forEach((block, index) => {
                const title = block.querySelector('h3');
                title.textContent = `章节参数块 ${index + 1}`;

                const inputs = block.querySelectorAll('input');
                inputs.forEach(input => {
                    const id = input.id;
                    const newId = id.replace(/\d+$/, index);
                    input.id = newId;
                    const label = block.querySelector(`label[for="${id}"]`);
                    if (label) {
                        label.setAttribute('for', newId);
                    }
                });
            });
        }