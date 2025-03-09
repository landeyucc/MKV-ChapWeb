# MKV ChapWeb Tool Documentation
Document Languages [English](readme.md) | [简体中文](readme-CN.md)
## Preface

In early March, I needed to generate MKV chapter files, but found few software options for direct chapter file editing. After much searching, the software I found had an outdated interface. So, I spent time creating this tool using pure static frontend languages, naming it MKV ChapWeb.

## Introduction

MKV ChapWeb is an MKV video format chapter generation tool that helps users quickly create, edit, and manage chapter information in video files. Through an intuitive web interface, users can easily set the number of chapters, chapter names, start and end times, and generate/export XML chapter tag files that comply with MKV format standards. This facilitates precise chapter navigation in MKV-supporting media players.

## Usage
This tool has no complex parameters, so it's very easy to use. It's designed for everyday scenarios, without obscure parameter tags.

### Tool Interface Layout
  * **Responsive Design** ：MKV ChapWeb uses a modern style that adapts to both PC and mobile devices. It supports dynamic settings based on system light/dark modes, has bilingual Chinese/English interfaces, and intelligently redirects to the corresponding language page based on browser language during index page loading. This eliminates the need for browser translation due to language barriers.
  * **Sidebar Parameter Blocks** ：When you open the MKV ChapWeb online website or launch the offline tool, the main interface sidebar dynamically generates parameter blocks based on the default number of chapters. Each block contains input fields for chapter name, start time, and end time, allowing direct input or modification of chapter information.
  * **Main Control Parameter Area** ：Located in the page body, this area includes key parameter settings for video chapter count and language tags. Modifying these parameters triggers related operations upon button clicks, such as generating chapter tags or updating sidebar parameter blocks. Note that changes here will refresh and clear sidebar input data, so complete settings here before proceeding.
  * **Operation Buttons** ：The "Generate Chapter Tags" button creates XML-formatted chapter tag files based on current settings. The "Upload XML" and "Download XML" buttons import existing chapter files and export current generated chapter tag files, respectively. The latter allows direct preview and download of the XML file.

### Chapter Parameter Settings

  1. **Adjusting the Number of Chapters** ：Enter the desired number of chapters in the "Number of Video Chapters" input box in the main control parameter area and press Enter. The sidebar will automatically update with corresponding chapter parameter blocks for detailed chapter information input.
  2. **Chapter Name Input** ：In the "Chapter Name" input box of each chapter parameter block, enter a concise and distinctive name or title that clearly identifies chapter content on playback devices.
  3. **Time Parameter Settings** ：For "Chapter Start Time" and "Chapter End Time" input boxes, enter time values in the specified format (e.g., "hh:mm:ss") to accurately reflect chapter positions in the video for correct playback recognition.
#### I've implemented error correction logic in this feature. Timecode input recognizes only the first six digits as timecode, allowing separators like colon(:), period(.), and hyphen(-) in addition to the standard colon. All output timecodes are formatted to colons, with extra digits and spaces removed, and single digits padded with a leading zero (e.g., input 2.44-6 becomes 02:44:06).

### File Operation Process

  * **Generating XML Files** ：After setting all chapter parameters, click the "Generate Chapter Tags" button. The tool will generate a standard XML chapter tag file and display a preview using the open-source [highlight.js](https://highlightjs.org/) component for XML syntax highlighting. Users can check file accuracy and completeness, and double-click the output code for one-click copying if no errors are found.
  * **Downloading XML Files** ：If the generated XML file is error-free, click the "Download XML" button to save it locally for use in video editing software or MKV tools, or muxing into MKV video files to enable chapter functionality.
  * **Uploading XML Files** ：To modify or view existing XML chapter files, click the "Upload XML" button to select and import a local XML file. The tool will parse the file and update sidebar chapter parameter blocks for further editing.
#### Uploading involves browser-based data parsing and local processing. The upload parsing logic smartly recognizes "Chapter End Time" even if the main control block's "Enable Chapter End Time Tag" isn't checked, though it won't output as controlled by the main logic, not the upload logic. This feature is in beta; refresh and retry if upload fails, and set main parameters before uploading to prevent data loss.

## Update Log
### Second Generation Version
  * **v2.2a** ：Added sidebar parameter block removal/addition without resetting existing data. Added language and light/dark mode switching (browser detection on initialization), and further optimized responsive styling.
  * **v2.1b** ：Added XML file upload/download. Currently in beta, may have data anomalies or upload failures.
  * **v2.0a** ：Restructured styling and generation logic, added sidebar, moved all sub-parameters to chapter parameter blocks, and implemented dynamic chapter parameter blocks in the main control. Optimized mobile styling.
### First Generation Version
  * **v1.3c** ：Added optional chapter end time tags (disabled by default) and double-click code copying.
  * **v1.2a** ：Added custom start/end time tags. Time input boxes accept periods and hyphens as separators, with output formatted to time format.
  * **v1.1a** ：Second generation version with added language tags and sequential/random parameter ID types.
  * **v1.0a** ：Initial version with only chapter generation and chapter count parameters.