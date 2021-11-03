<template>
	<div>
		<form class="col-8 offset-2 mt-3" @submit.prevent>
			<div class="mb-3">
				<select class="form-select" v-model="datacenter" :disabled="loading"
								:class="{'is-invalid': $v.datacenter.$anyError}">
					<option selected value="0">Select datacenter</option>
					<option :value="dc.id" v-for="dc in datacenters" :key="dc.id">{{ dc.dc }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputNet" class="form-label">Net</label>
				<input type="text" class="form-control" id="inputNet" v-model="net" :disabled="loading"
							 :class="{'is-invalid': $v.net.$anyError}">
			</div>
			<div class="mb-3">
				<label for="inputMask" class="form-label">Mask</label>
				<input type="text" class="form-control" id="inputMask" v-model="mask" :disabled="loading"
							 :class="{'is-invalid': $v.mask.$anyError}">
			</div>
			<div class="mb-3">
				<label for="inputGateway" class="form-label">Gateway</label>
				<input type="text" class="form-control" id="inputGateway" v-model="gateway" :disabled="loading"
							 :class="{'is-invalid': $v.gateway.$anyError}">
			</div>
			<div class="mb-3">
				<label for="inputComment" class="form-label">Comment</label>
				<input type="text" class="form-control" id="inputComment" v-model="comment" :disabled="loading"
							 :class="{'is-invalid': $v.comment.$anyError}">
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
			datacenter: 0,
			net: '',
			mask: '255.255.255.255',
			gateway: '',
			comment: '',
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
	},
	validations: {
		datacenter: {required, minValue: minValue(1)},
		net: {required, minLength: minLength(3), maxLength: maxLength(50)},
		mask: {required, minLength: minLength(7), maxLength: maxLength(15)},
		gateway: {required, minLength: minLength(3), maxLength: maxLength(200)},
		comment: {maxLength: maxLength(200)}
	},
	methods: {
		save() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('saveNet', {
				net_dc_id: this.datacenter,
				net_name: this.net,
				net_mask: this.mask,
				net_gateway: this.gateway,
				net_comment: this.comment,
			})
					.then(() => this.$router.push({name: 'nets'}))
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	},
	computed: {
		...mapGetters([
			'datacenters',
			'datacentersLoaded'
		]),
	}
}
</script>

<style scoped>

</style>