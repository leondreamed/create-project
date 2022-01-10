import { execaCommandSync as exec } from 'execa';

exec('pnpm exec lint-staged', { stdio: 'inherit' });
