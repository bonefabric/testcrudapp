<template>
	<div>
		<button class="btn btn-dark mb-3" @click="$router.push({name: 'ipsCreate'})">Create new</button>
		<table class="table table-dark table-hover" v-if="!loading && !error.length">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">IP</th>
				<th scope="col">Net</th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="ip in ips" :key="ip.id">
				<td>{{ ip.id }}</td>
				<td>{{ ip.ip }}</td>
				<td>{{ ip.net_name }}</td>
				<td>
					<i class="bi bi-pencil" style="cursor: pointer"
						 @click="$router.push({name: 'ipsEdit', params: {id: ip.id}})"></i>&nbsp;
					<i class="bi bi-trash" style="cursor: pointer" @click="deleteIp(ip.id)"></i>
				</td>
			</tr>
			</tbody>
		</table>
		<div v-if="loading" class="mt-3">
			Loading...
		</div>
		<div class="alert alert-danger mt-3" role="alert" v-if="error.length">
			{{ error }}
		</div>
	</div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "index",
	data() {
		return {
			loading: false,
			error: '',
		}
	},
	mounted() {
		this.loading = true;
		this.error = '';
		this.$store.dispatch('loadIps')
				.catch(e => this.error = e)
				.finally(() => this.loading = false);
	},
	computed: {
		...mapGetters([
			'ips'
		]),
	},
	methods: {
		deleteIp(id) {
			this.loading = true;
			this.error = '';
			this.$store.dispatch('deleteIp', id)
					.then(() => {
						this.loading = true;
						this.error = '';
						this.$store.dispatch('loadIps')
								.catch(e => this.error = e)
								.finally(() => this.loading = false);
					})
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		},
	}
}
</script>

<style scoped>

</style>