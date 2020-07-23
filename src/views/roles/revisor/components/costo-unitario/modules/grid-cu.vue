<template>
  <div>
    <el-card class="box-card margin-card" style="border: 2px solid #C0C4CC; height: 78vh;">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="18">
            <div>
              <b>AÑO:</b>
              {{ msgviewparent.ano }}
            </div>
            <div style="padding-top: 0.5em;">
              <b>MES:</b>
              {{ getMes(msgviewparent.mes) }}
            </div>
            <div style="padding-top: 0.5em;">
              <b>TOLERANCIA:</b> 0.5
            </div>
          </el-col>
          <el-col :span="6" style="padding-top: 2em;">
            <el-input v-model="search" size="mini" placeholder="Buscar" />
          </el-col>
        </el-row>
      </div>
      <el-table
        v-loading="loading"
        :default-sort="{prop: 'id_mercado', order: 'ascending'}"
        :data="tableData.filter(data => !search || data.mercado.toLowerCase().includes(search.toLowerCase()))"
        :border="true"
        style="width: 100%;"
        height="60vh"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column prop="id_mercado" label="ID Mercado" width="140" align="center" sortable />
        <el-table-column prop="mercado" label="Mercado" width="180" align="center" sortable />
        <el-table-column prop="nt_prop" label="NT - PROP" width="140" align="center" sortable />
        <el-table-column
          v-for="column in colComponentes"
          :key="column.label"
          :label="column.label"
          :prop="column.prop"
          align="center"
        >
          <template slot-scope="scope">
            <div v-for="componente in scope.row.componentes[0][column.prop]" :key="componente.value">
              <el-popover placement="top-start" width="290" trigger="hover" popper-class="popover-cpte" visible-arrow="false">
                <div class="text_popover">Tarifarito informa</div>
                <div style="padding-top: 1em;">
                  <label>{{ componente.label_publicado }}</label>
                  <span>&nbsp;${{ componente.cpte_publicado.toFixed(5) }}</span>
                </div>
                <div>
                  <label>{{ componente.label_calculado }}</label>
                  <span>&nbsp;${{ componente.cpte_calculado.toFixed(5) }}</span>
                </div>
                <div style="text-align: center;">
                  <label>Diferencia:</label>
                  <span
                    v-if="parseFloat(componente.cpte_publicado - componente.cpte_calculado).toFixed(5) == 0"
                  >$0</span>
                  <span
                    v-else-if="parseFloat(componente.cpte_publicado - componente.cpte_calculado).toFixed(5) != 0"
                  >${{ parseFloat(componente.cpte_publicado - componente.cpte_calculado).toFixed(5) }}</span>
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
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-row :gutter="10" class="footer">
      <el-col :sm="24" :md="21" class="cont-btn" style="text-align: right;">
        <el-tooltip
          class="item hidden-sm-and-down"
          effect="dark"
          content="Se cerrará la verificación de los componentes que no superaron los niveles de tolerancia establecidos."
          placement="top-start"
        >
          <i class="el-icon-info" style="color: #304156;" />
        </el-tooltip>
        <el-button type="primary" class="btnVerify" @click="functionConfirmar">Verificación en lote</el-button>
      </el-col>
      <el-col :sm="24" :md="3">
        <el-button class="btn" @click="closeViewGridCu">Cancelar</el-button>
      </el-col>
    </el-row>

    <!-- Se carga la vista del componente seleccionado -->
    <el-dialog
      :title="modulo"
      :before-close="handleClose"
      :visible.sync="viewCpteVisible"
      fullscreen
      append-to-body
      destroy-on-close
      custom-class="dialog-component"
      @close="closeViewComponent"
    >
      <component :is="currentView" :messagecomponent="componentSelect" @clicked="onClickChild" />
    </el-dialog>

    <!-- Se carga modal de seleccion de componente 'P' -->
    <el-dialog
      title="Seleccione metodología"
      :visible.sync="dialogComponentP"
      append-to-body
      width="20em"
      top="10em"
      destroy-on-close
      custom-class="dialog-class"
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
          <el-col :span="24" style="border: 0px solid;">
            <el-button type="primary" @click="handleSelectComponentP">Seleccionar</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { mapGetters } from 'vuex'
import logTarifarito from '../../../../../../assets/logo_buho.png'
import viewG from './component-g.vue'
import viewT from './component-t.vue'
import ViewP015 from './component-p-015'
import ViewP097 from './component-p-097'
import viewDtun from './component-dtun.vue'
import viewR from './component-r.vue'
import viewC from './component-c.vue'
import viewCu from './component-cu.vue'
import componentsTable from '../options/componentsTable'

import { CONSTANTS } from '../../../../../../constants/constants'

export default {
  closename: 'ViewGridCu',
  components: {
    viewG,
    viewT,
    ViewP015,
    ViewP097,
    viewDtun,
    viewR,
    viewC,
    viewCu
  },
  props: {
    msgviewparent: {
      type: Object,
      default: function() {
        return { Component: null }
      }
    }
  },
  data() {
    return {
      modulo: null,
      currentView: null,
      logo: logTarifarito,
      tableData: componentsTable,
      multipleSelection: [],
      loading: false,
      search: '',
      viewCpteVisible: false,
      optionsMes: CONSTANTS.optionsMes,
      value_ano: '',
      value_mes: '',
      cod_empresa: '',
      nombre_empresa: '',
      dialogComponentP: false,
      radioCreg: '',
      componentSelect: {},
      colComponentes: CONSTANTS.columnComponents
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created() {
    this.initView()
  },
  methods: {
    initView() {
      console.log('DATAPARENT -> ', this.msgviewparent)
      this.tableData = this.msgviewparent.data
      this.nombre_empresa = this.msgviewparent.empresa
      this.value_ano = this.msgviewparent.ano
      this.value_mes = this.msgviewparent.mes
    },
    handleClickComponent(index, row, component) {
      row.ano = this.value_ano
      row.mes = this.value_mes
      console.log('Componente seleccionado -> ', row)
      this.componentSelect = row // Valores que se envian a la vista del componente
      if (component === 'g') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | NTPROP ${row.nt_prop} | Módulo generación`
        this.currentView = 'viewG'
        this.viewCpteVisible = true
      }
      if (component === 't') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | Módulo transmisión`
        this.currentView = 'viewT'
        this.viewCpteVisible = true
      }
      if (component === 'p') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | Componente pérdidas`
        this.dialogComponentP = true
      }
      if (component === 'dtun') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | Componente DTUN`
        this.currentView = 'viewDtun'
        this.viewCpteVisible = true
      }
      if (component === 'r') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | Módulo restricciones`
        this.currentView = 'viewR'
        this.viewCpteVisible = true
      }
      if (component === 'c') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | Módulo comercialización`
        this.currentView = 'viewC'
        this.viewCpteVisible = true
      }
      if (component === 'cu') {
        this.modulo = `${this.nombre_empresa} |	${row.mercado} | Módulo CU`
        this.currentView = 'viewCu'
        this.viewCpteVisible = true
      }
    },
    handleSelectComponentP() {
      this.dialogComponentP = false
      if (this.radioCreg === '1') {
        this.modulo = `${this.nombre_empresa} | Módulo pérdidas CREG 097`
        this.currentView = 'ViewP097'
        this.viewCpteVisible = true
      } else if (this.radioCreg === '2') {
        this.modulo = `${this.nombre_empresa} | Módulo pérdidas CREG 015`
        this.currentView = 'ViewP015'
        this.viewCpteVisible = true
      }
    },
    functionConfirmar() {
      console.log('Verificación en lote!')
    },
    getMes(value) {
      console.log(value)
      if (value) {
        const mes = this.optionsMes.find(element => element.value === value)
          .label
        return mes
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleClose(done) {
      this.$confirm('¿Realmente deseas cerrar la ventana?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeViewComponent() {
      this.currentView = null
      console.log('Se cerro vista de componente!')
    },
    closeViewGridCu() {
      this.$emit('clicked', false)
    },
    onClickChild(value) {
      console.log('onClickChildComponent: ', value) // someValue
      this.viewCpteVisible = value
      this.currentView = null
    }
  }
}
</script>

<style lang="scss">
	.dialog-component .el-dialog__header {
		padding-left: 5em;
		background-image: url("../../../../../../assets/logo_buho.png");
		background-repeat: no-repeat;
		background-size: 38px 42px;
		background-position-x: 1.5em;
		background-position-y: 0.5em;
	}

	.dialog-class {
		border-radius: 10px;
	}

	.dialog-class .el-dialog__header {
		border-radius: 10px 10px 0px 0px;
		background-image: url("../../../../../../assets/logo_buho.png");
		padding-left: 3.7em;
		background-repeat: no-repeat;
		background-size: 30px 35px;
		background-position-x: 1em;
		background-position-y: 0.8em;
	}

	.el-dialog {
		background-color: #f2f6fc;
	}

	.el-dialog__headerbtn .el-dialog__close {
		color: white;
	}

	.el-dialog__header {
		background-color: #304156;
		padding-bottom: 1em;
		// border-radius: 20px;
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

  .popover-cpte {
    color: black;
    background-color: #e3f2fd;
    border: 2px solid #4a148c;
  }

  .popover-cpte[x-placement^=top] .popper__arrow:after {
    border-top-color:#4a148c;
  }

	.text_popover {
		text-align: center;
		font-weight: bold;
		font-size: 125%;
		padding-bottom: 1%;
		border-bottom: 1px solid;
    background-image: url("../../../../../../assets/logo_buho.png");
    padding-left: 1.2em;
		background-repeat: no-repeat;
		background-size: 30px 35px;
		background-position-x: 1em;
		background-position-y: 0.5em;
	}

	// Pantallas superiores a 800px (PC)
	@media screen and (min-width: 800px) {
		.size-aside-md {
			margin-left: 1.5em;
		}

		.cont-btn {
			text-align: right;
		}

		.btnVerify {
			width: 12em;
		}
	}

	// Pantallas inferiores a 800px (mobile)
	@media screen and (max-width: 800px) {
		.cont-btn {
			padding-bottom: 0.5em;
		}

		.btnVerify {
			width: 100%;
		}
	}
</style>
