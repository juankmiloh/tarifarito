<template>
  <div class="components-container" style="border: 0px solid red; margin: 0;">
		<el-row>
			<el-col :span="24">
				<div style="border: 2px solid #C0C4CC; padding: 1%; padding-bottom: 0%;">
					<el-row>
						<el-col :span="2" style="border: 0px solid; color: black;">		
							<div>
								<img v-if="logo" :src="logo" width="100" height="auto">
							</div>																
						</el-col>
						<el-col :span="22" style="border: 0px solid; padding-left: 2%;">
							<el-row>
								<el-col :span="24" style="border: 0px solid red; text-align: center;">
									<aside>
										<span style="color: black; font-size: 170%;"><b>DIRECCIÓN TÉCNICA DE GESTIÓN DE ENERGÍA</b></span>
									</aside>
								</el-col>
								<el-col :span="24" style="border: 0px solid red; text-align: center;">          
									<aside>
										<span style="font-size: 120%;"><b>{{ name }}</b></span>
									</aside>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<br>
				<div style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 20em;">
					<el-row>
						<el-col :span="24" style="border: 0px solid; color: black; padding: 1%;">	
							<el-row style="font-weight: bold; padding-bottom: 1%;">
								<el-col :span="8">
									<span>CONCEPTO</span>
								</el-col>
								<el-col :span="8">
									<span>UNIDAD</span>
								</el-col>
								<el-col :span="8">
									<span>VALORES</span>
								</el-col>
							</el-row>	
							<el-collapse accordion>
								<el-collapse-item name="1">
									<template slot="title">
										Demanda Comercial Regulada (DCR)<i class="header-icon el-icon-information"></i>
									</template>
									<el-row>
										<el-col :span="8" style="padding-left: 2%;">
											<span>Fracción DCR atendida con compras en contratos (Qc)</span>
										</el-col>
										<el-col :span="8">
											<span>kWh</span>
										</el-col>
										<el-col :span="8">
											<el-input type="number" placeholder="" v-model="input" style="width: 50%;"></el-input>
										</el-col>
									</el-row>									
								</el-collapse-item>
								<el-collapse-item title="Costo promedio de la energía comprada en contratos (Pc)" name="2">
									<el-row>
										<el-col :span="8" style="padding-left: 2%;">
											<span>Fracción DCR atendida con compras en bolsa (Qb)</span>
										</el-col>
										<el-col :span="8">
											<span>kWh</span>
										</el-col>
										<el-col :span="8">
											<el-input type="number" placeholder="" v-model="input" style="width: 50%;"></el-input>
										</el-col>
									</el-row>	
								</el-collapse-item>
								<el-collapse-item title="Costo promedio ponderado de la energía comprada en bolsa (Pb)" name="3">
									<el-row>
										<el-col :span="8" style="padding-left: 2%;">
											<span>Fracción demandada comercial atendida con AGD (Qagd)</span>
										</el-col>
										<el-col :span="8">
											<span>kWh</span>
										</el-col>
										<el-col :span="8">
											<el-input type="number" placeholder="" v-model="input" style="width: 50%;"></el-input>
										</el-col>
									</el-row>	
								</el-collapse-item>
								<el-collapse-item title="Costo promedio ponderado por energía (Mc) aplicado" name="4">
									<el-row>
										<el-col :span="8" style="padding-left: 2%;">
											<span>Factor de ajuste AJ</span>
										</el-col>
										<el-col :span="8">
											<span>kWh</span>
										</el-col>
										<el-col :span="8">
											<el-input type="number" placeholder="" v-model="input" style="width: 50%;"></el-input>
										</el-col>
									</el-row>	
									<el-row>
										<el-col :span="8" style="padding-left: 2%;">
											<span>Alfa</span>
										</el-col>
										<el-col :span="8">
											<span>kWh</span>
										</el-col>
										<el-col :span="8">
											<el-input type="number" placeholder="" v-model="input" style="width: 50%;"></el-input>
										</el-col>
									</el-row>	
								</el-collapse-item>
							</el-collapse>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
		<el-row style="padding-top: 1%;">
			<el-col :span="18" style="border: 0px solid yellow;">
				<span>Componente publicado $/kWh</span>
				<el-input type="number" placeholder="" v-model="input" style="width: 30%;"></el-input>
			</el-col>
			<el-col :span="4" style="border: 0px solid blue; text-align: right; padding-right: 1%;">
				<el-button type="primary" @click="functionConfirmar">Calcular</el-button>
			</el-col>
			<el-col :span="2" style="border: 0px solid red; text-align: right;">
				<el-button type="primary" @click="functionConfirmar">Verificado</el-button>
			</el-col>
		</el-row>		
		<el-row style="padding-top: 0%;">
			<el-col :span="24" style="border: 0px solid yellow;">
				<span>Fórmula componente</span>
				<el-tooltip class="item" effect="dark" content="Fórmula" placement="top-start">							
					<i class="el-icon-info" style="color: #304156;"></i>
				</el-tooltip>
			</el-col>
		</el-row>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import BackToTop from '@/components/BackToTop'
	import logTarifarito from "../../../../../../assets/logo_buho.png"

  export default {
		name: 'viewG',
		components: { BackToTop },
		data() {
			return {
				logo: logTarifarito,
				myBackToTopStyle: {
					right: '50px',
					bottom: '50px',
					width: '40px',
					height: '40px',
					'border-radius': '4px',
					'line-height': '45px',
					background: '#e7eaf1'
				},
				input: ''
			}
		},
		methods: {
			
		},
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
		created() {

		}
	}
</script>

<style lang="scss">
	.el-collapse-item__content{
		padding-bottom: 1.5%;
	}
</style>