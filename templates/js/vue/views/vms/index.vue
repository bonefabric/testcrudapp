<template>
	<div>
		<button class="btn btn-dark mb-3" @click="$router.push({name: 'vmsCreate'})">Create new</button>
		<table class="table table-dark table-hover" v-if="!loading && !error.length">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Name</th>
				<th scope="col">ESXI</th>
				<th scope="col">IP</th>
				<th scope="col">Net</th>
				<th scope="col">Attributes</th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="vm in vms" :key="vm.id">
				<td>{{ vm.id }}</td>
				<td>{{ vm.vmname }}</td>
				<td>{{ vm.esxname }}</td>
				<td>{{ vm.ip }}</td>
				<td>{{ vm.net }}</td>
				<td>{{ vm.attr }}</td>
				<td>
					<i class="bi bi-pencil" style="cursor: pointer"
						 @click="$router.push({name: 'vmsEdit', params: {id: vm.id}})"></i>&nbsp;
					<i class="bi bi-trash" style="cursor: pointer" @click="deleteVm(vm.id)"></i>
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
		this.$store.dispatch('loadVms')
				.catch(e => this.error = e)
				.finally(() => this.loading = false);
	},
	computed: {
		...mapGetters([
			'vms'
		]),
	},
	methods: {
		deleteVm(id) {
			this.loading = true;
			this.error = '';
			this.$store.dispatch('deleteVm', id)
					.then(() => {
						this.loading = true;
						this.error = '';
						this.$store.dispatch('loadVms')
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