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
                <label for="chapterEndTime-${i}">End time of chapter</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        ` : `
            <div class="end-time-input hide">
                <label for="chapterEndTime-${i}">End time of chapter</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        `;

        paramBlock.innerHTML = `
            <h3>Chapter parameter block ${i + 1}</h3>
            <label for="chapterName-${i}">Chapter Title</label>
            <input type="text" id="chapterName-${i}" value="Chapter ${i + 1}">
            <label for="chapterStartTime-${i}">Chapter start time</label>
            <input type="text" id="chapterStartTime-${i}" value="00:00:00">
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
}

function removeParamBlock(button) {
    const sidebar = document.getElementById('sidebar');
    const chapterCountInput = document.getElementById('chapterCount');
    const currentCount = parseInt(chapterCountInput.value);

    const paramBlock = button.parentNode;
    const indexToRemove = Array.from(sidebar.children).indexOf(paramBlock);
    sidebar.removeChild(paramBlock);

    chapterCountInput.value = currentCount - 1;

    const paramBlocks = sidebar.querySelectorAll('.param-block');
    paramBlocks.forEach((block, index) => {
        const h3 = block.querySelector('h3');
        h3.textContent = `Chapter parameter block ${index + 1}`;

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
                <label for="chapterEndTime-${i}">End time of chapter</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        ` : `
            <div class="end-time-input hide">
                <label for="chapterEndTime-${i}">End time of chapter</label>
                <input type="text" id="chapterEndTime-${i}" value="00:00:00">
            </div>
        `;

        paramBlock.innerHTML = `
            <h3>Chapter parameter block ${i + 1}</h3>
            <label for="chapterName-${i}">Chapter Title</label>
            <input type="text" id="chapterName-${i}" value="Chapter ${i + 1}">
            <label for="chapterStartTime-${i}">Chapter start time</label>
            <input type="text" id="chapterStartTime-${i}" value="00:00:00">
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
}

function addParamBlock() {
    const sidebar = document.getElementById('sidebar');
    const chapterCountInput = document.getElementById('chapterCount');
    const currentCount = parseInt(chapterCountInput.value);

    const paramBlock = document.createElement('div');
    paramBlock.className = 'param-block';
    const includeEndTime = document.getElementById('includeEndTime').checked;
    const endTimeInputHtml = includeEndTime? `
        <div class="end-time-input show">
            <label for="chapterEndTime-${currentCount}">End time of chapter</label>
            <input type="text" id="chapterEndTime-${currentCount}" value="00:00:00">
        </div>
    ` : `
        <div class="end-time-input hide">
            <label for="chapterEndTime-${currentCount}">End time of chapter</label>
            <input type="text" id="chapterEndTime-${currentCount}" value="00:00:00">
        </div>
    `;

    paramBlock.innerHTML = `
        <h3>Chapter parameter block ${currentCount + 1}</h3>
        <label for="chapterName-${currentCount}">Chapter Title</label>
        <input type="text" id="chapterName-${currentCount}" value="Chapter ${currentCount + 1}">
        <label for="chapterStartTime-${currentCount}">Chapter start time</label>
        <input type="text" id="chapterStartTime-${currentCount}" value="00:00:00">
        ${endTimeInputHtml}
        <button class="remove-param-block" onclick="removeParamBlock(this)">Remove</button>
    `;

    const addButton = document.getElementById('addParamBlock');

    sidebar.insertBefore(paramBlock, addButton);

    chapterCountInput.value = currentCount + 1;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

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

document.addEventListener('DOMContentLoaded', initSidebar);