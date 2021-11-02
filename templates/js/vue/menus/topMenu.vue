<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<router-link :to="{name: 'index'}" class="nav-link" active-class="active" exact>Overview</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{name: 'datacenters'}" class="nav-link" active-class="active" exact>Datacenters</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
	name: "topMenu"
}
</script>

<style scoped>

</style>