const fs = require('fs');
const util = require('util');
const fse = require('fs-extra');

const copyFile = util.promisify(fs.copyFile);
const readFile = util.promisify(fs.readFile);

async function copyBuildFiles() {
    const destFolder = './dist';
    const foldersThatShouldExist = [
        `${destFolder}`,
        `${destFolder}/assets`,
        `${destFolder}/assets/images`,
        `${destFolder}/static`,
    ];
    for (const folder of foldersThatShouldExist) {
        const folderExists = fs.existsSync(folder);
        if (folderExists == false) { fs.mkdirSync(folder); }
    }

    const basicFilesToCopy = [
        { src: 'favicon.ico', dst: 'favicon.ico' },
        { src: 'assets/config.production.json', dst: 'assets/config.json' },
        { src: 'assets/images/assistantApps.png', dst: 'assets/images/assistantApps.png' },
        { src: 'assets/images/DrawerHeader.png', dst: 'assets/images/DrawerHeader.png' },
        { src: 'assets/images/error.png', dst: 'assets/images/error.png' },
        { src: 'assets/images/icon.png', dst: 'assets/images/icon.png' },
        { src: 'assets/images/loader.png', dst: 'assets/images/loader.png' },
        { src: 'assets/images/loader.svg', dst: 'assets/images/loader.svg' },
        { src: 'assets/images/patreon.png', dst: 'assets/images/patreon.png' },
        { src: 'assets/images/unknown.png', dst: 'assets/images/unknown.png' },
        { src: 'assets/images/platformNsw.png', dst: 'assets/images/platformNsw.png' },
        { src: 'assets/images/platformNswAlt.png', dst: 'assets/images/platformNswAlt.png' },
        { src: 'assets/images/platformPc.png', dst: 'assets/images/platformPc.png' },
        { src: 'assets/images/platformPcAlt.png', dst: 'assets/images/platformPcAlt.png' },
        { src: 'assets/images/platformPs4.png', dst: 'assets/images/platformPs4.png' },
        { src: 'assets/images/platformPs4Alt.png', dst: 'assets/images/platformPs4Alt.png' },
        { src: 'assets/images/platformXb1.png', dst: 'assets/images/platformXb1.png' },
        { src: 'assets/images/platformXb1Alt.png', dst: 'assets/images/platformXb1Alt.png' },
        { src: 'assets/images/unknown.png', dst: 'assets/images/unknown.png' },
    ];
    for (const basicFile of basicFilesToCopy) {
        copyFile(`../build/${basicFile.src}`, `${destFolder}/${basicFile.dst}`)
    }

    const foldersToCopy = [
        { src: 'assets/font', dst: 'assets/font' },
        { src: 'static/js', dst: 'static/js' },
        { src: 'static/css', dst: 'static/css' },
    ];
    for (const folder of foldersToCopy) {
        fse.copySync(`../build/${folder.src}`, `${destFolder}/${folder.dst}`, { overwrite: true });
    }

    let resultIndexFile = '';
    const reactIndexContent = await readFile('../build/index.html', 'utf8');

    const checkIfLoadedScriptIndex = reactIndexContent.indexOf('<script id="has-loaded-check">');
    const restOfTheIndexFile = reactIndexContent.substring(checkIfLoadedScriptIndex, reactIndexContent.length);
    const checkIfLoadedScriptEndIndex = restOfTheIndexFile.indexOf('</script>') + checkIfLoadedScriptIndex + 9;

    resultIndexFile += reactIndexContent.substring(0, checkIfLoadedScriptIndex);
    resultIndexFile += '\n\r<link rel="stylesheet" href="./assets/css/header.css" />\n\r';

    const overwolfHeaderText = '<div id="overwolf-header"></div>';
    const overwolfHeaderIndex = reactIndexContent.indexOf(overwolfHeaderText);

    resultIndexFile += reactIndexContent.substring(checkIfLoadedScriptEndIndex, overwolfHeaderIndex);
    resultIndexFile += `\n
        <header id="header" class="app-header">
            <img src="../../img/header_icon.svg" />
            <h1>Assistant for No Man's Sky</h1>
            <div class="window-controls-group">
                <button id="minimizeButton" class="window-control window-control-minimize" />
                <button id="maximizeButton" class="window-control window-control-maximize" />
                <button id="closeButton" class="window-control window-control-close" />
            </div>
        </header>
    \n`;
    resultIndexFile += reactIndexContent.substring((overwolfHeaderIndex + overwolfHeaderText.length), reactIndexContent.length);
    fs.writeFile(`${destFolder}/desktop.html`, resultIndexFile, ['utf8'], () => { });
}

module.exports = {
    copyBuildFiles: copyBuildFiles,
}
