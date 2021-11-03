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

		async loadIps(state) {
			const result = await axios.post('/api/ips/list', {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) throw 'Error ' + result.status;
			state.commit('setIps', result.data);
		},

		async saveIp(state, data) {
			const result = await axios.post('/api/ips/create', {
				email: state.getters.email,
				password: state.getters.password,

				ip: data.ip,
				net_id: data.net_id,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async updateIp(state, data) {
			const result = await axios.post('/api/ips/update', {
				email: state.getters.email,
				password: state.getters.password,

				id: data.id,
				ip: data.ip,
				net_id: data.net_id,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async deleteIp(state, id) {
			const result = await axios.post('/api/ips/delete/' + id, {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},


		async loadEsxis(state) {
			const result = await axios.post('/api/esxis/list', {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) throw 'Error ' + result.status;
			state.commit('setEsxis', result.data);
		},

		async saveEsxi(state, data) {
			const result = await axios.post('/api/esxis/create', {
				email: state.getters.email,
				password: state.getters.password,

				dc_id: data.dc_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				info: data.info,
				net_id: data.net_id,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async updateEsxi(state, data) {
			const result = await axios.post('/api/esxis/update', {
				email: state.getters.email,
				password: state.getters.password,

				id: data.id,
				dc_id: data.dc_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				info: data.info,
				net_id: data.net_id,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async deleteEsxi(state, id) {
			const result = await axios.post('/api/esxis/delete/' + id, {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async loadVms(state) {
			const result = await axios.post('/api/vms/list', {
				email: state.getters.email,
				password: state.getters.password,
			});
			if (result.status !== 200) throw 'Error ' + result.status;
			state.commit('setVms', result.data);
		},

		async saveVm(state, data) {
			const result = await axios.post('/api/vms/create', {
				email: state.getters.email,
				password: state.getters.password,

				esx_id: data.esx_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				net_id: data.net_id,
				attr: data.attr,
				vmname: data.vmname,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async updateVm(state, data) {
			const result = await axios.post('/api/vms/update', {
				email: state.getters.email,
				password: state.getters.password,

				id: data.id,
				esx_id: data.esx_id,
				esxname: data.esxname,
				ip_id: data.ip_id,
				net_id: data.net_id,
				attr: data.attr,
				vmname: data.vmname,
			});
			if (result.status !== 200) {
				if (result.data) throw result.data;
				throw 'Error ' + result.status;
			}
		},

		async deleteVm(state, id) {
			const result = await axios.post('/api/vms/delete/' + id, {
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