const fs = require('fs');
const util = require('util');
const Handlebars = require("handlebars");

const readFile = util.promisify(fs.readFile);

async function generateItemPage() {
    const projectDataContents = await readFile('./data/project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    const template = await readFile('./handlebar/itemDetailPage.hbs', 'utf8');
    const templateFunc = Handlebars.compile(template);

    for (const item of projectData.allItems) {
        const templateData = {
            ...projectData,
            allItems: [],
            data: { ...item }
        };
        const html = templateFunc(templateData)
        fs.writeFile(`../public/link/${item.Id}.html`, html, ['utf8'], () => { });
    }
}

generateItemPage();
