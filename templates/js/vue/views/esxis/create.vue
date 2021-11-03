<template>
	<div>
		<form class="col-8 offset-2 mt-3" @submit.prevent>
			<div class="mb-3">
				<select class="form-select" v-model="dc_id" :disabled="loading"
								:class="{'is-invalid': $v.dc_id.$anyError}">
					<option selected value="0">Select datacenter</option>
					<option :value="dc.id" v-for="dc in datacenters" :key="dc.id">{{ dc.dc }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputEsxname" class="form-label">Name</label>
				<input type="text" class="form-control" id="inputEsxname" v-model="esxname" :disabled="loading"
							 :class="{'is-invalid': $v.esxname.$anyError}">
			</div>
			<div class="mb-3">
				<select class="form-select" v-model="ip_id" :disabled="loading"
								:class="{'is-invalid': $v.ip_id.$anyError}">
					<option selected value="0">Select IP</option>
					<option :value="ip.id" v-for="ip in ips" :key="ip.id">{{ ip.ip }}</option>
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
					<option selected value="0">Select Net</option>
					<option :value="net.id" v-for="net in nets" :key="net.id">{{ net.net }}</option>
				</select>
			</div>
			<button type="submit" class="btn btn-primary" @click="save" :disabled="loading">
				<span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
				Save
			</button>
			<div class="alert alert-danger mt-3" role="alert" v-if="error">
				{{ error }}
			</div>
		</form>
	</div>
</template>

<script>
import {required, minLength, maxLength, minValue} from 'vuelidate/lib/validators';

import {mapGetters} from "vuex";

export default {
	name: "create",
	data() {
		return {
			dc_id: 0,
			esxname: '',
			ip_id: 0,
			info: '',
			net_id: 0,
			loading: false,
			error: '',
		}
	},
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
	},
	validations: {
		dc_id: {required, minValue: minValue(1)},
		esxname: {required, minLength: minLength(3), maxLength: maxLength(200)},
		ip_id: {required, minValue: minValue(1)},
		info: {required, minLength: minLength(3), maxLength: maxLength(200)},
		net_id: {required, minValue: minValue(1)},
	},
	methods: {
		save() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('saveEsxi', {
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
		]),
	}
}
</script>

<style scoped>

</style>