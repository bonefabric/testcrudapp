<template>
	<div>
		<button class="btn btn-dark mb-3" @click="$router.push({name: 'esxisCreate'})">Create new</button>
		<table class="table table-dark table-hover" v-if="!loading && !error.length">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Datacenter</th>
				<th scope="col">Name</th>
				<th scope="col">IP</th>
				<th scope="col">info</th>
				<th scope="col">Net</th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="esxi in esxis" :key="esxi.id">
				<td>{{ esxi.id }}</td>
				<td>{{ esxi.dc }}</td>
				<td>{{ esxi.esxname }}</td>
				<td>{{ esxi.ip }}</td>
				<td>{{ esxi.info }}</td>
				<td>{{ esxi.net }}</td>
				<td>
					<i class="bi bi-pencil" style="cursor: pointer"
						 @click="$router.push({name: 'esxisEdit', params: {id: esxi.id}})"></i>&nbsp;
					<i class="bi bi-trash" style="cursor: pointer" @click="deleteEsxi(esxi.id)"></i>
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
		this.$store.dispatch('loadEsxis')
				.catch(e => this.error = e)
				.finally(() => this.loading = false);
	},
	computed: {
		...mapGetters([
			'esxis'
		]),
	},
	methods: {
		deleteEsxi(id) {
			this.loading = true;
			this.error = '';
			this.$store.dispatch('deleteEsxi', id)
					.then(() => {
						this.loading = true;
						this.error = '';
						this.$store.dispatch('loadEsxis')
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