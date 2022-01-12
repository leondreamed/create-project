import { execaSync } from 'execa';

const message = process.argv[process.argv.length - 1];

if (message === undefined) {
	throw new Error('No message provided.');
}

try {
	execaSync('pnpm', ['exec', 'commitlint', '--edit', message], {
		stdio: 'inherit',
	});
} catch {
	process.exit(1);
}
