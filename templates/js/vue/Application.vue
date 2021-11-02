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
	mounted() {
		this.$store.dispatch('init');
		this.$router.beforeEach((to, from, next) => {
			if (!this.$store.getters.isAuthorized && to.path !== '/login') {
				next({name: 'login'});
				return;
			}
			if (this.$store.getters.isAuthorized && to.path === '/login') return;
			next()
		});
		if (!this.$store.getters.isAuthorized && this.$route.path !== '/login') this.$router.push({name: 'login'});
		if (this.$route.meta.title) document.title = this.$route.meta.title;
	},
	components: {
		topMenu,
	},
}
</script>

<style scoped>

</style>