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

				<div style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 43em; background-color: white; border-radius: 5px;"> <!-- valor pantalla super -->
				<!-- <div style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 20em; background-color: white; border-radius: 5px;"> -->
					<el-row>
						<el-col :span="24" style="border: 0px solid; color: black; padding: 1%;">
							<el-row style="font-weight: bold; padding-bottom: 1%;">
								<el-col :span="8">
									<span>CONCEPTO</span>
								</el-col>
								<el-col :span="2">
									<span>UNIDAD</span>
								</el-col>
								<el-col :span="4">
									<span>VALORES</span>
								</el-col>
								<el-col :span="4">
									<span>VALORES</span>
								</el-col>
								<el-col :span="4">
									<span>DIFERENCIA</span>
								</el-col>
							</el-row>
							<span style="color: white;">{{actualiza}}</span>
							<el-collapse accordion>
								<el-collapse-item v-for="item in components" :key="item.title" :name="item.name">
									<template slot="title">
										{{item.title}}<i class="header-icon el-icon-information"></i>
									</template>
									<el-row v-for="value in item.data" :key="value.campo">
										<el-col :span="6" style="padding-left: 2%;">
											<span>{{value.concepto}}</span>
										</el-col>
										<el-col :span="8">
											<span>{{value.unidad}}</span>
										</el-col>
										<el-col :span="10">
											<span v-for="input in value.inputs" :key="input.key">
												<span v-if="input.start === true && input.diferencia === false">
													<input
														v-if="valorInputDefault === input.show"
														v-model=values[input.key].values
														:type=input.type
														:placeholder=input.placeholder
														style="width: 20%; height: 2em; margin-right: 1em; margin-bottom: 0.5em;"
														@input="diferencia(input.key)"/>
												</span>
												<span v-else-if="input.start === false && input.diferencia === false">
													<input
														v-if="valoresDiferencia === input.show"
														v-model=values[input.key].values
														:type=input.type
														:placeholder=input.placeholder
														style="width: 20%; height: 2em; margin-right: 1em; margin-bottom: 0.5em;"
														@input="diferencia(input.key)"/>
												</span>
												<span v-else>
													<input
														v-if="valoresDiferencia === input.show"
														v-model=values[input.key].values
														:type=input.type
														:placeholder=input.placeholder
														style="width: 20%; height: 2em; margin-right: 1em; margin-bottom: 0.5em;"/>
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
					<el-button type="primary" @click="calcular">Calcular</el-button>
					<el-button type="primary" @click="verificar">Verificado</el-button>					
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
						campo: '16',
						name: '1',
						data: [ 
										{											
											campo: '16',
											concepto: 'Demanda Comercial Regulada',
											unidad: 'kWh',
											inputs: [
																{ key: 'dcr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'dcr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'dcr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '12',
											concepto: 'Demanda Real Regulada',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'drr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'drr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'drr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '13',
											concepto: 'Ajuste Demanda Real Regulada',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'adrr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'adrr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'adrr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '14',
											concepto: 'Pérdida Real de la Demanda Regulada',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'prdldr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'prdldr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'prdldr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '15',
											concepto: 'Ajuste Pérdida Real de la Demanda Regulada',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'aprdldr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'aprdldr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'aprdldr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									] 
					},
					{
						title: 'Fracción DCR atendida con compras en contratos',
						campo: '17',
						name: '2',
						data: [ 
										{											
											campo: '17',
											concepto: 'Qc',
											unidad: '%',
											inputs: [
																{ key: 'qc_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'qc_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'qc_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
									]
					},
					{
						title: 'Costo promedio de la energía comprada en contratos',
						campo: '22',
						name: '3',
						data: [ 
										{											
											campo: '22',
											concepto: 'Pc',
											unidad: 'kWh',
											inputs: [
																{ key: 'pc_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'pc_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'pc_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '1',
											concepto: 'Compras en contratos MR (AGENTE)',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'cecmragente_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'cecmragente_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'cecmragente_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '2',
											concepto: 'Compras en contratos MR (ASIC)',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'cecmrasic_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'cecmrasic_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'cecmrasic_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '3',
											concepto: 'Ajuste compras en contratos MR',
											unidad: 'kWh',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'acecmr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'acecmr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'acecmr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '4',
											concepto: 'Valor compras en contratos MR (AGENTE)',
											unidad: '$',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'vcecmragente_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'vcecmragente_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'vcecmragente_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '5',
											concepto: 'Valor compras en contratos MR (ASIC)',
											unidad: '$',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'vcecmrasic_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'vcecmrasic_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'vcecmrasic_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
										{											
											campo: '6',
											concepto: 'Ajuste valor compras en contratos MR',
											unidad: '$',
											type: 'number',
											placeholder: 'Valor',
											inputs: [
																{ key: 'avcecmr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'avcecmr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'avcecmr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'Fracción DCR atendida con compras en bolsa',
						campo: '18',
						name: '4',
						data: [ 
										{											
											campo: '18',
											concepto: 'Qb',
											unidad: '%',
											inputs: [
																{ key: 'qb_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'qb_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'qb_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
									]
					},
					{
						title: 'Costo promedio ponderado de la energía comprada en bolsa',
						campo: '23',
						name: '5',
						data: [ 
										{											
											campo: '23',
											concepto: 'Pb',
											unidad: '$/kWh',
											inputs: [
																{ key: 'pb_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'pb_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'pb_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
										{											
											campo: '7',
											concepto: 'Compras en bolsa MR',
											unidad: 'kWh',
											inputs: [
																{ key: 'cebmr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'cebmr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'cebmr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
										{											
											campo: '8',
											concepto: 'Valor compras en bolsa MR',
											unidad: '$',
											inputs: [
																{ key: 'vcebmr_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'vcebmr_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'vcebmr_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
									]
					},
					{
						title: 'Fracción demanda comercial atendida con AGD',
						campo: '21',
						name: '6',
						data: [ 
										{											
											campo: '21',
											concepto: 'Qagd',
											unidad: '%',
											inputs: [
																{ key: 'qagd_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'qagd_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'qagd_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
										{											
											campo: '19',
											concepto: 'AGPE',
											unidad: '%',
											inputs: [
																{ key: 'agpe_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'agpe_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'agpe_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
										{											
											campo: '20',
											concepto: 'GD',
											unidad: '%',
											inputs: [
																{ key: 'gd_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'gd_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'gd_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
									]
					},
					{
						title: 'Costo promedio ponderado por energía (Mc) aplicado',
						campo: '11',
						name: '7',
						data: [ 
										{											
											campo: '11',
											concepto: 'Mc aplicado',
											unidad: '$/kWh',
											inputs: [
																{ key: 'mca_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'mca_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'mca_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
										{											
											campo: '9',
											concepto: 'Mc',
											unidad: '$/kWh',
											inputs: [
																{ key: 'mc_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'mc_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'mc_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},	
										{											
											campo: '10',
											concepto: 'Ajuste Mc',
											unidad: '$/kWh',
											inputs: [
																{ key: 'amc_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'amc_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'amc_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'Factor de ajuste AJ',
						campo: '24',
						name: '8',
						data: [ 
										{											
											campo: '24',
											concepto: 'Factor de Ajuste AJ',
											unidad: '$/kWh',
											inputs: [
																{ key: 'fdaaj_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'fdaaj_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'fdaaj_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'Alfa',
						campo: '25',
						name: '9',
						data: [ 
										{											
											campo: '25',
											concepto: 'Alfa',
											unidad: 'Adimensional',
											inputs: [
																{ key: 'alfa_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'alfa_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'alfa_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'G Transitorio',
						campo: '26',
						name: '10',
						data: [ 
										{											
											campo: '26',
											concepto: 'G Transitorio',
											unidad: '$/kWh',
											inputs: [
																{ key: 'gt_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'gt_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'gt_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'G Contratos',
						campo: '29',
						name: '11',
						data: [ 
										{											
											campo: '29',
											concepto: 'G Contratos',
											unidad: '',
											inputs: [
																{ key: 'gc_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'gc_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'gc_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'G Bolsa',
						campo: '30',
						name: '12',
						data: [ 
										{											
											campo: '30',
											concepto: 'G Bolsa',
											unidad: '',
											inputs: [
																{ key: 'gb_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'gb_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'gb_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'CFNC',
						campo: '27',
						name: '13',
						data: [ 
										{											
											campo: '27',
											concepto: 'CFNC',
											unidad: '$/kWh',
											inputs: [
																{ key: 'cfnc_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'cfnc_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'cfnc_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
					{
						title: 'Componente Generación',
						campo: '28',
						name: '14',
						data: [ 
										{											
											campo: '28',
											concepto: 'Componente Generación',
											unidad: '$/kWh',
											inputs: [
																{ key: 'cg_1', type: 'number', placeholder: 'input1', start: true, show: true, diferencia: false, value: 87 },
																{ key: 'cg_2', type: 'number', placeholder: 'input2', start: false, show: true, diferencia: false, value: 87 },
																{ key: 'cg_3', type: 'number', placeholder: 'input3', start: false, show: true, diferencia: true, value: 0 },
														  ],
										},
									]
					},
				],
				input: 0,
				values: [],
				actualiza: false
			}
		},
		methods: {
			diferencia : function(key) {
				this.actualiza = false; // sirve para renderizar el nuevo valor, no quitar 
				let splitKey = key.split('_');
				let idKey = splitKey[0];
				let KeyOne = idKey + '_' + 1;				
				let KeyTwo = idKey + '_' + 2;
				let KeyThree = idKey + '_' + 3;
				let valor1 = this.values[KeyOne].values;
				let valor2 = this.values[KeyTwo].values;				
				this.values[KeyThree].values = valor1 - valor2;
				console.log('Values: ', this.values);
				this.actualiza = true;
			},
			calcular : function() {
				this.valoresDiferencia = true;
			},
			verificar() {
				this.valoresDiferencia = false;

			}
		},
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
		created() {
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