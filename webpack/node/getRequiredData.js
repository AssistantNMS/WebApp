const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function generateFullJson() {
    let fullJson = {};

    const siteDataContents = await readFile('./data/site.json', 'utf8');
    const siteData = JSON.parse(siteDataContents);

    // Read game data
    const baseJsonPath = '../public/assets/json/en/';
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


    fullJson = { ...siteData, ...{ allItems: allItems } };

    fs.writeFile('./data/project.json', JSON.stringify(fullJson), ['utf8'], () => { });
}

async function readItemsFromFile(filePath) {
    const fileContents = await readFile(filePath, 'utf8');
    return JSON.parse(fileContents).map(item => ({
        "Id": item.Id,
        "Icon": item.Icon,
        "Name": item.Name,
        "Group": item.Group,
        "Description": item.Description,
        "Colour": item.Colour,
    }));
}

generateFullJson();
