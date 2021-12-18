import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '~/components/home.vue';

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{
		path: '/about',
		name: 'About',
		component: () => import('~/components/about.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});
