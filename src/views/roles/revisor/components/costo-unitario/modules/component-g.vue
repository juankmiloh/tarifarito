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
										<!-- <input type="text" 
													 v-on:input="(event) => this.$emit('inputChange', event)"> -->
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
							<el-row style="font-weight: bold; padding-bottom: 1%; text-align: center;">
								<el-col style="border: 0px solid red;" :span="13">
									<span>CONCEPTO</span>
								</el-col>
								<el-col style="border: 0px solid red;" :span="2">
									<span>UNIDAD</span>
								</el-col>
								<el-col style="border: 0px solid red;" :span="3">
									<span>VALORES</span>
								</el-col>
								<el-col style="border: 0px solid red;" :span="3">
									<span>VALORES</span>
								</el-col>
								<el-col style="border: 0px solid red;" :span="3">
									<span>DIFERENCIA</span>
								</el-col>
							</el-row>							
							<el-row>
								<el-col :span="24">
									<span style="color: white;">{{actualiza}}</span>
									<el-collapse accordion>
										<el-collapse-item v-for="item in components" :key="item.title" :name="item.name">
											<template slot="title">
												{{item.title}}<i class="header-icon el-icon-information"></i>
											</template>
											<el-row v-for="value in item.data" :key="value.campo">
												<el-col :span="13" style="padding-left: 2%; border: 0px solid blue;">
													<span>{{value.concepto}}</span>
												</el-col>
												<el-col style="border: 0px solid blue; text-align: center;" :span="2">
													<span>{{value.unidad}}</span>
												</el-col>
													<span v-for="input in value.inputs" :key="input.key">
														<span v-if="input.start === true && input.diferencia === false">
															<el-col v-if="valorInputDefault === input.show" style="border: 0px solid yellow; text-align: center;" :span="3">
																<input																	
																	v-model=values[input.key].values
																	:type=input.type
																	:placeholder=input.placeholder
																	style="width: 95%; height: 2em; margin-bottom: 0.5em;"
																	@input="diferencia(input.key)"/>
															</el-col>
														</span>
														<span v-else-if="input.start === false && input.diferencia === false">
															<el-col v-if="valoresDiferencia === input.show" style="border: 0px solid blue;" :span="3">
																<input																	
																	v-model=values[input.key].values
																	:type=input.type
																	:placeholder=input.placeholder
																	style="width: 95%; height: 2em; margin-bottom: 0.5em;"
																	@input="diferencia(input.key)"/>
															</el-col>
														</span>
														<span v-else>
															<el-col v-if="valoresDiferencia === input.show" style="border: 0px solid red;" :span="3">
																<input																	
																	v-model=values[input.key].values
																	:type=input.type
																	:placeholder=input.placeholder
																	style="width: 95%; height: 2em; margin-bottom: 0.5em;"/>
															</el-col>
														</span>
													</span>
											</el-row>
										</el-collapse-item>
									</el-collapse>
								</el-col>
							</el-row>							
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
					<el-button v-if="!valoresDiferencia" type="primary" @click="verificar">Verificado</el-button>
					<el-button v-if="valoresDiferencia" type="primary" @click="reportar">Reportar</el-button>					
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
	import componentesGeneracion from './../options/componentsG'

  export default {
		name: 'viewG',
		components: { BackToTop },
		data() {
			return {
				logo: logTarifarito,
				valorInputDefault: true,
				valoresDiferencia: false,
				components: componentesGeneracion,
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
			},
			reportar() {
				this.valoresDiferencia = false;				
				this.$alert('La empresa no reporto los ajustes aplicados', 'TARIFARITO REPORTA', {
          confirmButtonText: 'Aceptar',
          callback: action => {
						this.$emit('clicked', false);
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
			},
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
	}
</script>

<style lang="scss">
	.el-collapse-item__content{
		padding-bottom: 1.5%;
	}
</style>