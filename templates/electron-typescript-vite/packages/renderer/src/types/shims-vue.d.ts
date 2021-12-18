declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
	const component: DefineComponent<{}, {}, any>;
	// eslint-disable-next-line import/no-default-export
	export default component;
}