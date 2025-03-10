function generateChapters() {
    const chapterCount = parseInt(document.getElementById('chapterCount').value);
    const language = document.getElementById('language').value;
    const ietfLanguage = document.getElementById('ietfLanguage').value;
    const includeEndTime = document.getElementById('includeEndTime').checked;
    const paramIdType = document.getElementById('paramIdType').value;

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<Chapters>\n  <EditionEntry>\n';
    xml += `    <EditionUID>${generateRandomUID()}</EditionUID>\n`;

    for (let i = 0; i < chapterCount; i++) {
        const chapterNameInput = document.getElementById(`chapterName-${i}`);
        const chapterStartTimeInput = document.getElementById(`chapterStartTime-${i}`);
        const chapterEndTimeInput = document.getElementById(`chapterEndTime-${i}`);

        let chapterUID;
        if (paramIdType === 'sequential') {
            chapterUID = i + 1;
        } else {
            chapterUID = generateRandomUID();
        }

        const chapterName = chapterNameInput.value;
        const startTime = validateAndFormatTimeCode(chapterStartTimeInput.value);
        let endTime = '';
        if (includeEndTime) {
            endTime = validateAndFormatTimeCode(chapterEndTimeInput.value);
        }

        xml += '    <ChapterAtom>\n';
        xml += `      <ChapterUID>${chapterUID}</ChapterUID>\n`;
        xml += `      <ChapterTimeStart>${startTime}</ChapterTimeStart>\n`;


        if (includeEndTime) {
            xml += `      <ChapterTimeEnd>${endTime}</ChapterTimeEnd>\n`;
        }

        xml += '      <ChapterDisplay>\n';
        xml += `        <ChapterString>${chapterName}</ChapterString>\n`;
		xml += `    	<ChapterLanguage>${language}</ChapterLanguage>\n`;
		xml += `    	<ChapLanguageIETF>${ietfLanguage}</ChapLanguageIETF>\n`;
        xml += '      </ChapterDisplay>\n';
        xml += '    </ChapterAtom>\n';
    }

    xml += '  </EditionEntry>\n';
    xml += '</Chapters>';

    // 显示生成的 XML
    const outputFrame = document.getElementById('outputFrame');
    outputFrame.contentWindow.postMessage({ type: 'updateCode', xml: xml }, '*');
    outputFrame.style.display = 'block';

    return xml;
}