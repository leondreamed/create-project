import { paramCase } from 'change-case';
import inquirer from 'inquirer';
import mapObject, { mapObjectSkip } from 'map-obj';
import fs from 'node:fs';
import path from 'node:path';
import readdirp from 'readdirp';
import recursiveCopy from 'recursive-copy';
import replace from 'replace-in-file';
import type { PackageJson } from 'type-fest';

import { getTemplateFolderPath } from './paths.js';
import { templateOptions } from './template.js';

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
	const projectNameDir = projectName.includes('/')
		? projectName.split('/').at(-1)!
		: projectName;
	const templateOption = projectType as keyof typeof templateOptions;
	const templateSourceFolder = getTemplateFolderPath(
		templateOptions[templateOption]
	);
	fs.mkdirSync(destinationFolder, { recursive: true });

	await recursiveCopy(templateSourceFolder, destinationFolder, {
		dot: true,
		overwrite: true,
	});

	// Loop until all files with {{.*}} have been renamed
	for (;;) {
		let hasFileBeenRenamed = false;
		// eslint-disable-next-line no-await-in-loop
		const files = await readdirp.promise(destinationFolder, {
			type: 'files_directories',
		});

		for (const file of files) {
			replace.sync({
				files: file.fullPath,
				from: ['{{project_name}}', '{{description}}'],
				to: [
					projectName.replace(/"/g, '\\"'),
					projectDescription.replace(/"/g, '\\"'),
				],
			});

			if (/{{.*}}/.test(file.fullPath)) {
				const destinationPath = file.fullPath.replace(
					/{{project_name}}/g,
					projectNameDir
				);

				if (fs.statSync(file.fullPath).isFile()) {
					fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
				} else {
					fs.mkdirSync(destinationPath, { recursive: true });
				}

				fs.renameSync(file.fullPath, destinationPath);
				hasFileBeenRenamed = true;
				break;
			}
		}

		if (!hasFileBeenRenamed) {
			break;
		}
	}

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

	if (projectRepository.trim() === '') {
		const packageJson = JSON.parse(
			fs.readFileSync(packageJsonPath).toString()
		) as PackageJson;
		packageJson.repository = undefined;
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, '\t'));
	} else {
		replace.sync({
			files: packageJsonPath,
			from: /{{repository}}/g,
			to: projectRepository.replace(/"/g, '\\"'),
		});
	}

	fs.writeFileSync(
		path.join(destinationFolder, 'readme.md'),
		`# ${projectName}\n`
	);
}
