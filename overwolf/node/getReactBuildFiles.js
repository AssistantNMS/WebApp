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
        `${destFolder}/assets/images/rawMaterials`,
        `${destFolder}/assets/images/special`,
        `${destFolder}/static`,
    ];
    for (const folder of foldersThatShouldExist) {
        const folderExists = fs.existsSync(folder);
        if (folderExists === false) { fs.mkdirSync(folder); }
    }

    const basicFilesToCopy = [
        { src: 'favicon.ico', dst: 'favicon.ico' },
        { src: 'assets/config.overwolf.json', dst: 'assets/config.json' },
        { src: 'assets/images/applePay.png', dst: 'assets/images/applePay.png' },
        { src: 'assets/images/assistantApps.png', dst: 'assets/images/assistantApps.png' },
        { src: 'assets/images/bat.png', dst: 'assets/images/bat.png' },
        { src: 'assets/images/buyMeACoffee.png', dst: 'assets/images/buyMeACoffee.png' },
        { src: 'assets/images/credits.png', dst: 'assets/images/credits.png' },
        { src: 'assets/images/discord.png', dst: 'assets/images/discord.png' },
        { src: 'assets/images/DrawerHeader.png', dst: 'assets/images/DrawerHeader.png' },
        { src: 'assets/images/error.png', dst: 'assets/images/error.png' },
        { src: 'assets/images/facebook.png', dst: 'assets/images/facebook.png' },
        { src: 'assets/images/github.png', dst: 'assets/images/github.png' },
        { src: 'assets/images/githubSponsors.png', dst: 'assets/images/githubSponsors.png' },
        { src: 'assets/images/googlePay.png', dst: 'assets/images/googlePay.png' },
        { src: 'assets/images/icon.png', dst: 'assets/images/icon.png' },
        { src: 'assets/images/instagram.png', dst: 'assets/images/instagram.png' },
        { src: 'assets/images/kofi.png', dst: 'assets/images/kofi.png' },
        { src: 'assets/images/loader.png', dst: 'assets/images/loader.png' },
        { src: 'assets/images/loader.svg', dst: 'assets/images/loader.svg' },
        { src: 'assets/images/mastodon.png', dst: 'assets/images/mastodon.png' },
        { src: 'assets/images/nanites.png', dst: 'assets/images/nanites.png' },
        { src: 'assets/images/nativeApp.png', dst: 'assets/images/nativeApp.png' },
        { src: 'assets/images/nutrientProcessor.png', dst: 'assets/images/nutrientProcessor.png' },
        { src: 'assets/images/openCollective.png', dst: 'assets/images/openCollective.png' },
        { src: 'assets/images/patreon.png', dst: 'assets/images/patreon.png' },
        { src: 'assets/images/patreonFeature.png', dst: 'assets/images/patreonFeature.png' },
        { src: 'assets/images/patreonFeatureWhite.png', dst: 'assets/images/patreonFeatureWhite.png' },
        { src: 'assets/images/payPal.png', dst: 'assets/images/payPal.png' },
        { src: 'assets/images/reddit.png', dst: 'assets/images/reddit.png' },
        { src: 'assets/images/refiner.png', dst: 'assets/images/refiner.png' },
        { src: 'assets/images/refinerMedium.png', dst: 'assets/images/refinerMedium.png' },
        { src: 'assets/images/refinerLarge.png', dst: 'assets/images/refinerLarge.png' },
        { src: 'assets/images/steam.png', dst: 'assets/images/steam.png' },
        { src: 'assets/images/unknown.png', dst: 'assets/images/unknown.png' },
        { src: 'assets/images/platformNsw.png', dst: 'assets/images/platformNsw.png' },
        { src: 'assets/images/platformNswAlt.png', dst: 'assets/images/platformNswAlt.png' },
        { src: 'assets/images/platformPc.png', dst: 'assets/images/platformPc.png' },
        { src: 'assets/images/platformPcAlt.png', dst: 'assets/images/platformPcAlt.png' },
        { src: 'assets/images/platformPs4.png', dst: 'assets/images/platformPs4.png' },
        { src: 'assets/images/platformPs4Alt.png', dst: 'assets/images/platformPs4Alt.png' },
        { src: 'assets/images/platformXb1.png', dst: 'assets/images/platformXb1.png' },
        { src: 'assets/images/platformXb1Alt.png', dst: 'assets/images/platformXb1Alt.png' },
        { src: 'assets/images/trello.png', dst: 'assets/images/trello.png' },
        { src: 'assets/images/twitter.png', dst: 'assets/images/twitter.png' },
        { src: 'assets/images/youtube.png', dst: 'assets/images/youtube.png' },
        { src: 'assets/images/rawMaterials/57.png', dst: 'assets/images/rawMaterials/57.png' },
    ];
    for (const basicFile of basicFilesToCopy) {
        copyFile(`../build/${basicFile.src}`, `${destFolder}/${basicFile.dst}`)
    }

    const foldersToCopy = [
        { src: 'assets/font', dst: 'assets/font' },
        { src: 'assets/images/drawer', dst: 'assets/images/drawer' },
        { src: 'assets/images/contributors', dst: 'assets/images/contributors' },
        { src: 'assets/images/fab', dst: 'assets/images/fab' },
        { src: 'assets/images/portals', dst: 'assets/images/portals' },
        { src: 'assets/images/screenshots', dst: 'assets/images/screenshots' },
        { src: 'assets/images/search', dst: 'assets/images/search' },
        // { src: 'assets/images/special', dst: 'assets/images/special' },
        { src: 'assets/images/stats', dst: 'assets/images/stats' },
        { src: 'assets/images/store', dst: 'assets/images/store' },
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
    resultIndexFile += '\n\r<script defer src="js/desktop.js"></script>\n\r';

    const overwolfHeaderText = '<div id="overwolf-header"></div>';
    const overwolfHeaderIndex = reactIndexContent.indexOf(overwolfHeaderText);

    resultIndexFile += reactIndexContent.substring(checkIfLoadedScriptEndIndex, overwolfHeaderIndex);
    resultIndexFile += `\n
        <header id="header" class="app-header">
            <img src="../../assets/images/header_icon.png" />
            <h1>Assistant for No Man's Sky</h1>
            <div class="window-controls-group">
                <a href="https://nmsassistant.freshdesk.com" target="_blank" rel="noopener noreferrer">
                    <button id="supportButton" class="window-control window-control-support"></button>
                </a>
                <a href="https://assistantapps.com/discord" target="_blank" rel="noopener noreferrer">
                    <button id="discordButton" class="window-control window-control-discord"></button>
                </a>
                <button id="minimizeButton" class="window-control window-control-minimize"></button>
                <button id="maximizeButton" class="window-control window-control-maximize"></button>
                <button id="closeButton" class="window-control window-control-close"></button>
            </div>
        </header>
    \n`;
    resultIndexFile += reactIndexContent.substring((overwolfHeaderIndex + overwolfHeaderText.length), reactIndexContent.length);
    fs.writeFile(`${destFolder}/desktop.html`, resultIndexFile, ['utf8'], () => { });
}

module.exports = {
    copyBuildFiles: copyBuildFiles,
}
