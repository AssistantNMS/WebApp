const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function generateFullJson() {
    let fullJson = {};

    const siteDataContents = await readFile('./data/site.json', 'utf8');
    const siteData = JSON.parse(siteDataContents);

    // Read game data
    const buildings = await readItemsFromFile('../public/assets/json/en/Buildings.lang.json');
    const constructedTechnology = await readItemsFromFile('../public/assets/json/en/ConstructedTechnology.lang.json');
    const cooking = await readItemsFromFile('../public/assets/json/en/Cooking.lang.json');
    const curiosity = await readItemsFromFile('../public/assets/json/en/curiosity.lang.json');
    const others = await readItemsFromFile('../public/assets/json/en/Others.lang.json');
    const proceduralProducts = await readItemsFromFile('../public/assets/json/en/ProceduralProducts.lang.json');
    const products = await readItemsFromFile('../public/assets/json/en/Products.lang.json');
    const rawMaterials = await readItemsFromFile('../public/assets/json/en/RawMaterials.lang.json');
    const technology = await readItemsFromFile('../public/assets/json/en/Technology.lang.json');
    const technologyModule = await readItemsFromFile('../public/assets/json/en/TechnologyModule.lang.json');
    const tradeItems = await readItemsFromFile('../public/assets/json/en/TradeItems.lang.json');
    const upgradeModules = await readItemsFromFile('../public/assets/json/en/UpgradeModules.lang.json');

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
