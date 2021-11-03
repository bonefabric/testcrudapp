<template>
	<div>
		<form class="col-8 offset-2" @submit.prevent>
			<div class="mb-3">
				<label for="inputDatacenter" class="form-label">Datacenter</label>
				<input type="text" class="form-control" id="inputDatacenter" v-model="datacenter" :disabled="loading">
			</div>
			<div class="mb-3">
				<label for="inputEmail" class="form-label">Email</label>
				<input type="email" class="form-control" id="inputEmail" v-model="email" :disabled="loading">
			</div>
			<div class="mb-3">
				<label for="inputPassword" class="form-label">Password</label>
				<input type="password" class="form-control" id="inputPassword" v-model="password" :disabled="loading">
			</div>
			<div class="mb-3">
				<label for="inputComment" class="form-label">Comment</label>
				<input type="text" class="form-control" id="inputComment" v-model="comment" :disabled="loading">
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
export default {
	name: "edit",
	beforeMount() {
		const dc = this.$store.getters.datacenters.find(dc => dc.id === this.$route.params.id);
		this.datacenter = dc.dc;
		this.email = dc.login;
		this.password = dc.pass;
		this.comment = dc.comment;
	},
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
	methods: {
		update() {
			this.loading = true;
			this.error = '';
			this.$store.dispatch('updateDatacenter', {
				id: this.$route.params.id,
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