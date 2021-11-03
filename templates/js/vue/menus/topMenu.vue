<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container flex-row justify-content-between">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<router-link :to="{name: 'index'}" class="nav-link" active-class="active" exact>Overview</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{name: 'datacenters'}" class="nav-link" active-class="active" exact>Datacenters
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{name: 'nets'}" class="nav-link" active-class="active" exact>Nets</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{name: 'ips'}" class="nav-link" active-class="active" exact>IPs</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{name: 'esxis'}" class="nav-link" active-class="active" exact>ESXIs</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{name: 'vms'}" class="nav-link" active-class="active" exact>VMs</router-link>
				</li>
			</ul>
			<a href="" class="nav-link" @click.prevent="logout">Log out</a>
		</div>
	</nav>
</template>

<script>
export default {
	name: "topMenu",
	methods: {
		logout() {
			this.$store.dispatch('logout');
			this.$router.push({name: 'login'});
		}
	}
}
</script>

<style scoped>

</style>