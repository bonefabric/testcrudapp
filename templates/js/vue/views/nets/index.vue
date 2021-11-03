<template>
	<div>
		<button class="btn btn-dark mb-3" @click="$router.push({name: 'netsCreate'})">Create new</button>
		<table class="table table-dark table-hover" v-if="!loading && !error.length">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Datacenter</th>
				<th scope="col">Net</th>
				<th scope="col">Mask</th>
				<th scope="col">Gateway</th>
				<th scope="col">Comment</th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="net in nets" :key="net.id">
				<td>{{ net.id }}</td>
				<td>{{ net.dc}}</td>
				<td>{{ net.net }}</td>
				<td>{{ net.mask }}</td>
				<td>{{ net.gateway }}</td>
				<td>{{ net.comment }}</td>
				<td>
					<i class="bi bi-pencil" style="cursor: pointer"
						 @click="$router.push({name: 'netsEdit', params: {id: net.id}})"></i>&nbsp;
					<i class="bi bi-trash" style="cursor: pointer" @click="deleteNet(net.id)"></i>
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
		this.$store.dispatch('loadNets')
				.catch(e => this.error = e)
				.finally(() => this.loading = false);
	},
	computed: {
		...mapGetters([
			'nets'
		]),
	},
	methods: {
		deleteNet(id) {
			this.loading = true;
			this.error = '';
			this.$store.dispatch('deleteNet', id)
					.then(() => {
						this.loading = true;
						this.error = '';
						this.$store.dispatch('loadNets')
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