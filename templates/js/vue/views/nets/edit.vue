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
				<label for="inputNet" class="form-label">Net</label>
				<input type="text" class="form-control" id="inputNet" v-model="name" :disabled="loading"
							 :class="{'is-invalid': $v.name.$anyError}">
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
		const net = this.$store.getters.nets.find(net => net.id === this.$route.params.id);
		if (net === undefined) {
			this.$router.push({name: 'nets'});
			return;
		}
		this.dc = net.dc;
		this.dc_id = net.dc_id;
		this.name = net.net;
		this.mask = net.mask;
		this.gateway = net.gateway;
		this.comment = net.comment;
	},
	data() {
		return {
			dc: '',
			dc_id: 0,
			name: '',
			mask: '',
			gateway: '',
			comment: '',
			loading: false,
			error: '',
		}
	},
	validations: {
		dc_id: {required, minValue: minValue(1)},
		name: {required, minLength: minLength(3), maxLength: maxLength(50)},
		mask: {required, minLength: minLength(7), maxLength: maxLength(15)},
		gateway: {required, minLength: minLength(3), maxLength: maxLength(200)},
		comment: {maxLength: maxLength(200)}
	},
	methods: {
		update() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('updateNet', {
				id: this.$route.params.id,
				dc_id: this.dc_id,
				net: this.name,
				mask: this.mask,
				gateway: this.gateway,
				comment: this.comment,
			})
					.then(() => this.$router.push({name: 'nets'}))
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	},
	computed: {
		...mapGetters([
			'datacenters',
			'datacentersLoaded',
		])
	}
}
</script>

<style scoped>

</style>