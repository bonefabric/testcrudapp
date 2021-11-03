<template>
	<div>
		<form class="col-8 offset-2" @submit.prevent>
			<div class="mb-3">
				<label for="inputDatacenter" class="form-label">Datacenter</label>
				<input type="text" class="form-control" id="inputDatacenter" v-model="datacenter"
							 :class="{'is-invalid': $v.datacenter.$anyError}" :disabled="loading">
			</div>
			<div class="mb-3">
				<label for="inputEmail" class="form-label">Email</label>
				<input type="email" class="form-control" id="inputEmail" v-model="email"
							 :class="{'is-invalid': $v.email.$anyError}" :disabled="loading">
			</div>
			<div class="mb-3">
				<label for="inputPassword" class="form-label">Password</label>
				<input type="password" class="form-control" id="inputPassword" v-model="password"
							 :class="{'is-invalid': $v.password.$anyError}" :disabled="loading">
			</div>
			<div class="mb-3">
				<label for="inputComment" class="form-label">Comment</label>
				<input type="text" class="form-control" id="inputComment" v-model="comment"
							 :class="{'is-invalid': $v.comment.$anyError}" :disabled="loading">
			</div>
			<button type="submit" class="btn btn-primary" @click="save" :disabled="loading">
				<span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
				Save
			</button>
			<div class="alert alert-danger mt-3" role="alert" v-if="error.length > 0">
				{{ error }}
			</div>
		</form>
	</div>
</template>

<script>
// import {required, minLength, maxLength, email} from 'vuelidate/lib/validators';

export default {
	name: "create",
	data() {
		return {
			datacenter: '',
			email: '',
			password: '',
			comment: '',
			loading: false,
			error: '',
		}
	},
	validations: {
		//TODO validations
		datacenter: {},
		email: {},
		password: {},
		comment: {},
	},
	methods: {
		save() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('saveDatacenter', {
				dc_name: this.datacenter,
				dc_email: this.email,
				dc_pass: this.password,
				dc_comment: this.comment,
			})
					.then(() => this.$router.push({name: 'datacenters'}))
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	}
}
</script>

<style scoped>

</style>