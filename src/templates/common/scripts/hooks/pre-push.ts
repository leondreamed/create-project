import { execaCommandSync as exec } from 'execa';

exec('pnpm run tc', { stdio: 'inherit' });
