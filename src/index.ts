import { program } from 'commander';
import { execaCommandSync } from 'execa';
import fs from 'fs';
import path from 'path';
import replace from 'replace-in-file';

program
	.version('0.0.1')
	.arguments('<name> [folder]')
	.action(async (name, folderOrUndefined) => {
		const folder = folderOrUndefined ?? name;
		console.log('hi');
		execaCommandSync(
			`git clone https://github.com/leonzalion/typescript-template ${folder}`
		);

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
