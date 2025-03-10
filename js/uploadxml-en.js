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
            fileInput.click();
            fileInput.addEventListener('change', uploadAndParseXML);
        }

        function uploadAndParseXML() {
            const fileInput = document.getElementById('uploadXML');
            if (!fileInput) {
                console.error('The input element of the uploaded file was not found.');
                return;
            }
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const fileText = e.target.result;
                    if (file.name.endsWith('.txt')) {
                        try {
                            const lines = fileText.split('\n');
                            const chapterCount = lines.length / 2;

                            document.getElementById('chapterCount').value = chapterCount;

                            const sidebar = document.getElementById('sidebar');
                            sidebar.innerHTML = '';

                            for (let i = 0; i < chapterCount; i++) {
                                const startTimeLine = lines[i * 2];
                                const nameLine = lines[i * 2 + 1];

                                const startTime = startTimeLine.split('=')[1].split('.')[0]; 
                                const chapterName = nameLine.split('=')[1];

                                const paramBlock = document.createElement('div');
                                paramBlock.classList.add('param-block');

                                const escapedChapterName = escapeSpecialCharacters(chapterName);

                                const endTimeInputHtml = `
                                    <div class="end-time-input hide">
                                        <label for="chapterEndTime-${i}">Chapter end time</label>
                                        <input type="text" id="chapterEndTime-${i}" value="00:00:00">
                                    </div>
                                `;

                                paramBlock.innerHTML = `
                                    <h3>Chapter parameter block ${i + 1}</h3>
                                    <label for="chapterName-${i}">Chapter Title</label>
                                    <input type="text" id="chapterName-${i}" value="${escapedChapterName}">
                                    <label for="chapterStartTime-${i}">Chapter start time</label>
                                    <input type="text" id="chapterStartTime-${i}" value="${startTime}">
                                    ${endTimeInputHtml}
                                    <button class="remove-param-block" onclick="removeParamBlock(this)">Remove</button>
                                `;

                                sidebar.appendChild(paramBlock);
                            }

                            const addButton = document.createElement('button');
                            addButton.id = 'addParamBlock';
                            addButton.textContent = 'Add chapter parameter block';
                            addButton.onclick = addParamBlock;
                            sidebar.appendChild(addButton);
                        } catch (error) {
                            alert(error.message);
                        }
                    } else {
                        const xmlText = fileText;
                        try {
                            const parser = new DOMParser();
                            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                            const parseError = xmlDoc.getElementsByTagName('parsererror');
                            if (parseError.length > 0) {
                                throw new Error('XML parsing error:' + parseError[0].textContent);
                            }

                            const chapterAtoms = xmlDoc.getElementsByTagName('ChapterAtom');
                            const chapterCount = chapterAtoms.length;

                            document.getElementById('chapterCount').value = chapterCount;

                            const sidebar = document.getElementById('sidebar');
                            sidebar.innerHTML = '';

                            for (let i = 0; i < chapterCount; i++) {
                                const paramBlock = document.createElement('div');
                                paramBlock.classList.add('param-block');

                                const chapterName = chapterAtoms[i].getElementsByTagName('ChapterString')[0].textContent;
                                const startTime = chapterAtoms[i].getElementsByTagName('ChapterTimeStart')[0].textContent;
                                const endTime = chapterAtoms[i].getElementsByTagName('ChapterTimeEnd')[0]? chapterAtoms[i].getElementsByTagName('ChapterTimeEnd')[0].textContent : '00:00:00';

                                const escapedChapterName = escapeSpecialCharacters(chapterName);

                                const endTimeInputHtml = endTime!== '00:00:00'? `
                                    <div class="end-time-input show">
                                        <label for="chapterEndTime-${i}">Chapter end time</label>
                                        <input type="text" id="chapterEndTime-${i}" value="${endTime}">
                                    </div>
                                ` : `
                                    <div class="end-time-input hide">
                                        <label for="chapterEndTime-${i}">Chapter end time</label>
                                        <input type="text" id="chapterEndTime-${i}" value="${endTime}">
                                    </div>
                                `;

                                paramBlock.innerHTML = `
                                    <h3>Chapter parameter block ${i + 1}</h3>
                                    <label for="chapterName-${i}">Chapter Title</label>
                                    <input type="text" id="chapterName-${i}" value="${escapedChapterName}">
                                    <label for="chapterStartTime-${i}">Chapter start time</label>
                                    <input type="text" id="chapterStartTime-${i}" value="${startTime}">
                                    ${endTimeInputHtml}
                                    <button class="remove-param-block" onclick="removeParamBlock(this)">Remove</button>
                                `;

                                sidebar.appendChild(paramBlock);
                            }

                            const addButton = document.createElement('button');
                            addButton.id = 'addParamBlock';
                            addButton.textContent = 'Add chapter parameter block';
                            addButton.onclick = addParamBlock;
                            sidebar.appendChild(addButton);
                        } catch (error) {
                            alert(error.message);
                        }
                    }
                };
                reader.readAsText(file);
            } else {
                console.error('No file selected.');
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
                    <label for="chapterEndTime-${newIndex}">Chapter end time</label>
                    <input type="text" id="chapterEndTime-${newIndex}" value="00:00:00">
                </div>
            `;

            paramBlock.innerHTML = `
                <h3>Chapter parameter block ${newIndex + 1}</h3>
                <label for="chapterName-${newIndex}">Chapter Title</label>
                <input type="text" id="chapterName-${newIndex}" value="">
                <label for="chapterStartTime-${newIndex}">Chapter start time</label>
                <input type="text" id="chapterStartTime-${newIndex}" value="00:00:00">
                ${endTimeInputHtml}
                <button class="remove-param-block" onclick="removeParamBlock(this)">Remove</button>
            `;

            const addButton = document.getElementById('addParamBlock');
            sidebar.insertBefore(paramBlock, addButton);

            document.getElementById('chapterCount').value = newIndex + 1;
        }

        function removeParamBlock(button) {
            const paramBlock = button.parentNode;
            const sidebar = document.getElementById('sidebar');
            sidebar.removeChild(paramBlock);

            const paramBlocks = sidebar.querySelectorAll('.param-block');
            document.getElementById('chapterCount').value = paramBlocks.length;

            paramBlocks.forEach((block, index) => {
                const title = block.querySelector('h3');
                title.textContent = `Chapter parameter block ${index + 1}`;

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