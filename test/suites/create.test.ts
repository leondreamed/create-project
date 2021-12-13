import { execaCommandSync } from 'execa';

test('creates project', async() => {
	execaCommandSync('pnpm run create-ts-project ')
})