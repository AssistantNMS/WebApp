const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');

const pjson = require('../../package.json');

const dateHelper = require('../handlebar/helpers/date.helper.js');
const loudHelper = require('../handlebar/helpers/loud.helper.js');
const urlrefHelper = require('../handlebar/helpers/urlref.helper.js');
const versionHelper = require('../handlebar/helpers/version.helper.js');

const readFile = util.promisify(fs.readFile);

async function generateOtherFiles() {
    process.env['NODE_ENV'] = pjson.version;
    Handlebars.registerHelper('date', dateHelper);
    Handlebars.registerHelper('loud', loudHelper);
    Handlebars.registerHelper('urlref', urlrefHelper);
    Handlebars.registerHelper('version', versionHelper);
    
    const projectDataContents = await readFile('./data/project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    const files = [
        'humans.txt',
        'opensearch.xml',
        'manifest.json',
        'site.webmanifest',
        'sitemap.xml',
        'web.config',
    ]

    for (const file of files) {
        const template = await readFile(`./handlebar/${file}.hbs`, 'utf8');
        const templateFunc = Handlebars.compile(template);
        const templateData = {
            ...projectData,
            allItems: []
        };
        const compiledTemplate = templateFunc(templateData);
        fs.writeFile(`../public/${file}`, compiledTemplate, ['utf8'], () => { });
    }
}

generateOtherFiles();
