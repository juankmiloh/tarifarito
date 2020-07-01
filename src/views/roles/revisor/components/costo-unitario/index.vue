<template>
  <div class="components-container">
    <el-row>
      <el-col :span="24" style="border: 0px solid red; text-align: center;">
        <aside>
          <span style="color: black; font-size: 170%;">
            <b>DIRECCIÓN TÉCNICA DE GESTIÓN DE ENERGÍA</b>
          </span>
        </aside>
      </el-col>
      <el-col :span="24" style="border: 0px solid red; text-align: center;">
        <aside>
          <span style="font-size: 120%;">
            <b>{{ name }}</b>
          </span>
        </aside>
      </el-col>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <b>COSTO UNITARIO</b>
          </span>
          <!-- <p>valor del hijo: {{ valor }}</p> -->
        </div>
        <div style="margin-bottom:145px;">
          <el-col :span="24" style="border: 0px solid red; text-align: center;">
            <el-select
              v-model="value_ano"
              placeholder="Año"
              class="select-style"
              @change="verifyCU($event)"
            >
              <el-option
                v-for="item in optionsAno"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <br>
            <br>
            <el-select
              v-model="value_mes"
              placeholder="Mes"
              class="select-style"
              @change="verifyCU($event)"
            >
              <el-option
                v-for="item in optionsMes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <br>
            <br>
            <el-select
              v-model="value_empresa"
              filterable
              placeholder="Empresa"
              class="select-style"
              popper-class="select-popper"
              :loading="loadingEmp"
              :loading-text="loadingText"
              @change="verifyCU($event)"
            >
              <el-option
                v-for="item in optionsEmpresa"
                :key="item.cod_empresa"
                :label="`${item.cod_empresa} - ${item.nombre}`"
                :value="item.cod_empresa"
              />
            </el-select>
          </el-col>
        </div>
      </el-card>

      <!-- <el-col :span="24" style="border: 0px solid red; text-align: center; padding: 10px;">
        <el-button type="success" icon="el-icon-check" :loading="false" round>Consultar</el-button>
			</el-col>-->

      <el-col :span="24" style="border: 0px solid red; text-align: center; padding: 10px;">
        <el-button type="success" icon="el-icon-check" @click="dialogFormVisible = true">Consultar</el-button>
      </el-col>

      <el-dialog
        :title="getTextSelectEmpresa(value_empresa)"
        :before-close="handleClose"
        :visible.sync="dialogFormVisible"
        fullscreen
        append-to-body
        destroy-on-close
      >
        <!-- Se carga la vista de los valores del componente seleccionado -->
        <el-dialog
          :title="modulo"
          :before-close="handleClose"
          :visible.sync="innerVisible"
          fullscreen
          append-to-body
          destroy-on-close
        >
          <!-- <component :is="currentView" v-on:inputChange="handleChange" @clicked="onClickChild"/> -->
          <component :is="currentView" :message="componentSelect" @clicked="onClickChild" />
        </el-dialog>

        <el-dialog
          title="Seleccione una metodología"
          :visible.sync="dialogComponentP"
          append-to-body
          width="20em"
          top="10em"
          border-radius="25px"
        >
          <div style="text-align: center; padding-top: 1.5em;">
            <el-row style="padding-top: 1%;">
              <el-col :span="24">
                <el-row>
                  <el-col style="padding-bottom: 1em;" :span="24">
                    <el-radio
                      v-model="radioCreg"
                      style="background-color: white; color: black;"
                      label="1"
                      border
                    >Resolución CREG 097</el-radio>
                  </el-col>
                  <el-col :span="24">
                    <el-radio
                      v-model="radioCreg"
                      style="background-color: white; color: black;"
                      label="2"
                      border
                    >Resolución CREG 015</el-radio>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top: 2.3em; padding-top: 1.5em; border-top: 1px solid #e0e0e0;">
              <!-- <el-col :span="13" style="border: 1px solid transparent;" /> -->
              <el-col :span="24" style="border: 0px solid;">
                <el-button type="primary" @click="handleSelectComponentP">Seleccionar</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
        <el-row>
          <el-col :span="24">
            <div
              style="border: 2px solid #C0C4CC; padding: 1%; padding-bottom: 0%; background-color: white; border-radius: 5px;"
            >
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
                        <span style="color: black; font-size: 170%;">
                          <b>DIRECCIÓN TÉCNICA DE GESTIÓN DE ENERGÍA</b>
                        </span>
                      </aside>
                    </el-col>
                    <el-col :span="24" style="border: 0px solid red; text-align: center;">
                      <aside>
                        <span style="font-size: 120%;">
                          <b>{{ name }}</b>
                        </span>
                      </aside>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <br>
            <div
              style="border: 2px solid #C0C4CC; color: black; background-color: white; border-radius: 4px;"
            >
              <el-row>
                <el-col
                  :span="24"
                  style="border: 0px solid; color: black; padding-top: 1%; background-color: #304156;"
                >
                  <el-row style="padding-bottom: 1em;">
                    <el-col
                      :span="20"
                      style="border: 0px solid; color: black; text-align: left; padding-left: 0.6em; color: white;"
                    >
                      <el-row>
                        <el-col :span="8">
                          <span>
                            <b>AÑO:</b>
                            {{ value_ano }}
                          </span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <span>
                            <b>MES:</b>
                            {{ getTextSelectMes(value_mes) }}
                          </span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <span>
                            <b>TOLERANCIA:</b> 1
                          </span>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col
                      :span="4"
                      style="border: 0px solid; color: black; text-align: center; padding-right: 2%;"
                    >
                      <el-input v-model="search" size="mini" placeholder="Buscar" />
                    </el-col>
                  </el-row>

                  <el-table
                    v-loading="loading"
                    :default-sort="{prop: 'id_mercado', order: 'ascending'}"
                    :data="tableData.filter(data => !search || data.mercado.toLowerCase().includes(search.toLowerCase()))"
                    height="53vh"
                    :border="true"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" align="center" />
                    <el-table-column
                      prop="id_mercado"
                      label="ID Mercado"
                      align="center"
                      sortable
                    />
                    <el-table-column prop="mercado" label="Mercado" align="center" sortable />
                    <el-table-column prop="nt_prop" label="NT - PROP" align="center" sortable />
                    <el-table-column
                      v-for="column in colComponentes"
                      :key="column.label"
                      :label="column.label"
                      :prop="column.prop"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div v-for="item in scope.row.componentes" :key="item">
                          <!-- <div v-for="item in scope.row.componentes"> -->
                          <span v-for="componente in item[column.prop]" :key="componente.value">
                            <el-popover placement="top-start" width="230" trigger="hover">
                              <div style="color: black;">
                                <div class="text_popover">Tarifarito Informa</div>
                                <center>
                                  <label>Componente Publicado</label>
                                </center>
                                <center>${{ componente.cpte_publicado.toFixed(3) }}</center>
                                <center>
                                  <label>Componente Calculado</label>
                                </center>
                                <center>${{ componente.cpte_calculado.toFixed(3) }}</center>
                                <center>
                                  <label>Diferencia</label>
                                </center>
                                <center v-if="parseFloat(componente.cpte_publicado - componente.cpte_calculado).toFixed(3) == 0">$0</center>
                                <center v-else-if="parseFloat(componente.cpte_publicado - componente.cpte_calculado).toFixed(3) != 0">${{ parseFloat(componente.cpte_publicado - componente.cpte_calculado).toFixed(3) }}</center>
                              </div>
                              <el-button
                                v-if="(componente.cpte_publicado - componente.cpte_calculado >= 0
                                  && componente.cpte_publicado - componente.cpte_calculado <= 0.5)
                                  || (componente.cpte_publicado - componente.cpte_calculado < 0
                                  && componente.cpte_publicado - componente.cpte_calculado >= -0.5)"
                                slot="reference"
                                type="success"
                                icon="el-icon-check"
                                circle
                                @click="handleClickComponent(scope.$index, scope.row, componente.value)"
                              />
                              <el-button
                                v-else
                                slot="reference"
                                type="danger"
                                icon="el-icon-close"
                                circle
                                @click="handleClickComponent(scope.$index, scope.row, componente.value)"
                              />
                            </el-popover>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-row style="padding-top: 1%;">
          <el-col :span="15" style="border: 1px solid transparent;" />
          <el-col :span="9" style="text-align: right; border: 0px solid;">
            <el-button @click="dialogFormVisible = false">Cancelar</el-button>
            <el-button type="primary" @click="functionConfirmar">Verificación en lote</el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="Se cerrará la verificación de los componentes que no superaron los niveles de tolerancia establecidos."
              placement="top-start"
            >
              <i class="el-icon-info" style="color: #304156;" />
            </el-tooltip>
          </el-col>
        </el-row>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BackToTop from '@/components/BackToTop'
import logTarifarito from '../../../../../assets/logo_buho.png'
import viewG from './modules/component-g.vue'
import viewT from './modules/component-t.vue'
import ViewP015 from './modules/component-p-015'
import ViewP097 from './modules/component-p-097'
import viewDtun from './modules/component-dtun.vue'
import viewR from './modules/component-r.vue'
import viewC from './modules/component-c.vue'
import viewCu from './modules/component-cu.vue'
import componentsTable from './options/componentsTable'

import { CONSTANTS } from '../../../../../constants/constants'
import {
  getCUnitarioList,
  getCUnitarioEmpresa
} from '@/api/tarifarito/revisor/cUnitario'
import { getSUIEmpresasList } from '@/api/tarifarito/sui-empresas'

export default {
  name: 'ViewCostoUnitario',
  components: {
    BackToTop,
    viewG,
    viewT,
    ViewP015,
    ViewP097,
    viewDtun,
    viewR,
    viewC,
    viewCu
  },
  data() {
    // this.getListCU()
    this.getEmpresasList()
    return {
      valor: 'hello',
      modulo: null,
      currentView: null,
      logo: logTarifarito,
      tableData: componentsTable,
      multipleSelection: [],
      loading: false,
      search: '',
      dialogFormVisible: false,
      innerVisible: false,
      optionsAno: CONSTANTS.optionsAno,
      optionsMes: CONSTANTS.optionsMes,
      loadingEmp: true,
      loadingText: 'Cargando...',
      optionsEmpresa: [],
      value_ano: '',
      value_mes: '',
      value_empresa: '',
      dialogComponentP: false,
      radioCreg: '',
      componentSelect: {},
      colComponentes: [
        {
          label: 'G',
          prop: 'component_g'
        },
        {
          label: 'T',
          prop: 'component_t'
        },
        {
          label: 'P',
          prop: 'component_p'
        },
        {
          label: 'Dtun',
          prop: 'component_dtun'
        },
        {
          label: 'R',
          prop: 'component_r'
        },
        {
          label: 'C',
          prop: 'component_c'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  methods: {
    async getEmpresasList() {
      await getSUIEmpresasList().then((result) => {
        this.loadingEmp = false
        this.optionsEmpresa = JSON.parse(JSON.stringify(result))
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        this.loadingText = 'Error, recargue la página'
      })
    },
    async getListCU() {
      await getCUnitarioList(2020, 2).then(response => {
        // console.log(response)
      })
    },
    async verifyCU() {
      if (this.value_ano && this.value_mes && this.value_empresa) {
        this.loading = true
        this.tableData = []
        await getCUnitarioEmpresa(
          this.value_ano,
          this.value_mes,
          this.value_empresa
        ).then(response => {
          // console.log(response)
          this.tableData = response
        })
      }
      this.loading = false
    },
    onClickChild(value) {
      console.log('onClickChild: ', value) // someValue
      this.innerVisible = value
    },
    handleChange(event) {
      const { value } = event.target
      this.valor = value
    },
    handleClickComponent(index, row, component) {
      // console.log(index, row, component)
      // console.log('componente seleccionado -> ' + component)
      row.ano = this.value_ano
      row.mes = this.value_mes
      this.componentSelect = row
      if (component === 'g') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) +
						' - ' +
						row.mercado +
						' | Módulo Generación'
        this.currentView = 'viewG'
        this.innerVisible = true
      }
      if (component === 't') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) +
						' - ' +
						row.mercado +
						' | Módulo transmisión datos publicados'
        this.currentView = 'viewT'
        this.innerVisible = true
      }
      if (component === 'p') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado
        this.dialogComponentP = true
      }
      if (component === 'dtun') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) +
						' - ' +
						row.mercado +
						' | Componente DTUN'
        this.currentView = 'viewDtun'
        this.innerVisible = true
      }
      if (component === 'r') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) +
						' - ' +
						row.mercado +
						' | Módulo Restricciones'
        this.currentView = 'viewR'
        this.innerVisible = true
      }
      if (component === 'c') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) +
						' - ' +
						row.mercado +
						' | Módulo Comercialización'
        this.currentView = 'viewC'
        this.innerVisible = true
      }
      if (component === 'cu') {
        this.modulo =
						this.getTextSelectEmpresa(this.value_empresa) +
						' - ' +
						row.mercado +
						' | Módulo CU'
        this.currentView = 'viewCu'
        this.innerVisible = true
      }
    },
    handleSelectComponentP() {
      this.dialogComponentP = false
      if (this.radioCreg === '1') {
        this.modulo = this.modulo + ' | Módulo Perdidas CREG 097'
        this.currentView = 'ViewP097'
        this.innerVisible = true
      } else if (this.radioCreg === '2') {
        this.modulo = this.modulo + ' | Módulo Perdidas CREG 015'
        this.currentView = 'ViewP015'
        this.innerVisible = true
      }
    },
    handleClose(done) {
      this.$confirm('¿Realmente deseas cerrar la ventana?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    functionConfirmar() {
      console.log('Verificación en lote!')
    },
    getTextSelectEmpresa(val) {
      // console.log('Empresa: ', val)
      for (let i = 0; i < this.optionsEmpresa.length; i++) {
        if (this.optionsEmpresa[i].cod_empresa === val) {
          console.log(this.optionsEmpresa[i].nombre)
          return this.optionsEmpresa[i].nombre
        }
      }
      return ''
    },
    getTextSelectMes(val) {
      for (let i = 0; i < this.optionsMes.length; i++) {
        if (this.optionsMes[i].value === val) {
          return this.optionsMes[i].label
        }
      }
      return ''
    },
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
	.el-dialog {
		background-color: #f2f6fc;
	}

	.el-dialog__headerbtn .el-dialog__close {
		color: white;
	}

	.el-dialog__header {
		background-color: #304156;
		padding-bottom: 1em;
	}

	.el-dialog__title {
		font-weight: bold;
		color: white;
		margin-left: 0.5%;
	}

	.el-dialog__body {
		padding-top: 1%;
		padding-left: 3%;
		padding-right: 3%;
	}

	.cell {
		color: black;
	}

	.text_popover {
		text-align: center;
		font-weight: bold;
		font-size: 125%;
		padding-bottom: 2%;
		border-bottom: 1px solid;
	}
</style>
