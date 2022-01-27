import path from 'node:path';
import fs from 'node:fs';
import replace from 'replace-in-file';
import recursiveCopy from 'recursive-copy';

import inquirer from 'inquirer';
import { paramCase } from 'change-case';
import mapObject, { mapObjectSkip } from 'map-obj';
import type { PackageJson } from 'type-fest';
import { templateOptions } from './template.js';
import { getTemplateFolderPath } from './paths.js';

type CreateProjectOptions = { folder: string };
export async function createProject(options?: CreateProjectOptions) {
	const {
		projectType,
		projectName,
		projectDescription,
		projectRepository,
		isLibrary: _,
	} = await inquirer.prompt<{
		projectType: string;
		projectName: string;
		projectDescription: string;
		projectRepository: string;
		isLibrary: boolean;
	}>([
		{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of your project?',
		},
		{
			type: 'input',
			name: 'projectDescription',
			message: 'What is the description of your project?',
		},
		{
			type: 'input',
			name: 'projectRepository',
			message:
				'What is the repository for this project (e.g. leonzalion/my-repo-name)? (leave blank if none)',
		},
		{
			type: 'list',
			name: 'projectType',
			message: 'What type of project would you like to create?',
			choices: Object.keys(
				mapObject(templateOptions, (key, option) =>
					option.isDisplayed ? [key, option] : mapObjectSkip
				)
			),
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

	// Rename _gitattributes to .gitattributes
	fs.renameSync(
		path.join(destinationFolder, '_gitattributes'),
		path.join(destinationFolder, '.gitattributes')
	);

	const packageJsonPath = path.join(destinationFolder, 'package.json');
	replace.sync({
		files: packageJsonPath,
		from: ['{{name}}', '{{description}}'],
		to: [projectName, projectDescription],
	});

	if (projectRepository.trim() === '') {
		const packageJson = JSON.parse(
			fs.readFileSync(packageJsonPath).toString()
		) as PackageJson;
		packageJson.repository = undefined;
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
	} else {
		replace.sync({
			files: packageJsonPath,
			from: ['{{repository}}'],
			to: [projectRepository],
		});
	}

	fs.writeFileSync(path.join(destinationFolder, 'readme.md'), projectName);
}
