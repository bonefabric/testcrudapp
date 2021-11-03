<template>
	<div>
		<button class="btn btn-dark mb-3" @click="$router.push({name: 'datacentersCreate'})">Create new</button>
		<table class="table table-dark table-hover" v-if="!loading && !error.length">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Name</th>
				<th scope="col">Login</th>
				<th scope="col">Password</th>
				<th scope="col">Comment</th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="datacenter in datacenters" :key="datacenter.id">
				<td>{{ datacenter.id }}</td>
				<td>{{ datacenter.dc }}</td>
				<td>{{ datacenter.login }}</td>
				<td>{{ datacenter.pass }}</td>
				<td>{{ datacenter.comment }}</td>
				<td>
					<i class="bi bi-pencil" style="cursor: pointer" @click="$router.push({name: 'datacentersEdit', params: {id: datacenter.id}})"></i>&nbsp;
					<i class="bi bi-trash" style="cursor: pointer" @click="deleteDc(datacenter.id)"></i>
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
		this.$store.dispatch('loadDatacenters')
				.catch(e => this.error = e)
				.finally(() => this.loading = false);
	},
	computed: {
		...mapGetters([
			'datacenters'
		]),
	},
	methods: {
		deleteDc(id) {
			this.loading = true;
			this.error = '';
			this.$store.dispatch('deleteDatacenter', id)
					.then(() => {
						this.loading = true;
						this.error = '';
						this.$store.dispatch('loadDatacenters')
								.catch(e => this.error = e)
								.finally(() => this.loading = false);
					})
					.catch(e => this.error = e)
					.finally(() => this.loading = false);
		}
	}
}
</script>

<style scoped>

</style>