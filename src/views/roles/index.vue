<template>
  <div>
    <component :is="currentRole" />
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import viewGestor from './gestor'
	import viewRevisor from './revisor'

	export default {
		name: 'menuRoles',
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
			// console.log(this.roles)
			if (this.roles.includes('gestor')) {
				this.currentRole = 'viewGestor'
			}
			if (this.roles.includes('revisor')) {
				this.currentRole = 'viewRevisor'
			}
		}
	}
</script>
