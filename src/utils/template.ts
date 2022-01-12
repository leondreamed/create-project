import type { ProjectTemplate } from '~/types/template.js';

const defineTemplateOptions = <T extends Record<string, ProjectTemplate>>(
	t: T
) => t;
export const templateOptions = defineTemplateOptions({
	typescript: {
		name: 'TypeScript',
		folderName: 'typescript',
		isDisplayed: true,
	},
	electron: {
		name: 'Electron TypeScript Vite',
		folderName: 'electron-typescript-vite',
		isDisplayed: true,
	},
	vite: {
		name: 'Vite TypeScript',
		folderName: 'vite-typescript',
		isDisplayed: true,
	},
	common: {
		folderName: 'common',
		isDisplayed: false,
	},
});
export type TemplateOptions = typeof templateOptions;
