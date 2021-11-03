<template>
	<form class="col-4 offset-4 mt-5" @submit.prevent>
		<div class="mb-3">
			<label for="inputEmail" class="form-label">Email address</label>
			<input type="email" class="form-control" id="inputEmail" v-model="email" :disabled="loading"
						 :class="{'is-invalid': $v.email.$anyError}">
		</div>
		<div class="mb-3">
			<label for="inputPassword" class="form-label">Password</label>
			<input type="password" class="form-control" id="inputPassword" v-model="password" :disabled="loading"
						 :class="{'is-invalid': $v.password.$anyError}">
		</div>
		<button type="submit" class="btn btn-primary w-25" :disabled="loading" @click="login">
			<span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
			Log in
		</button>
		<div class="alert alert-danger mt-3" role="alert" v-if="error">
			{{ error }}
		</div>
	</form>
</template>

<script>
import {required, email, minLength, maxLength} from 'vuelidate/lib/validators';

export default {
	name: "login",
	data() {
		return {
			email: '',
			password: '',
			loading: false,
			error: '',
		}
	},
	methods: {
		login() {
			this.error = '';
			if (this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
			this.loading = true;
			this.$store.dispatch('login', {email: this.email, password: this.password})
					.catch(e => this.error = e)
					.finally(() => {
						this.loading = false;
						if (this.$store.getters.isAuthorized) this.$router.push({name: 'index'});
					});
		}
	},
	validations: {
		email: {required, email},
		password: {required, minLength: minLength(6), maxLength: maxLength(200)}
	}
}
</script>

<style scoped>

</style>