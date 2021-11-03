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
				loaded: false,
			},
			ips: {
				list: [],
				loaded: false,
			},
			esxis: {
				list: [],
				loaded: false,
			},
			vms: {
				list: [],
				loaded: false,
			}
		}
	},
	getters: {
		isAuthorized: state => state.account.authorized,
		email: state => state.account.email,
		password: state => state.account.password,

		config: state => {
			return {
				headers: {
					'X-email': state.account.email,
					'X-password': state.account.password,
				}
			}
		},

		datacenters: state => state.application.datacenters.list,
		datacentersLoaded: state => state.application.datacenters.loaded,

		nets: state => state.application.nets.list,
		netsLoaded: state => state.application.nets.loaded,

		ips: state => state.application.ips.list,
		ipsLoaded: state => state.application.ips.loaded,

		esxis: state => state.application.esxis.list,
		esxisLoaded: state => state.application.esxis.loaded,

		vms: state => state.application.vms.list,
		vmsLoaded: state => state.application.vms.loaded,
	},
	mutations: {
		setAuthorized: (state, value = true) => state.account.authorized = value,
		setEmail: (state, email) => state.account.email = email,
		setPassword: (state, password) => state.account.password = password,

		setDatacenters: (state, data) => {
			state.application.datacenters.list = data;
			state.application.datacenters.loaded = true;
		},
		setNets: (state, data) => {
			state.application.nets.list = data;
			state.application.nets.loaded = true;
		},
		setIps: (state, data) => {
			state.application.ips.list = data;
			state.application.ips.loaded = true;
		},
		setEsxis: (state, data) => {
			state.application.esxis.list = data;
			state.application.esxis.loaded = true;
		},
		setVms: (state, data) => {
			state.application.vms.list = data;
			state.application.vms.loaded = true;
		},
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
			await axios.post('/api/login', null, {
				headers: {
					'X-email': data.email,
					'X-password': data.password,
				}
			});
			state.commit('setAuthorized');
			state.commit('setEmail', data.email);
			state.commit('setPassword', data.password);
			localStorage.setItem('email', data.email);
			localStorage.setItem('password', data.password);
		},

		logout(state) {
			state.commit('setAuthorized', false);
			state.commit('setEmail', '');
			state.commit('setPassword', '');
			localStorage.removeItem('email');
			localStorage.removeItem('password');
		},

		async loadDatacenters(state) {
			const result = await axios.post('/api/datacenters/list', null, state.getters.config);
			state.commit('setDatacenters', result.data);
		},

		async saveDatacenter(state, data) {
			await axios.post('/api/datacenters/create', {
				dc: data.dc_name,
				login: data.dc_email,
				pass: data.dc_pass,
				comment: data.dc_comment,
			}, state.getters.config);
		},

		async deleteDatacenter(state, id) {
			await axios.post('/api/datacenters/delete/' + id, null, state.getters.config);
		},

		async updateDatacenter(state, data) {
			await axios.post('/api/datacenters/update', {
				id: data.id,
				dc: data.dc_name,
				login: data.dc_email,
				pass: data.dc_pass,
				comment: data.dc_comment,
			}, state.getters.config);
		},

		async loadNets(state) {
			const result = await axios.post('/api/nets/list', null, state.getters.config);
			state.commit('setNets', result.data);
		},

		async saveNet(state, data) {
			await axios.post('/api/nets/create', {
				dc_id: data.net_dc_id,
				net: data.net_name,
				mask: data.net_mask,
				gateway: data.net_gateway,
				comment: data.net_comment,
			}, state.getters.config);
		},

		async updateNet(state, data) {
			await axios.post('/api/nets/update', {
				id: data.id,
				dc_id: data.dc_id,
				net: data.net,
				mask: data.mask,
				gateway: data.gateway,
				comment: data.comment,
			}, state.getters.config);
		},

		async deleteNet(state, id) {
			await axios.post('/api/nets/delete/' + id, null, state.getters.config);
		},

		async loadIps(state) {
			const result = await axios.post('/api/ips/list', null, state.getters.config);
			state.commit('setIps', result.data);
		},

		async saveIp(state, data) {
			await axios.post('/api/ips/create', {
				ip: data.ip,
				net_id: data.net_id,
			}, state.getters.config);
		},

		async updateIp(state, data) {
			await axios.post('/api/ips/update', {
				id: data.id,
				ip: data.ip,
				net_id: data.net_id,
			}, state.getters.config);
		},

		async deleteIp(state, id) {
			await axios.post('/api/ips/delete/' + id, null, state.getters.config);
		},

		async loadEsxis(state) {
			const result = await axios.post('/api/esxis/list', null, state.getters.config);
			state.commit('setEsxis', result.data);
		},

		async saveEsxi(state, data) {
			await axios.post('/api/esxis/create', {
				dc_id: data.dc_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				info: data.info,
				net_id: data.net_id,
			}, state.getters.config);
		},

		async updateEsxi(state, data) {
			await axios.post('/api/esxis/update', {
				id: data.id,
				dc_id: data.dc_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				info: data.info,
				net_id: data.net_id,
			}, state.getters.config);
		},

		async deleteEsxi(state, id) {
			await axios.post('/api/esxis/delete/' + id, null, state.getters.config);
		},

		async loadVms(state) {
			const result = await axios.post('/api/vms/list', null, state.getters.config);
			state.commit('setVms', result.data);
		},

		async saveVm(state, data) {
			await axios.post('/api/vms/create', {
				esx_id: data.esx_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				net_id: data.net_id,
				attr: data.attr,
				vmname: data.vmname,
			}, state.getters.config);
		},

		async updateVm(state, data) {
			await axios.post('/api/vms/update', {
				id: data.id,
				esx_id: data.esx_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				net_id: data.net_id,
				attr: data.attr,
				vmname: data.vmname,
			}, state.getters.config);
		},

		async deleteVm(state, id) {
			await axios.post('/api/vms/delete/' + id, null, state.getters.config);
		},

	},
});