<template>
  <div class="dashboard-container">
    <component :is="currentView" />
  </div>
</template>

<script>
import viewTolerancia from './components/tolerancia'
import viewIndicesDane from './components/indicesDane'

export default {
  name: 'EditForm',
  components: { viewTolerancia, viewIndicesDane },
	data() {
		return {
			// currentView: 'defaultDashboard'
		}
	},
	created() {
		let route = this.$route //obtenemos los parametros de la URL
		let tempRoute = Object.assign({}, route) //creamos un objeto de la URL
		let view = tempRoute.fullPath //obtenemos la URL de la vista
		console.log(view)
		
		if (view == '/tolerancia/nivel-tolerancia') {
			this.currentView = 'viewTolerancia'
		}
		else if (view == '/indices/indices-dane') {
			this.currentView = 'viewIndicesDane'
		}
	}
}
</script>