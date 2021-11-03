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

		//Datacenters
		{
			name: 'datacenters',
			path: '/datacenters',
			component: () => import("../vue/views/datacenters/index"),
			meta: {
				title: 'Datacenters'
			}
		},
		{
			name: 'datacentersCreate',
			path: '/datacenters/create',
			component: () => import("../vue/views/datacenters/create"),
			meta: {
				title: 'Create datacenter'
			}
		},
		{
			name: 'datacentersEdit',
			path: '/datacenters/edit/:id',
			component: () => import("../vue/views/datacenters/edit"),
			meta: {
				title: 'Edit datacenter'
			}
		},

		//Nets
		{
			name: 'nets',
			path: '/nets',
			component: () => import("../vue/views/nets/index"),
			meta: {
				title: 'Nets'
			}
		},
		{
			name: 'netsCreate',
			path: '/nets/create',
			component: () => import("../vue/views/nets/create"),
			meta: {
				title: 'Create Net'
			}
		},
		{
			name: 'netsEdit',
			path: '/nets/edit/:id',
			component: () => import("../vue/views/nets/edit"),
			meta: {
				title: 'Edit Net'
			}
		},

	],
});