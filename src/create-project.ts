import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import { Option, program } from 'commander';
import replace from 'replace-in-file';
import recursiveCopy from 'recursive-copy';

import { TemplateOption } from './types/template.js';
import { getTemplateFolder, getTemplateName } from './utils/template.js';

program
	.version('0.0.1')
	.description('Create a new project from a template')
	.name('create-project')
	.showHelpAfterError()
	.argument('<name>')
	.argument('[folder]')
	.option('-l, --library', 'create a library for publishing onto npm')
	.addOption(
		new Option(
			'-t, --type <project-type>',
			'the type of the project to create'
		).choices(['typescript', 'electron'])
	)
	.action(async (name: string, optionalFolder: string | undefined) => {
		const _isLibrary = program.opts().library as boolean;
		const templateOption = program.opts().type as TemplateOption;
		let folder = optionalFolder ?? name;
		if (!folder.startsWith('/')) {
			folder = path.join(process.cwd(), folder);
		}

		const templateFolder = getTemplateFolder(templateOption);
		const templateName = getTemplateName(templateOption);
		const commonTemplateFolder = getTemplateFolder(TemplateOption.common);
		fs.mkdirSync(folder, { recursive: true });

		await recursiveCopy(templateFolder, folder);
		await recursiveCopy(commonTemplateFolder, folder);

		await replace.replaceInFile({
			files: path.join(folder, 'package.json'),
			from: new RegExp(`${templateName}-template`, 'g'),
			to: name,
		});

		fs.writeFileSync(path.join(folder, 'readme.md'), name);
	});

program.parse(process.argv);
