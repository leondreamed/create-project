import path from 'node:path';
import fs from 'node:fs';
import replace from 'replace-in-file';
import recursiveCopy from 'recursive-copy';

import inquirer from 'inquirer';
import { snakeCase } from 'snake-case';
import { TemplateOption } from './types/template.js';
import { getTemplateFolder, getTemplateName } from './utils/template.js';

const {
	projectType,
	projectName,
	isLibrary: _,
} = await inquirer.prompt<{
	projectType: string;
	projectName: string;
	isLibrary: boolean;
}>([
	{
		type: 'input',
		name: 'projectName',
		message: 'What is the name of your project?',
	},
	{
		type: 'list',
		name: 'projectType',
		message: 'What type of project would you like to create?',
		choices: ['typescript', 'electron'],
	},
	{
		type: 'confirm',
		name: 'isLibrary',
		message: 'Will you be publishing this project (e.g. onto NPM)?',
	},
]);

const folder = snakeCase(projectName.toLowerCase());
const templateOption = projectType as TemplateOption;
const templateFolder = getTemplateFolder(templateOption);
const templateName = getTemplateName(templateOption);
const commonTemplateFolder = getTemplateFolder(TemplateOption.common);
fs.mkdirSync(folder, { recursive: true });

await recursiveCopy(templateFolder, folder, {
	dot: true,
});
await recursiveCopy(commonTemplateFolder, folder, {
	dot: true,
});

// Rename _gitignore to .gitignore
fs.renameSync(path.join(folder, '_gitignore'), path.join(folder, '.gitignore'));

await replace.replaceInFile({
	files: path.join(folder, 'package.json'),
	from: new RegExp(`${templateName}-template`, 'g'),
	to: projectName,
});

fs.writeFileSync(path.join(folder, 'readme.md'), projectName);
