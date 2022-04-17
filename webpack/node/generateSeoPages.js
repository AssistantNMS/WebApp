const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');

const pjson = require('../../package.json');

const dateHelper = require('../handlebar/helpers/date.helper.js');
const loudHelper = require('../handlebar/helpers/loud.helper.js');
const urlrefHelper = require('../handlebar/helpers/urlref.helper.js');
const versionHelper = require('../handlebar/helpers/version.helper.js');

const readFile = util.promisify(fs.readFile);

async function generateItemPage() {
    process.env['NODE_ENV'] = pjson.version;
    Handlebars.registerHelper('date', dateHelper);
    Handlebars.registerHelper('loud', loudHelper);
    Handlebars.registerHelper('urlref', urlrefHelper);
    Handlebars.registerHelper('version', versionHelper);

    const allItemFolders = fs.readdirSync('../public/assets/json', { withFileTypes: true });
    const directories = allItemFolders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    console.log(directories);

    const template = await readFile('./handlebar/itemDetailPage.hbs', 'utf8');
    const templateFunc = Handlebars.compile(template);

    await writeTemplateFile(templateFunc, 'en', `project`, `link/`);
    for (const dir of directories) {
        await writeTemplateFile(templateFunc, dir, `project-${dir}`, `link/${dir}/`);
    }
}

async function writeTemplateFile(templateFunc, dir, sourceFile, destFolder) {
    console.log(`Running SEO pages for ${dir} in ${destFolder}`);
    const projectDataContents = await readFile(`./data/${sourceFile}.json`, 'utf8');
    const projectData = JSON.parse(projectDataContents);

    for (const item of projectData.allItems) {
        const templateData = {
            ...projectData,
            allItems: [],
            data: { ...item }
        };
        const fullDir = `../public/link/${dir}`;
        if (!fs.existsSync(fullDir)) {
            fs.mkdirSync(fullDir);
        }

        const html = templateFunc(templateData);
        fs.writeFile(`../public/${destFolder}/${item.Id}.html`, html, ['utf8'], () => { });
    }
}

generateItemPage();
