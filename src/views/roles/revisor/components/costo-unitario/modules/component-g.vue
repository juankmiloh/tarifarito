<template>
  <div class="components-container" style="border: 0px solid red; margin: 0;">
		<el-row>
			<el-col :span="24">
				<div style="border: 2px solid #C0C4CC; padding: 1%; padding-bottom: 0%; background-color: white; border-radius: 5px;">
					<el-row>
						<el-col :span="2" style="border: 0px solid; color: black;">		
							<div style="text-align: center;">
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

				<button @click="showScores">Show scores</button>
				<table>
					<thead>
						<tr>
							<th>Local</th>
							<th>Visitante</th>
							<th>Resultado</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="match in matches" :key="match.key">
							<td>{{ match.local }}</td>
							<td>{{ match.visitor }}</td>
							<td>
								<input v-model="scores[match.key].scores[0]" type="number" min="0" />
								<input v-model="scores[match.key].scores[1]" type="number" min="0" />
							</td>
						</tr>
					</tbody>
				</table>

				<!-- <div style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 43em; background-color: white; border-radius: 5px;"> valor pantalla super -->
				<div style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 20em; background-color: white; border-radius: 5px;">
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
							{{valoresDiferencia}}
							<!-- <el-input 
								type="number"
								v-model=inputDCR1
								style="width: 50%;"/> -->
							
							<el-collapse accordion>
								<el-collapse-item v-for="item in components" :key="item.title" :title="item.title" name="1">
									<el-row v-for="value in item.data" :key="value.campo">
										<el-col :span="8" style="padding-left: 2%;">
											<span>{{value.concepto}}</span>
										</el-col>
										<el-col :span="8">
											<span>{{value.unidad}}</span>
										</el-col>
										<el-col :span="8">
											<el-input
													type="number" 
													:placeholder=value.input.placeholder
													style="width: 50%;"/>
											<span v-for="input in value.inputs" :key="input.modelo">
												<el-input-number
													v-if="valoresDiferencia === input.show"
													type="number"
													:placeholder=input.placeholder
													style="width: 50%;"/>
											</span>
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
			<el-col :span="15" style="border: 0px solid yellow;">
				<span>Componente publicado $/kWh</span>
				<el-input type="number" placeholder="" v-model="input" style="width: 30%; margin-left: 1%;"></el-input>
			</el-col>
			<el-col :span="9" style="text-align: right; border: 0px solid;">
					<el-button type="primary" @click="functionCalcular">Calcular</el-button>
					<el-button type="primary" @click="functionVerificar">Verificado</el-button>
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
	import { type } from 'os'

  export default {
		name: 'viewG',
		components: { BackToTop },
		data() {
			return {
				logo: logTarifarito,
				valoresDiferencia: false,
				components: [
					{
						title: 'Demanda Comercial Regulada',
						data: [ 
										{ campo: '16', 
											concepto: 'Demanda Comercial Regulada', 
											unidad: 'kWh', 
											type: 'number', 
											placeholder: 'Valor', 
											input: { modelo: 'input1', placeholder: 'input1', show: true },
											inputs: [															
																{ modelo: 'input2', placeholder: 'input2', show: true },
																{ modelo: 'input3', placeholder: 'input3', show: true },
														  ], 
											model2: 'inputDCR2',
											model3: 'inputDCR3'
										},
										// { campo: '12', concepto: 'Demanda Real Regulada', unidad: 'kWh', inputValor: 0 },
										// { campo: '13', concepto: 'Ajuste Demanda Real Regulada', unidad: 'kWh', inputValor: 0 },
										// { campo: '14', concepto: 'Pérdida Real de la Demanda Regulada', unidad: 'kWh', inputValor: 0 },
										// { campo: '15', concepto: 'Ajuste Pérdida Real de la Demanda Regulada', unidad: 'kWh', inputValor: 0 },
									] 
					},
				],
				// inputDCR1: 1,
				myBackToTopStyle: {
					right: '50px',
					bottom: '50px',
					width: '40px',
					height: '40px',
					'border-radius': '4px',
					'line-height': '45px',
					background: '#e7eaf1'
				},
				input: '',
				matches: [
					{
						key: 'avcn2r',
						local: 'Barcelona',
						visitor: 'Sp Gijón'
					},
					{
						key: 'clm7rv',
						local: 'Real Madrid',
						visitor: 'Las Palmas'
					},
					{
						key: '2kd034',
						local: 'Liverpool',
						visitor: 'Arsenal'
					},
					{
						key: 'pmkd29',
						local: 'Juventus',
						visitor: 'Sampdoria'
					}
				],
				scores: {}
			}
		},
		methods: {
			showScores() {
				console.log(this.scores);
			},
			functionCalcular() {
				// console.log('functionCalcular');
				this.valoresDiferencia = true;
			},
			functionVerificar() {
				// console.log('functionVerificar');
				this.valoresDiferencia = false;
			},

		},
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
		created() {
			this.matches.forEach(match => {
				this.scores[match.key] = {
					local: match.local,
					visitor: match.visitor,
					scores: [null, null]
				}
			})
		},
		// props(){
		// 	// title: { type:str }
		// }
	}
</script>

<style lang="scss">
	.el-collapse-item__content{
		padding-bottom: 1.5%;
	}

	button {
		background-color: #009BFF;
		border: 1px solid #009BFF;
		border-radius: 2px;
		color: #fff;
		font-family: 'Noto Sans';
		font-size: 14px;
		height: 35px;
		padding: 0 12px;
	}

	table {
		border-collapse: collapse;
		margin-top: 20px;
		width: 100%;
	}

	table thead {
		border-bottom: 3px solid #eee;
	}

	table th,
	table td {
		color: #555;
		font-family: 'Noto Sans';
		font-size: 14px;
		padding: 15px;
		text-align: center;
	}

	table tbody tr:nth-child(odd) {
		background-color: #f9f9f9;
	}

	table tr:not(:last-of-type) {
		border-bottom: 1px solid #eee;
	}

	table td:not(:last-of-type) {
		border-right: 1px solid #eee;
	}

	table input {
		border: 1px solid #ccc;
		border-radius: 2px;
		color: #555;
		font-family: 'Noto Sans';
		font-size: 14px;
		padding: 5px 10px;
		width: 50px;
	}

</style>