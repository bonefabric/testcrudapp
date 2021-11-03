import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"

import Vue from "vue";

import Application from "./vue/Application";

import store from "./store";
import router from "./router";

import {Vuelidate} from "vuelidate";
Vue.use(Vuelidate);

new Vue({
	el: '#app',
	render: h => h(Application),
	store,
	router,
});