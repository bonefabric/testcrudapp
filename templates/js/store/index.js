import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		account: {
			authorized: false,
			email: '',
			password: '',
		},
		application: {
			datacenters: {
				list: [],
			}
		}
	},
	getters: {
		isAuthorized: state => state.account.authorized,
		email: state => state.account.email,
		password: state => state.account.password,

		datacenters: state => state.application.datacenters.list,
	},
	mutations: {
		setAuthorized: (state, value = true) => state.account.authorized = value,
		setEmail: (state, email) => state.account.email = email,
		setPassword: (state, password) => state.account.password = password,

		setDatacenters: (state, data) => state.application.datacenters.list = data,
	},
	actions: {

		init(state) {
			const email = localStorage.getItem('email');
			const password = localStorage.getItem('password');
			if (email !== null && email.length > 3 && password !== null && password.length > 3) {
				state.commit('setAuthorized');
				state.commit('setEmail', localStorage.getItem('email'));
				state.commit('setPassword', localStorage.getItem('password'));
			}
		},

		async login(state, data) {
			const result = await axios.post('/api/login', {
				email: data.email,
				password: data.password,
			});
			if (!result.status === 200 || result.data !== 'success!') throw 'Error ' + result.status;
			state.commit('setAuthorized');
			state.commit('setEmail', data.email);
			state.commit('setPassword', data.password);
			localStorage.setItem('email', data.email);
			localStorage.setItem('password', data.password);
		},

		async loadDatacenters(state) {
			state.commit('setDatacenters', []);
			const result = await axios.post('/api/datacenters/list', {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) throw 'Error ' + result.status;
			state.commit('setDatacenters', result.data);
		},

		async saveDatacenter(state, data) {
			const result = await axios.post('/api/datacenters/create', {
				email: state.getters.email,
				password: state.getters.password,

				dc_name: data.dc_name,
				dc_email: data.dc_email,
				dc_pass: data.dc_pass,
				dc_comment: data.dc_comment,
			});
			if (result.status !== 200) throw 'Error ' + result.status;
		}

	},
});