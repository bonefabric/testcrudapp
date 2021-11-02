<template>
	<form class="col-4 offset-4 mt-5" @submit.prevent>
		<div class="mb-3">
			<label for="inputEmail" class="form-label">Email address</label>
			<input type="email" class="form-control" id="inputEmail" v-model="email" :disabled="loading">
		</div>
		<div class="mb-3">
			<label for="inputPassword" class="form-label">Password</label>
			<input type="password" class="form-control" id="inputPassword" v-model="password" :disabled="loading">
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
			this.loading = true;
			this.error = '';
			this.$store.dispatch('login', {email: this.email, password: this.password})
					.catch(e => this.error = e)
					.finally(() => {
						this.loading = false;
						if (this.$store.getters.isAuthorized) this.$router.push({name: 'index'});
					});
		}
	}
}
</script>

<style scoped>

</style>