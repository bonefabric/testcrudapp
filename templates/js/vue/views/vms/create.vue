<template>
	<div>
		<form class="col-8 offset-2 mt-3" @submit.prevent>
			<div class="mb-3">
				<label for="inputVmname" class="form-label">Name</label>
				<input type="text" class="form-control" id="inputVmname" v-model="vmname" :disabled="loading"
							 :class="{'is-invalid': $v.vmname.$anyError}">
			</div>
			<div class="mb-3">
				<select class="form-select" v-model="esx_id" :disabled="loading"
								:class="{'is-invalid': $v.esx_id.$anyError}">
					<option selected value="0">Select ESXI</option>
					<option :value="esxi.id" v-for="esxi in esxis" :key="esxi.id">{{ esxi.esxname }}</option>
				</select>
			</div>
			<div class="mb-3">
				<select class="form-select" v-model="ip_id" :disabled="loading"
								:class="{'is-invalid': $v.ip_id.$anyError}">
					<option selected value="0">Select IP</option>
					<option :value="ip.id" v-for="ip in ips" :key="ip.id">{{ ip.ip }}</option>
				</select>
			</div>
			<div class="mb-3">
				<select class="form-select" v-model="net_id" :disabled="loading"
								:class="{'is-invalid': $v.net_id.$anyError}">
					<option selected value="0">Select Net</option>
					<option :value="net.id" v-for="net in nets" :key="net.id">{{ net.net }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputAttr" class="form-label">Attributes</label>
				<input type="text" class="form-control" id="inputAttr" v-model="attr" :disabled="loading"
							 :class="{'is-invalid': $v.attr.$anyError}">
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
			esx_id: 0,
			ip_id: 0,
			net_id: 0,
			attr: '',
			vmname: '',
			loading: false,
			error: '',
		}
	},
	beforeMount() {
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
		if (!this.esxisLoaded) {
			this.loading = true;
			this.$store.dispatch('loadEsxis')
					.catch(e => this.error = e)
					.finally(() => this.loading = false)
		}
	},
	validations: {
		esx_id: {required, minValue: minValue(1)},
		ip_id: {required, minValue: minValue(1)},
		net_id: {required, minValue: minValue(1)},
		attr: {required, minLength: minLength(3), maxLength: maxLength(200)},
		vmname: {required, minLength: minLength(3), maxLength: maxLength(200)},
	},
	methods: {
		save() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('saveVm', {
				esx_id: this.esx_id,
				ip_id: this.ip_id,
				net_id: this.net_id,
				attr: this.attr,
				vmname: this.vmname,
			})
					.then(() => this.$router.push({name: 'vms'}))
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	},
	computed: {
		...mapGetters([
			'esxis',
			'esxisLoaded',
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