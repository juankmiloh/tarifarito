<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import viewGestor from './gestor'
	import viewRevisor from './revisor'

	export default {
		name: 'Dashboard',
		components: { viewGestor, viewRevisor },
		data() {
			return {
				// currentRole: 'adminDashboard'
				// currentRole: 'defaultDashboard'
			}
		},
		computed: {
			...mapGetters([
				'roles' //obtiene el rol logueado
			])
		},
		created() {
			if (this.roles.includes('gestor')) {
				// console.log(this.roles)
				this.currentRole = 'viewGestor'
			}
			if (this.roles.includes('revisor')) {
				// console.log(this.roles)
				this.currentRole = 'viewRevisor'
			}
		}
	}
</script>
