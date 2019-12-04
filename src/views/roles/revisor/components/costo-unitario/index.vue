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
          <p>valor del hijo: {{ valor }}</p>
        </div>
        <div style="margin-bottom:145px;">
          <el-col :span="24" style="border: 0px solid red; text-align: center;">
            <el-select v-model="value_ano" clearable placeholder="Año">
              <el-option
                v-for="item in optionsAno"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select><br><br>
            <el-select v-model="value_mes" clearable placeholder="Mes">
              <el-option
                v-for="item in optionsMes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select><br><br>
            <el-select v-model="value_empresa" clearable placeholder="Empresa">
              <el-option
                v-for="item in optionsEmpresa"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
        <!-- Se carga la vista de los diferentes componentes -->
        <el-dialog
          :title="modulo"
          :before-close="handleClose"
          :visible.sync="innerVisible"
          append-to-body
          width="100%"
          top="0"
          height="100vh"
        >
          <!-- <component :is="currentView" v-on:inputChange="handleChange" @clicked="onClickChild"/> -->
          <component
            :is="currentView"
            @clicked="onClickChild"
          />
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
                        <el-col :span="8"><span><b>AÑO:</b> {{ value_ano }}</span></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8"><span><b>MES:</b> {{ getTextSelectMes(value_mes) }}</span></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8"><span><b>TOLERANCIA:</b> 1</span></el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="4" style="border: 0px solid; color: black; text-align: center; padding-right: 2%;">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="Buscar"
                      />
                    </el-col>
                  </el-row>

                  <el-table
                    :default-sort="{prop: 'nt_pro', order: 'ascending'}"
                    :data="tableData.filter(data => !search || data.mercado.toLowerCase().includes(search.toLowerCase()))"
                    height="53vh"
                    style="width: 100%; height: 100%;"
                  >
                    <el-table-column
                      prop="idmercado"
                      label="ID Mercado"
                      width="180"
                      sortable
                    />
                    <el-table-column
                      prop="mercado"
                      label="Nombre Mercado"
                      width="240"
                      sortable
                    />
                    <el-table-column
                      prop="nt_pro"
                      label="NT - PRO"
                      width="150"
                      sortable
                    />
                    <el-table-column label="G">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_g" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_g[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_g[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_g[0].value)"
                          />
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="T">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_t" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_t[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_t[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_t[0].value)"
                          />
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="P">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_p" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_p[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_p[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_p[0].value)"
                          />
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="Dtun">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_dtun" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_dtun[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_dtun[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_dtun[0].value)"
                          />
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="R">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_r" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_r[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_r[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_r[0].value)"
                          />
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="C">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_c" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_c[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_c[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_c[0].value)"
                          />
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="Cu">
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="230"
                          trigger="hover"
                        >
                          <div style="color: black;">
                            <div class="text_popover">Tarifarito Informa</div>
                            <div v-for="item in scope.row.component_cu" :key="item.value" style="padding-top: 3%;">
                              <label>Componente Publicado: </label>${{ item.cpte_publicado }}<br>
                              <label>Componente Calculado: </label>${{ item.cpte_calculado }}<br>
                              <label>Diferencia: </label>${{ item.cpte_diferencia }}
                            </div>
                          </div>
                          <el-button
                            v-if="scope.row.component_cu[0].cpte_diferencia === 0"
                            slot="reference"
                            type="success"
                            icon="el-icon-check"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_cu[0].value)"
                          />
                          <el-button
                            v-else
                            slot="reference"
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click="handleClickComponent(scope.$index, scope.row, scope.row.component_cu[0].value)"
                          />
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
          <el-col :span="15" style="border: 1px solid transparent;" />
          <el-col :span="9" style="text-align: right; border: 0px solid;">
            <el-button @click="dialogFormVisible = false">Cancelar</el-button>
            <el-button type="primary" @click="functionConfirmar">Verificación en lote</el-button>
            <el-tooltip class="item" effect="dark" content="Se cerrará la verificación de los componentes que no superaron los niveles de tolerancia establecidos." placement="top-start">
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
import viewP from './modules/component-p.vue'
import viewDtun from './modules/component-dtun.vue'
import viewR from './modules/component-r.vue'
import viewC from './modules/component-c.vue'
import viewCu from './modules/component-cu.vue'

import meses from './options/optionsMes'
import anos from './options/optionsAno'
import componentsTable from './options/componentsTable'
import empresas from './options/optionsEmpresa'

export default {
  name: 'ViewCostoUnitario',
  components: { BackToTop, viewG, viewT, viewP, viewDtun, viewR, viewC, viewCu },
  data() {
    return {
      valor: 'hello',
      modulo: null,
      currentView: null,
      logo: logTarifarito,
      tableData: componentsTable,
      search: '',
      dialogFormVisible: false,
      innerVisible: false,
      optionsAno: anos,
      optionsMes: meses,
      optionsEmpresa: empresas,
      value_ano: '',
      value_mes: '',
      value_empresa: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    onClickChild(value) {
      console.log(value) // someValue
      this.innerVisible = value
    },
    handleChange(event) {
      const { value } = event.target
      this.valor = value
    },
    handleClickComponent(index, row, component) {
      console.log(index, row, component)
      console.log('componente seleccionado -> ' + component)
      if (component === 'g') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Módulo Generación'
        this.currentView = 'viewG'
        this.innerVisible = true
      }
      if (component === 't') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Módulo transmisión datos publicados'
        this.currentView = 'viewT'
        this.innerVisible = true
      }
      if (component === 'p') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Módulo Perdidas'
        this.currentView = 'viewP'
        this.innerVisible = true
      }
      if (component === 'dtun') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Componente DTUN'
        this.currentView = 'viewDtun'
        this.innerVisible = true
      }
      if (component === 'r') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Módulo Restricciones'
        this.currentView = 'viewR'
        this.innerVisible = true
      }
      if (component === 'c') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Módulo Comercialización'
        this.currentView = 'viewC'
        this.innerVisible = true
      }
      if (component === 'cu') {
        this.modulo = this.getTextSelectEmpresa(this.value_empresa) + ' - ' + row.mercado + ' | Módulo CU'
        this.currentView = 'viewCu'
        this.innerVisible = true
      }
    },
    handleClose(done) {
      // console.log('click en el botón cerrar: ', done);
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
      for (let i = 0; i < this.optionsEmpresa.length; i++) {
        if (this.optionsEmpresa[i].value === val) {
          // console.log(this.optionsEmpresa[i].label);
          return this.optionsEmpresa[i].label
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
    }
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
