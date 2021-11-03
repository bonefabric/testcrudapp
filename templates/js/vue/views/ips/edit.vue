<template>
	<div>
		<form class="col-8 offset-2" @submit.prevent>
			<div class="mb-3">
				<select class="form-select" v-model="net_id" :disabled="loading"
								:class="{'is-invalid': $v.net_id.$anyError}">
					<option :value="net.id" v-for="net in nets" :key="net.id" :selected="net_id === net.id">{{ net.net }}</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="inputIp" class="form-label">IP</label>
				<input type="text" class="form-control" id="inputIp" v-model="ip" :disabled="loading"
							 :class="{'is-invalid': $v.ip.$anyError}">
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
		if (!this.netsLoaded) {
			this.loading = true;
			this.$store.dispatch('loadNets')
					.catch(e => this.error = e)
					.finally(() => this.loading = false)
		}
		const ip = this.$store.getters.ips.find(ip => ip.id === this.$route.params.id);
		if (ip === undefined) {
			this.$router.push({name: 'ips'});
			return;
		}
		this.ip = ip.ip;
		this.net_id = ip.net_id;
	},
	data() {
		return {
			ip: '',
			net_id: 0,
			loading: false,
			error: '',
		}
	},
	validations: {
		ip: {required, minLength: minLength(3), maxLength: maxLength(15)},
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
			this.$store.dispatch('updateIp', {
				id: this.$route.params.id,
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
			'netsLoaded',
		])
	}
}
</script>

<style scoped>

</style>