<template>
	<div>
		<topMenu v-if="$store.getters.isAuthorized"/>
		<router-view class="container mt-3"/>
	</div>
</template>

<script>
import topMenu from "./menus/topMenu";

export default {
	name: "Application",
	beforeMount() {
		this.$store.dispatch('init');
		this.$router.beforeEach((to, from, next) => {
			if (!this.$store.getters.isAuthorized && to.path !== '/login') {
				next({name: 'login'});
				return;
			}
			if (this.$store.getters.isAuthorized && to.path === '/login') return;
			if (to.meta.title) document.title = to.meta.title;
			next()
		});
		if (!this.$store.getters.isAuthorized && this.$route.path !== '/login') this.$router.push({name: 'login'});
		if (this.$store.getters.isAuthorized && this.$route.name !== 'index') this.$router.push({name: 'index'});
	},
	components: {
		topMenu,
	},
}
</script>

<style scoped>

</style>