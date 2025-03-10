// 初始化侧边栏的函数
function initSidebar() {
    const chapterCount = parseInt(document.getElementById('chapterCount').value);
    const includeEndTime = document.getElementById('includeEndTime').checked;
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    for (let i = 0; i < chapterCount; i++) {
        const paramBlock = document.createElement('div');
        paramBlock.classList.add('param-block');

        const endTimeInputHtml = includeEndTime? `
            <div class="end-time-input show">
                <label for="chapterEndTime-${i}">章节结束时间</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        ` : `
            <div class="end-time-input hide">
                <label for="chapterEndTime-${i}">章节结束时间</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        `;

        paramBlock.innerHTML = `
            <h3>章节参数块 ${i + 1}</h3>
            <label for="chapterName-${i}">章节名称</label>
            <input type="text" id="chapterName-${i}" value="第${i + 1}章">
            <label for="chapterStartTime-${i}">章节开始时间</label>
            <input type="text" id="chapterStartTime-${i}" value="00:00:00">
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
}

// 移除参数块的函数
function removeParamBlock(button) {
    const sidebar = document.getElementById('sidebar');
    const chapterCountInput = document.getElementById('chapterCount');
    const currentCount = parseInt(chapterCountInput.value);

    // 移除参数块
    const paramBlock = button.parentNode;
    const indexToRemove = Array.from(sidebar.children).indexOf(paramBlock);
    sidebar.removeChild(paramBlock);

    // 更新章节数量
    chapterCountInput.value = currentCount - 1;

    // 重排剩余参数块的序号
    const paramBlocks = sidebar.querySelectorAll('.param-block');
    paramBlocks.forEach((block, index) => {
        const h3 = block.querySelector('h3');
        h3.textContent = `章节参数块 ${index + 1}`;

        const nameInput = block.querySelector(`input[id^="chapterName-"]`);
        const oldNameId = nameInput.id;
        const newNameId = `chapterName-${index}`;
        nameInput.id = newNameId;

        const startTimeInput = block.querySelector(`input[id^="chapterStartTime-"]`);
        const oldStartTimeId = startTimeInput.id;
        const newStartTimeId = `chapterStartTime-${index}`;
        startTimeInput.id = newStartTimeId;

        const endTimeInput = block.querySelector(`input[id^="chapterEndTime-"]`);
        const oldEndTimeId = endTimeInput.id;
        const newEndTimeId = `chapterEndTime-${index}`;
        endTimeInput.id = newEndTimeId;
    });
}

// 更新参数块的函数
function updateParamBlocks() {
    const chapterCount = parseInt(document.getElementById('chapterCount').value);
    const includeEndTime = document.getElementById('includeEndTime').checked;
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    for (let i = 0; i < chapterCount; i++) {
        const paramBlock = document.createElement('div');
        paramBlock.classList.add('param-block');

        const endTimeInputHtml = includeEndTime? `
            <div class="end-time-input show">
                <label for="chapterEndTime-${i}">章节结束时间</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        ` : `
            <div class="end-time-input hide">
                <label for="chapterEndTime-${i}">章节结束时间</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        `;

        paramBlock.innerHTML = `
            <h3>章节参数块 ${i + 1}</h3>
            <label for="chapterName-${i}">章节名称</label>
            <input type="text" id="chapterName-${i}" value="第${i + 1}章">
            <label for="chapterStartTime-${i}">章节开始时间</label>
            <input type="text" id="chapterStartTime-${i}" value="00:00:00">
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
}

// 添加参数块的函数
function addParamBlock() {
    const sidebar = document.getElementById('sidebar');
    const chapterCountInput = document.getElementById('chapterCount');
    const currentCount = parseInt(chapterCountInput.value);

    // 创建新的参数块
    const paramBlock = document.createElement('div');
    paramBlock.className = 'param-block';
    const includeEndTime = document.getElementById('includeEndTime').checked;
    const endTimeInputHtml = includeEndTime? `
        <div class="end-time-input show">
            <label for="chapterEndTime-${currentCount}">章节结束时间</label>
            <input type="text" id="chapterEndTime-${currentCount}" value="00:00:00">
        </div>
    ` : `
        <div class="end-time-input hide">
            <label for="chapterEndTime-${currentCount}">章节结束时间</label>
            <input type="text" id="chapterEndTime-${currentCount}" value="00:00:00">
        </div>
    `;

    paramBlock.innerHTML = `
        <h3>章节参数块 ${currentCount + 1}</h3>
        <label for="chapterName-${currentCount}">章节名称</label>
        <input type="text" id="chapterName-${currentCount}" value="第${currentCount + 1}章">
        <label for="chapterStartTime-${currentCount}">章节开始时间</label>
        <input type="text" id="chapterStartTime-${currentCount}" value="00:00:00">
        ${endTimeInputHtml}
        <button class="remove-param-block" onclick="removeParamBlock(this)">移除</button>
    `;

    // 找到“添加章节参数块”按钮
    const addButton = document.getElementById('addParamBlock');

    // 插入新的参数块到“添加章节参数块”按钮上方
    sidebar.insertBefore(paramBlock, addButton);

    // 更新章节数量
    chapterCountInput.value = currentCount + 1;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// 下载 XML 文件的函数
function downloadXML() {
    const xml = generateChapters();
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chapters.xml';
    a.click();
    URL.revokeObjectURL(url);
}

// 确保 DOM 加载完成后再初始化侧边栏
document.addEventListener('DOMContentLoaded', initSidebar);