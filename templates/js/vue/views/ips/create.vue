<template>
	<div>
		<form class="col-8 offset-2 mt-3" @submit.prevent>
			<div class="mb-3">
				<select class="form-select" v-model="net_id" :disabled="loading"
								:class="{'is-invalid': $v.net_id.$anyError}">
					<option selected value="0">Select net</option>
					<option :value="net.id" v-for="net in nets" :key="net.id">{{ net.net }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputIp" class="form-label">Ip</label>
				<input type="text" class="form-control" id="inputIp" v-model="ip" :disabled="loading"
							 :class="{'is-invalid': $v.ip.$anyError}">
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
			ip: '0.0.0.0',
			net_id: 0,
			loading: false,
			error: '',
		}
	},
	beforeMount() {
		if (!this.netsLoaded) {
			this.loading = true;
			this.$store.dispatch('loadNets')
					.catch(e => this.error = e)
					.finally(() => this.loading = false)
		}
	},
	validations: {
		ip: {required, minLength: minLength(7), maxLength: maxLength(15)},
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
			this.$store.dispatch('saveIp', {
				ip: this.ip,
				net_id: this.net_id,
			})
					.then(() => this.$router.push({name: 'ips'}))
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	},
	computed: {
		...mapGetters([
			'nets',
			'netsLoaded'
		]),
	}
}
</script>

<style scoped>

</style>