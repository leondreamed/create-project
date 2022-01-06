import path from 'node:path';
import fs from 'node:fs';
import replace from 'replace-in-file';
import recursiveCopy from 'recursive-copy';

import inquirer from 'inquirer';
import { paramCase } from 'change-case';
import { templateOptions } from './template.js';

type CreateProjectOptions = { folder: string };
export async function createProject(options?: CreateProjectOptions) {
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
			choices: Object.keys(templateOptions),
		},
		{
			type: 'confirm',
			name: 'isLibrary',
			message: 'Will you be publishing this project (e.g. onto NPM)?',
		},
	]);

	const folder = options?.folder ?? paramCase(projectName.toLowerCase());
	const templateOption = projectType as keyof typeof templateOptions;
	const templateFolder = templateOptions[templateOption].folder;
	const commonTemplateFolder = templateOptions.common.folder;
	fs.mkdirSync(folder, { recursive: true });

	await recursiveCopy(templateFolder, folder, {
		dot: true,
	});
	await recursiveCopy(commonTemplateFolder, folder, {
		dot: true,
	});

	// Rename _gitignore to .gitignore
	fs.renameSync(
		path.join(folder, '_gitignore'),
		path.join(folder, '.gitignore')
	);

	await replace.replaceInFile({
		files: path.join(folder, 'package.json'),
		from: new RegExp(`${templateOption}-template`, 'g'),
		to: projectName,
	});

	fs.writeFileSync(path.join(folder, 'readme.md'), projectName);
}
