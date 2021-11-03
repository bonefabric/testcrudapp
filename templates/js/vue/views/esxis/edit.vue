<template>
	<div>
		<form class="col-8 offset-2" @submit.prevent>
			<div class="mb-3">
				<select class="form-select" v-model="dc_id" :disabled="loading"
								:class="{'is-invalid': $v.dc_id.$anyError}">
					<option :value="dc.id" v-for="dc in datacenters" :key="dc.id" :selected="dc_id === dc.id">{{ dc.dc }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputName" class="form-label">Name</label>
				<input type="text" class="form-control" id="inputName" v-model="esxname" :disabled="loading"
							 :class="{'is-invalid': $v.esxname.$anyError}">
			</div>
			<div class="mb-3">
				<select class="form-select" v-model="ip_id" :disabled="loading"
								:class="{'is-invalid': $v.ip_id.$anyError}">
					<option :value="ip.id" v-for="ip in ips" :key="ip.id" :selected="ip_id === ip.id">{{ ip.ip }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputInfo" class="form-label">Info</label>
				<input type="text" class="form-control" id="inputInfo" v-model="info" :disabled="loading"
							 :class="{'is-invalid': $v.info.$anyError}">
			</div>
			<div class="mb-3">
				<select class="form-select" v-model="net_id" :disabled="loading"
								:class="{'is-invalid': $v.net_id.$anyError}">
					<option :value="net.id" v-for="net in nets" :key="net.id" :selected="net_id === net.id">{{ net.net }}</option>
				</select>
			</div>
			<button type="submit" class="btn btn-primary" @click="update" :disabled="loading">
				<span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
				Update
			</button>
			<div class="alert alert-danger mt-3" role="alert" v-if="error">
				{{ error }}
			</div>
		</form>
	</div>
</template>

<script>
import {maxLength, minLength, required, minValue} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

export default {
	name: "edit",
	beforeMount() {
		if (!this.datacentersLoaded) {
			this.loading = true;
			this.$store.dispatch('loadDatacenters')
					.catch(e => this.error = e)
					.finally(() => this.loading = false)
		}
		if (!this.ipsLoaded) {
			this.loading = true;
			this.$store.dispatch('loadIps')
					.catch(e => this.error = e)
					.finally(() => this.loading = false)
		}
		if (!this.netsLoaded) {
			this.loading = true;
			this.$store.dispatch('loadNets')
					.catch(e => this.error = e)
					.finally(() => this.loading = false)
		}
		const esxi = this.$store.getters.esxis.find(esxi => esxi.id === this.$route.params.id);
		if (esxi === undefined) {
			this.$router.push({name: 'esxis'});
			return;
		}
		this.dc = esxi.dc;
		this.dc_id = esxi.dc_id;
		this.esxname = esxi.esxname;
		this.info = esxi.info;
		this.ip = esxi.ip;
		this.ip_id = esxi.ip_id;
		this.net = esxi.net;
		this.net_id = esxi.net_id;
	},
	data() {
		return {
			dc: '',
			dc_id: 0,
			esxname: '',
			ip_id: 0,
			ip: '',
			info: '',
			net_id: 0,
			net: '',
			loading: false,
			error: '',
		}
	},
	validations: {
		dc_id: {required, minValue: minValue(1)},
		esxname: {required, minLength: minLength(3), maxLength: maxLength(200)},
		ip_id: {required, minValue: minValue(1)},
		info: {required, minLength: minLength(3), maxLength: maxLength(200)},
		net_id: {required, minValue: minValue(1)},
	},
	methods: {
		update() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('updateEsxi', {
				id: this.$route.params.id,
				dc_id: this.dc_id,
				esxname: this.esxname,
				ip_id: this.ip_id,
				info: this.info,
				net_id: this.net_id,
			})
					.then(() => this.$router.push({name: 'esxis'}))
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	},
	computed: {
		...mapGetters([
			'datacenters',
			'datacentersLoaded',
			'ips',
			'ipsLoaded',
			'nets',
			'netsLoaded'
		])
	}
}
</script>

<style scoped>

</style>