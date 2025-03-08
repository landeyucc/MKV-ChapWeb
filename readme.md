# MKV ChapWeb Tool Documentation

Doc Language [English](readme.md) | [简体中文](readme-CN.md)
## Preface

At the beginning of March, I had a need to generate MKV chapter files. However, after searching for a long time, there were very few software programs that supported direct editing of chapter files. When I finally found some software, their interfaces were still in an archaic style. Therefore, I spent my own time writing this tool using pure static front-end languages and named it MKV ChapWeb.

## Introduction

MKV ChapWeb is a tool for generating chapters of MKV video format. It can help users quickly generate, edit, and manage the chapter information in video files. Through an intuitive web interface and convenience, users can quickly set basic parameters such as the number of video chapters, chapter names, start and end times, etc., and generate and export chapter label XML files that comply with the MKV format specification, making it convenient to achieve precise chapter navigation in players that support MKV videos.

## Usage Method

This tool doesn't have any complex parameters, so it's very easy to use. It is only suitable for daily scenarios, so there are no relatively obscure parameter tags.

### Interface Layout and Basic Operations

- **Sidebar Parameter Blocks**: After the tool is launched, the sidebar will dynamically generate parameter blocks according to the default number of chapters. Each block contains input items such as chapter name, start time, and end time. Users can directly fill in or modify the chapter information in the corresponding input boxes.
  
- **Main Control Parameter Area**: Located in the main part of the page, it contains key parameter settings such as the number of video chapters and language code. After modifying these parameters, clicking the relevant buttons can trigger corresponding operations, such as generating chapter labels and updating the sidebar parameter blocks.
  
- **Operation Buttons**: 
  - "Generate Chapter Labels" button: Used to generate a chapter label file in XML format according to the current settings.
  - "Upload XML" and "Download XML" buttons: Used to import existing chapter information files and export the currently generated chapter label files respectively, making it convenient to upload and continue editing after temporarily exporting the data.

### Chapter Parameter Settings

1. **Adjusting the Number of Chapters**: 
   - Enter the required number of chapters in the "Number of Video Chapters" input box in the main control parameter area and press Enter.
   - The sidebar will automatically update to the corresponding number of chapter parameter blocks, and users can fill in the detailed information of each chapter one by one in these blocks.

2. **Filling in Chapter Names**: 
   - In the "Chapter Name" input box of each chapter parameter block, enter the name or title of the chapter.
   - The name should be concise, clear, and identifiable, so that the chapter content can be clearly identified on the playback device.

3. **Setting Time Parameters**: 
   - For the "Chapter Start Time" and "Chapter End Time" input boxes, users need to enter the corresponding time values according to the specified time format (e.g., "Hour:Minute:Second").
   - This accurately reflects the start and end positions of the chapter in the video, ensuring that the corresponding chapter can be correctly recognized during playback.

### File Operation Process

- **Generating an XML File**: 
  - After setting all the chapter parameters, click the "Generate Chapter Labels" button.
  - The tool will generate a chapter label file in XML format that complies with the specification according to the current parameters and display the preview content on the page.
  - Users can check the accuracy and integrity of the file.

- **Downloading the XML File**: 
  - If satisfied with the generated XML file, click the "Download XML" button to save the file to the local device.
  - This file can be used in video editing software or MKV-related tools to embed into MKV video files and achieve the chapter function.

- **Uploading the XML File**: 
  - If needing to modify or view an existing XML chapter file, click the "Upload XML" button and select the local XML file for import.
  - The tool will parse the file content and update the chapter parameter blocks in the sidebar, allowing users to further edit on this basis.

## Update Log

- **v2.2a**: Added the functions of removing and adding sidebar parameter blocks. Operations here will not reset the existing data.
- **v2.1b**: Added the functions of uploading and downloading XML files. Currently, the uploading function is still in the beta stage, and data anomalies may occur.
- **v2.0a**: Refactored the style and generation logic, added a sidebar, passed all sub-parameters into the chapter parameter blocks, and added dynamic chapter parameter blocks in the main control. Adapted the mobile style.
- **v1.3c**: The end time label is now in an optional state and is not enabled by default. Added the function of double-clicking to copy all the code.
- **v1.2a**: Added custom start and end time labels. The default delimiter in the time input box can be entered with a decimal point or a minus sign for connection, and the final output will be formatted into the time format.
- **v1.1a**: The second generation version, added the language code and the parameter ID type can be sequential or random.
- **v1.0a**: The initial version, with only two parameters, generating chapters and the number of chapters.