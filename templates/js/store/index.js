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
		}
	},
	getters: {
		isAuthorized: state => state.account.authorized,
	},
	mutations: {
		setAuthorized: (state, value = true) => state.account.authorized = value,
		setEmail: (state, email) => state.account.email = email,
		setPassword: (state, password) => state.account.password = password,
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
		}

	},
});