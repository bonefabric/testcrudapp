import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import index from "../vue/views/index";

export default new VueRouter({
	mode: "history",
	routes: [
		{
			name: 'index',
			path: '/',
			component: index,
			meta: {
				title: 'Overview'
			}
		},
		{
			name: 'login',
			path: '/login',
			component: () => import("../vue/views/login"),
			meta: {
				title: 'Log in'
			}
		},

		{
			name: 'datacenters',
			path: 'datacenters',
			component: () => import("../vue/views/datacenters/index"),
			meta: {
				title: 'Datacenters'
			}
		}
	],
});