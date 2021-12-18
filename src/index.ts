import { Option,program } from 'commander';
import { execaCommandSync } from 'execa';
import * as fs from 'node:fs';
import * as path from 'node:path';
import replace from 'replace-in-file';

const projectTypeToRepo = {
	typescript: 'https://github.com/leonzalion/typescript-template',
	electron: 'https://github.com/leonzalion/electron-vite-typescript-template',
} as const;
type ProjectType = keyof typeof projectTypeToRepo;

program
	.version('0.0.1')
	.description('Create a new project from a template')
	.name('create-project')
	.showHelpAfterError()
	.argument('<name>')
	.argument('[folder]')
	.addOption(
		new Option(
			'-t, --type <project-type>',
			'the type of the project to create'
		).choices(['typescript', 'electron'])
	)
	.action(async (name: string, optionalFolder: string | undefined) => {
		const projectType = program.opts().type as ProjectType;
		const folder = optionalFolder ?? name;

		const repo = projectTypeToRepo[projectType];
		execaCommandSync(`git clone ${repo} ${folder}`);

		// Remove the .git folder
		fs.rmSync(path.join(folder, '.git'), { recursive: true });
		fs.rmSync(path.join(folder, 'renovate.json'));

		await replace.replaceInFile({
			files: path.join(folder, 'package.json'),
			from: /typescript-template/g,
			to: name,
		});

		await replace.replaceInFile({
			files: path.join(folder, 'readme.md'),
			from: /Typescript Template/g,
			to: name,
		});
	});

program.parse(process.argv);
