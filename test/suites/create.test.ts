import { execaCommandSync } from 'execa';
import fs from 'fs';

beforeAll(() => {
	fs.rmSync('my-project', { recursive: true });
});

afterAll(() => {
	fs.rmSync('my-project', { recursive: true });
});

test('creates project', async () => {
	execaCommandSync('pnpm start my-project');
});
