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

                    const endTimeInputHtml = endTime!== '00:00:00'? `
                        <div class="end-time-input show">
                            <label for="chapterEndTime-${i}">End time of chapter</label>
                            <input type="text" id="chapterEndTime-${i}" value="${endTime}">
                        </div>
                    ` : `
                        <div class="end-time-input hide">
                            <label for="chapterEndTime-${i}">End time of chapter</label>
                            <input type="text" id="chapterEndTime-${i}" value="${endTime}">
                        </div>
                    `;

                    paramBlock.innerHTML = `
                        <h3>Chapter parameter block ${i + 1}</h3>
                        <label for="chapterName-${i}">Chapter Title:</label>
                        <input type="text" id="chapterName-${i}" value="${chapterName}">
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
        };
        reader.readAsText(file);
    }
}