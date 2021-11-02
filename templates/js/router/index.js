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
		}
	],
});