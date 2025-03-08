document.addEventListener("DOMContentLoaded", () => {
            const preElement = document.getElementById("codePre");
            const lineNumbersElement = document.getElementById("lineNumbers");
            const codeLines = preElement.innerText.split("\n");

            for (let i = 0; i < codeLines.length; i++) {
                const lineSpan = document.createElement("span");
                lineSpan.textContent = i + 1;
                lineNumbersElement.appendChild(lineSpan);
            }
        });