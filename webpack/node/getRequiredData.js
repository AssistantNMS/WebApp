const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function generateFullJson() {
    const siteDataContents = await readFile('./data/site.json', 'utf8');
    const siteData = JSON.parse(siteDataContents);

    const cspContents = await readFile('./data/csp.json', 'utf8');
    const cspContent = JSON.parse(cspContents);
    const headerList = cspContent.options.map(opt =>
        opt.name +
        ((opt.values != null && opt.values.length > 0) ? ' ' : '') +
        opt.values.join(' ')
    );
    const header = headerList.join('; ') + ';';

    const allItemFolders = fs.readdirSync('../public/assets/json', { withFileTypes: true });
    const directories = allItemFolders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    const siteDataFull = {
        ...siteData,
        headers: [
            ...cspContent.headers.map(csp => ({ "name": csp, "value": header })),
            ...siteData.headers,
        ]
    };

    await writeProjectJson('en', siteDataFull, 'project');
    for (const dir of directories) {
        await writeProjectJson(dir, siteDataFull, `project-${dir}`);
    }
}

async function writeProjectJson(dir, siteData, destFile) {
    // Read game data
    const baseJsonPath = `../public/assets/json/${dir}/`;
    const buildings = await readItemsFromFile(`${baseJsonPath}Buildings.lang.json`);
    const constructedTechnology = await readItemsFromFile(`${baseJsonPath}ConstructedTechnology.lang.json`);
    const cooking = await readItemsFromFile(`${baseJsonPath}Cooking.lang.json`);
    const curiosity = await readItemsFromFile(`${baseJsonPath}Curiosity.lang.json`);
    const others = await readItemsFromFile(`${baseJsonPath}Others.lang.json`);
    const proceduralProducts = await readItemsFromFile(`${baseJsonPath}ProceduralProducts.lang.json`);
    const products = await readItemsFromFile(`${baseJsonPath}Products.lang.json`);
    const rawMaterials = await readItemsFromFile(`${baseJsonPath}RawMaterials.lang.json`);
    const technology = await readItemsFromFile(`${baseJsonPath}Technology.lang.json`);
    const technologyModule = await readItemsFromFile(`${baseJsonPath}TechnologyModule.lang.json`);
    const tradeItems = await readItemsFromFile(`${baseJsonPath}TradeItems.lang.json`);
    const upgradeModules = await readItemsFromFile(`${baseJsonPath}UpgradeModules.lang.json`);

    const allItems = [
        ...buildings,
        ...constructedTechnology,
        ...cooking,
        ...curiosity,
        ...others,
        ...proceduralProducts,
        ...products,
        ...rawMaterials,
        ...technology,
        ...technologyModule,
        ...tradeItems,
        ...upgradeModules,
    ];

    const fullJson = { ...siteData, ...{ allItems: allItems } };
    fs.writeFile(`./data/${destFile}.json`, JSON.stringify(fullJson), ['utf8'], () => { });
}

const descripTagRegex = /(<\w*>)/g;
async function readItemsFromFile(filePath) {
    const fileContents = await readFile(filePath, 'utf8');
    return JSON.parse(fileContents).map(item => ({
        "Id": item.Id,
        "Icon": (item.CdnUrl != null) ? item.CdnUrl : `https://app.nmsassistant.com/assets/images/${item.Icon}`,
        "Name": item.Name,
        "Group": item.Group,
        "Description": (item.Description == null ? '' : item.Description).replace(descripTagRegex, ''),
        "Colour": item.Colour,
    }));
}

generateFullJson();
