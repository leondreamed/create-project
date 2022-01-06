import path from 'node:path';
import fs from 'node:fs';
import replace from 'replace-in-file';
import recursiveCopy from 'recursive-copy';

import inquirer from 'inquirer';
import { paramCase } from 'change-case';
import { templateOptions } from './template.js';
import { getTemplateFolderPath } from './paths.js';

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

	const destinationFolder =
		options?.folder ?? paramCase(projectName.toLowerCase());
	const templateOption = projectType as keyof typeof templateOptions;
	const templateSourceFolder = getTemplateFolderPath(
		templateOptions[templateOption]
	);
	const commonTemplateFolder = getTemplateFolderPath(templateOptions.common);
	fs.mkdirSync(destinationFolder, { recursive: true });

	await recursiveCopy(commonTemplateFolder, destinationFolder, {
		dot: true,
		overwrite: true,
	});
	await recursiveCopy(templateSourceFolder, destinationFolder, {
		dot: true,
		overwrite: true,
	});

	// Rename _gitignore to .gitignore
	fs.renameSync(
		path.join(destinationFolder, '_gitignore'),
		path.join(destinationFolder, '.gitignore')
	);

	await replace.replaceInFile({
		files: path.join(destinationFolder, 'package.json'),
		from: new RegExp(
			`${templateOptions[templateOption].folderName}-template`,
			'g'
		),
		to: projectName,
	});

	fs.writeFileSync(path.join(destinationFolder, 'readme.md'), projectName);
}
