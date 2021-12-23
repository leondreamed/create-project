import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import {Option, program} from 'commander';
import MergeTrees from 'merge-trees';
import replace from 'replace-in-file';

import {Template} from './types/template.js';
import {getTemplateFolder} from './utils/template.js';

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
			'the type of the project to create',
		).choices(['typescript', 'electron']),
	)
	.action(async (name: string, optionalFolder: string | undefined) => {
		const projectType = program.opts().type as Template;
		const folder = optionalFolder ?? name;

		const templateFolder = getTemplateFolder(projectType);
		const commonTemplateFolder = getTemplateFolder(Template.common);
		const mergeTrees = new MergeTrees(
			[templateFolder, commonTemplateFolder],
			folder,
		);
		mergeTrees.merge();

		// Remove the .git folder
		fs.rmSync(path.join(folder, '.git'), {recursive: true});
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
