<template>
  <div class="components-container">
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

			<el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><b>COSTO UNITARIO</b></span>
        </div>
        <div style="margin-bottom:145px;">
          <el-col :span="24" style="border: 0px solid red; text-align: center;">
						<el-select v-model="value_ano" clearable placeholder="Año">
							<el-option
								v-for="item in optionsAno"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select><br><br>
						<el-select v-model="value_mes" clearable placeholder="Mes">
							<el-option
								v-for="item in optionsMes"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select><br><br>
            <el-select v-model="value_empresa" clearable placeholder="Empresa">
							<el-option
								v-for="item in optionsEmpresa"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>							
						</el-select>	
					</el-col>
        </div>
      </el-card>

			<!-- <el-col :span="24" style="border: 0px solid red; text-align: center; padding: 10px;">
				<el-button type="success" icon="el-icon-check" :loading="false" round>Consultar</el-button>
			</el-col> -->

			<el-col :span="24" style="border: 0px solid red; text-align: center; padding: 10px;">
				<el-button type="success" icon="el-icon-check" @click="dialogFormVisible = true">Consultar</el-button>
			</el-col>

			<el-dialog :title="getTextSelectEmpresa(value_empresa)" :before-close="handleClose" :visible.sync="dialogFormVisible" width="100%" top="0" height="100vh">
				<el-dialog
					:title="modulo"
					:before-close="handleClose"
					:visible.sync="innerVisible"
					append-to-body
					width="100%"
					top="0"
					height="100vh">
					<component :is="currentView" /> <!-- Se carga la vista de lso diferentes componentes -->
				</el-dialog>
								
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
						<div style="border: 2px solid #C0C4CC; color: black; background-color: white; border-radius: 4px;">
							<el-row>
								<el-col :span="24" style="border: 0px solid; color: black; padding-top: 1%; background-color: #304156;">	
									<el-row style="padding-bottom: 1em;">
										<el-col :span="20" style="border: 0px solid; color: black; text-align: left; padding-left: 0.6em; color: white;">
											<el-row>
												<el-col :span="8"><span><b>AÑO:</b> {{value_ano}}</span></el-col>
											</el-row>							
											<el-row>
												<el-col :span="8"><span><b>MES:</b> {{getTextSelectMes(value_mes)}}</span></el-col>
											</el-row>							
											<el-row>
												<el-col :span="8"><span><b>TOLERANCIA:</b> 1</span></el-col>
											</el-row>																		
										</el-col>
										<el-col :span="4" style="border: 0px solid; color: black; text-align: center; padding-right: 2%;">									
											<el-input
												v-model="search"
												size="mini"
												placeholder="Buscar"/>
										</el-col>
									</el-row>	
									
									<el-table
										:default-sort = "{prop: 'nt_pro', order: 'ascending'}"
										:data="tableData.filter(data => !search || data.mercado.toLowerCase().includes(search.toLowerCase()))"
										height="53vh"
										style="width: 100%; height: 100%;">
										<el-table-column
											prop="idmercado"
											label="ID Mercado"
											width="180"
											sortable>
										</el-table-column>
										<el-table-column
											prop="mercado"
											label="Nombre Mercado"
											width="240"
											sortable>
										</el-table-column>
										<el-table-column
											prop="nt_pro"
											label="NT - PRO"
											width="150"
											sortable>
										</el-table-column>
										<el-table-column
											label="G">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_g" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_g[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_g[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_g[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
										<el-table-column
											label="T">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_t" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_t[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_t[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_t[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
										<el-table-column
											label="P">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_p" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_p[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_p[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_p[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
										<el-table-column
											label="Dtun">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_dtun" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_dtun[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_dtun[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_dtun[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
										<el-table-column
											label="R">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_r" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_r[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_r[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_r[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
										<el-table-column
											label="C">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_c" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_c[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_c[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_c[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
										<el-table-column
											label="Cu">
											<template slot-scope="scope">
												<el-popover
													placement="top-start"
													width="230"
													trigger="hover">
													<div style="color: black;">
														<div class="text_popover">Tarifarito Informa</div>
														<div v-for="item in scope.row.component_cu" :key="item.value" style="padding-top: 3%;">
															<label>Componente Publicado: </label>${{item.cpte_publicado}}<br>
															<label>Componente Calculado: </label>${{item.cpte_calculado}}<br>
															<label>Diferencia: </label>${{item.cpte_diferencia}}
														</div>
													</div>													
													<el-button 
														slot="reference"
														v-if="scope.row.component_cu[0].cpte_diferencia === 0"
														type="success" 
														icon="el-icon-check"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_cu[0].value)">
													</el-button>
													<el-button 
														slot="reference"
														v-else
														type="danger" 
														icon="el-icon-close"
														circle
														@click="handleClickComponent(scope.$index, scope.row, scope.row.component_cu[0].value)">
													</el-button>
												</el-popover>																					
											</template>
										</el-table-column>
									</el-table>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>

				<el-row style="padding-top: 1%;">
					<el-col :span="15" style="border: 1px solid transparent;"></el-col>
					<el-col :span="9" style="text-align: right; border: 0px solid;">
							<el-button @click="dialogFormVisible = false">Cancelar</el-button>
							<el-button type="primary" @click="functionConfirmar">Verificado</el-button>
					</el-col>
				</el-row>
			</el-dialog>
    </el-row>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import BackToTop from '@/components/BackToTop'
	import logTarifarito from "../../../../../assets/logo_buho.png"
	import viewG from './modules/component-g.vue'
	import viewT from './modules/component-t.vue'
	import viewP from './modules/component-p.vue'
	import viewDtun from './modules/component-dtun.vue'
	import viewR from './modules/component-r.vue'
	import viewC from './modules/component-c.vue'
	import viewCu from './modules/component-cu.vue'

  export default {
		name: 'viewCostoUnitario',
		components: { BackToTop, viewG, viewT, viewP, viewDtun, viewR, viewC, viewCu },
		data() {
			return {
				modulo: null,
				currentView: null,
				changeView: null,
				logo: logTarifarito,		
				tableData: [
					{
						idmercado: '174',
						mercado: 'Choco',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_c: [{value: "c", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '175',
						mercado: 'Bogotá',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 500, cpte_calculado: 550, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_c: [{value: "c", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '176',
						mercado: 'Cali',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_c: [{value: "c", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '177',
						mercado: 'Medellin',
						nt_pro: '1 - 100',
						component_g: [{value: "g", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
					{
						idmercado: '178',
						mercado: 'Cartagena',
						nt_pro: '1 - 50',
						component_g: [{value: "g", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_t: [{value: "t", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_p: [{value: "p", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_dtun: [{value: "dtun", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_r: [{value: "r", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_c: [{value: "c", cpte_publicado: 550, cpte_calculado: 500, cpte_diferencia: 50}],
						component_cu: [{value: "cu", cpte_publicado: 500, cpte_calculado: 500, cpte_diferencia: 0}]
					},
				],
        search: '',
				dialogFormVisible: false,
				innerVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
				myBackToTopStyle: {
					right: '50px',
					bottom: '50px',
					width: '40px',
					height: '40px',
					'border-radius': '4px',
					'line-height': '45px',
					background: '#e7eaf1'
				},
				optionsAno: [{
					value: '2007',
					label: '2007'
				}, {
					value: '2008',
					label: '2008'
				}, {
					value: '2009',
					label: '2009'
				}, {	
					value: '2010',
					label: '2010'
				}, {
					value: '2011',
					label: '2011'
				}, {
					value: '2012',
					label: '2012'
				}, {
					value: '2013',
					label: '2013'
				}, {
					value: '2014',
					label: '2014'
				}, {
					value: '2015',
					label: '2015'
				}, {
					value: '2016',
					label: '2016'
				}, {
					value: '2017',
					label: '2017'
				}, {
					value: '2018',
					label: '2018'
				}, {
					value: '2019',
					label: '2019'
				}],
				optionsMes: [{
					value: '1',
					label: 'Enero'
				}, {
					value: '2',
					label: 'Febrero'
				}, {
					value: '3',
					label: 'Marzo'
				}, {
					value: '4',
					label: 'Abril'
				}, {
					value: '5',
					label: 'Mayo'
				}, {
					value: '6',
					label: 'Junio'
				}, {
					value: '7',
					label: 'Julio'
				}, {
					value: '8',
					label: 'Agosto'
				}, {
					value: '9',
					label: 'Septiembre'
				}, {
					value: '10',
					label: 'Octubre'
				}, {
					value: '11',
					label: 'Noviembre'
				}, {
					value: '12',
					label: 'Diciembre'
        }],        
				optionsEmpresa: [{
					value: '2103',
					label: 'CODENSA SA'
				}, {
					value: '2249',
					label: 'ELECTRIFICADORA DEL CARIBE SA'
				}, {
					value: '204',
					label: 'ELECTRIFICADORA DEL META SA'
				}],
				value_ano: '',
        value_mes: '',
        value_empresa: '',
			}
		},
		methods: {
			formatter(row, column) {
				// console.log(row.address);
        return row.address;
			},
			handleClickComponent(index, row, component) {
				console.log(index, row, component);
				// console.log(this.changeView);}
				console.log("componente seleccionado -> "+component);
				if (component == "g") {		
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Módulo Generación"
					this.currentView = 'viewG';
					this.innerVisible = true;
				}
				if (component == "t") {			
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Módulo Transmisión"
					this.currentView = 'viewT';
					this.innerVisible = true;
				}
				if (component == "p") {					
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Módulo Perdidas"
					this.currentView = 'viewP';
					this.innerVisible = true;
				}
				if (component == "dtun") {
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Componente DTUN"
					this.currentView = 'viewDtun';
					this.innerVisible = true;
				}
				if (component == "r") {					
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Módulo Restricciones"
					this.currentView = 'viewR';
					this.innerVisible = true;
				}
				if (component == "c") {				
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Módulo Comercialización"
					this.currentView = 'viewC';
					this.innerVisible = true;
				}
				if (component == "cu") {					
					this.modulo = this.getTextSelectEmpresa(this.value_empresa) + " - " + row.mercado + " | Módulo CU"
					this.currentView = 'viewCu';
					this.innerVisible = true;
				}
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClose(done) {
				console.log(done);
        this.$confirm('¿Realmente deseas cerrar la ventana?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
			},
			functionConfirmar(){
				// alert('hola function!');
				this.optionsFactor.push({
					value: this.form.name,
					label: this.form.name
				})
				this.dialogFormVisible = false
			},
			getTextSelectEmpresa(val) {
				for (let i = 0; i < this.optionsEmpresa.length; i++) {
					if (this.optionsEmpresa[i].value === val){
						// console.log(this.optionsEmpresa[i].label);
						return this.optionsEmpresa[i].label;
					}
				}
				return '';
			},
			getTextSelectMes(val) {
				for (let i = 0; i < this.optionsMes.length; i++) {
					if (this.optionsMes[i].value === val){
						return this.optionsMes[i].label;
					}
				}
				return '';
			}
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

	.el-dialog__wrapper{
		display: flex;
    flex-direction: column;
    min-height: 100vh;
		// background-color: #F2F6FC;
	}

	.el-dialog{
		flex: 1;
		background-color: #F2F6FC;		
	}

	.el-dialog__headerbtn .el-dialog__close {
    color: white;
	}

	.el-dialog__header{
		background-color: #304156;
		padding-bottom: 1em;
	}	

	.el-dialog__title{
		font-weight: bold;
		color: white;
		margin-left: 0.5%;
	}

	.el-dialog__body{
		padding-top: 1%;
		padding-left: 3%;
		padding-right: 3%;
	}

	.el-dialog__footer{
		
	}

	.cell{
		color: black;
	}

	.text_popover{
		text-align: center; 
		font-weight: bold; 
		font-size: 125%; 
		padding-bottom: 2%; 
		border-bottom: 1px solid;
	}
</style>