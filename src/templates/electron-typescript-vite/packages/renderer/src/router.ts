import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: async () => import('~/components/home.vue'),
	},
	{
		path: '/about',
		name: 'About',
		component: async () => import('~/components/about.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});
