import { ProjectTemplate } from '~/types/template.js';

const defineTemplateOptions = <T extends Record<string, ProjectTemplate>>(
	t: T
) => t;
export const templateOptions = defineTemplateOptions({
	typescript: {
		name: 'TypeScript',
		folder: 'typescript',
		isDisplayed: true,
	},
	electron: {
		name: 'Electron TypeScript Vite',
		folder: 'electron-typescript-vite',
		isDisplayed: true,
	},
	vite: {
		name: 'Vite TypeScript',
		folder: 'vite-typescript',
		isDisplayed: true,
	},
	common: {
		folder: 'common',
		isDisplayed: false,
	},
});
