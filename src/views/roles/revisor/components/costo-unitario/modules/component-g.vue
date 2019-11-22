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
											<span v-for="input in value.inputs" :key="input.key">
												<span v-if="input.start === true && input.diferencia === false">
													<input
														v-if="valorInputDefault === input.show"
														v-model=values[input.key].values
														:type=input.type
														:placeholder=input.placeholder
														style="width: 50%;"/>
												</span>
												<span v-else-if="input.start === false && input.diferencia === false">
													<input
														v-if="valoresDiferencia === input.show"
														v-model=values[input.key].values
														:type=input.type
														:placeholder=input.placeholder
														style="width: 50%;"/>
												</span>
												<span v-else>
													<input
														v-if="valoresDiferencia === input.show"
														v-model=values[input.key].values
														:type=input.type
														:placeholder=input.placeholder
														style="width: 50%;"/>
												</span>
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
				valorInputDefault: true,
				valoresDiferencia: false,
				components: [
					{
						title: 'Demanda Comercial Regulada',
						data: [ 
										{											
											campo: '16',
											concepto: 'Demanda Comercial Regulada',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: '2kd034', modelo: 'input1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'avcn2r', modelo: 'input2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 12 },
																{ key: 'clm7rv', modelo: 'input3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
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
				scores: {},
				input: null,
				values: []
			}
		},
		methods: {
			showScores() {
				// console.log(this.scores);
				console.log(this.values['clm7rv'].values = 26);
				console.log(this.values['clm7rv']);
			},
			functionCalcular() {
				// console.log('functionCalcular');
				this.valoresDiferencia = true;
				console.log('values: ', this.values);
			},
			functionVerificar() {
				// console.log('functionVerificar');
				this.valoresDiferencia = false;
			},
			calcularDiferencia() {
				console.log("Calcular diferencia!");
			}
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
			let valores = [];
			let diferencia = 0; 
			this.components.forEach(item => {
				item.data.forEach( input => {
					input.inputs.forEach(campo => {
						if (campo.diferencia === false) {
							valores.push(campo.value);
							this.values[campo.key] = {
								modelo: campo.modelo,
								placeholder: campo.placeholder,
								show: campo.show,
								values: campo.value
							}
						} else {
							diferencia = valores[0] - valores[1];
							this.values[campo.key] = {
								modelo: campo.modelo,
								placeholder: campo.placeholder,
								show: campo.show,
								values: diferencia
							}
						}
					})					
				})				
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
</style>