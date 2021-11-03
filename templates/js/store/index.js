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
				loaded: false,
			},
			nets: {
				list: [],
			}
		}
	},
	getters: {
		isAuthorized: state => state.account.authorized,
		email: state => state.account.email,
		password: state => state.account.password,

		datacenters: state => state.application.datacenters.list,
		datacentersLoaded: state => state.application.datacenters.loaded,

		nets: state => state.application.nets.list,
	},
	mutations: {
		setAuthorized: (state, value = true) => state.account.authorized = value,
		setEmail: (state, email) => state.account.email = email,
		setPassword: (state, password) => state.account.password = password,

		setDatacenters: (state, data) => {
			state.application.datacenters.list = data;
			state.application.datacenters.loaded = true;
		},
		setNets: (state, data) => state.application.nets.list = data,
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

				dc: data.dc_name,
				login: data.dc_email,
				pass: data.dc_pass,
				comment: data.dc_comment,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async deleteDatacenter(state, id) {
			const result = await axios.post('/api/datacenters/delete/' + id, {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async updateDatacenter(state, data) {
			const result = await axios.post('/api/datacenters/update', {
				email: state.getters.email,
				password: state.getters.password,

				id: data.id,
				dc: data.dc_name,
				login: data.dc_email,
				pass: data.dc_pass,
				comment: data.dc_comment,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async loadNets(state) {
			state.commit('setNets', []);
			const result = await axios.post('/api/nets/list', {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) throw 'Error ' + result.status;
			state.commit('setNets', result.data);
		},

		async saveNet(state, data) {
			const result = await axios.post('/api/nets/create', {
				email: state.getters.email,
				password: state.getters.password,

				dc_id: data.net_dc_id,
				net: data.net_name,
				mask: data.net_mask,
				gateway: data.net_gateway,
				comment: data.net_comment,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async updateNet(state, data) {
			const result = await axios.post('/api/nets/update', {
				email: state.getters.email,
				password: state.getters.password,

				id: data.id,
				dc_id: data.dc_id,
				net: data.net,
				mask: data.mask,
				gateway: data.gateway,
				comment: data.comment,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async deleteNet(state, id) {
			const result = await axios.post('/api/nets/delete/' + id, {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

	},
});