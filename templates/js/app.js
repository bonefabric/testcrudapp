import Vue from "vue";

import Application from "./vue/Application";

import store from "./store";
import router from "./router";

new Vue({
	el: '#app',
	render: h => h(Application),
	store,
	router,
});