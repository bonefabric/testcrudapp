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

		//Ips
		{
			name: 'ips',
			path: '/ips',
			component: () => import("../vue/views/ips/index"),
			meta: {
				title: 'IPs'
			}
		},
		{
			name: 'ipsCreate',
			path: '/ips/create',
			component: () => import("../vue/views/ips/create"),
			meta: {
				title: 'Create IP'
			}
		},
		{
			name: 'ipsEdit',
			path: '/ips/edit/:id',
			component: () => import("../vue/views/ips/edit"),
			meta: {
				title: 'Edit IP'
			}
		},

		//ESXIs
		{
			name: 'esxis',
			path: '/esxis',
			component: () => import("../vue/views/esxis/index"),
			meta: {
				title: 'ESXIs'
			}
		},
		{
			name: 'esxisCreate',
			path: '/esxis/create',
			component: () => import("../vue/views/esxis/create"),
			meta: {
				title: 'Create ESXI'
			}
		},
		{
			name: 'esxisEdit',
			path: '/esxis/edit/:id',
			component: () => import("../vue/views/esxis/edit"),
			meta: {
				title: 'Edit ESXI'
			}
		},

	],
});