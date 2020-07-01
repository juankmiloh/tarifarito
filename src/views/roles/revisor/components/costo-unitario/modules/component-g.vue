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
                    <!-- <input type="text" v-on:input="(event) => this.$emit('inputChange', event)"> -->
                  </aside>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <br>
        <div v-if="loadIputs" style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 43em; background-color: white; border-radius: 5px;"> <!-- valor pantalla super -->
          <!-- <div style="border: 2px solid #C0C4CC; color: black; overflow-y:scroll; height: 20em; background-color: white; border-radius: 5px;"> -->
          <el-row>
            <el-col :span="24" style="border: 0px solid; color: black; padding: 1%;">
              <el-card class="box-card" style="padding-left: 2em; padding-right: 2em; margin-bottom: 1em;">
                <el-row style="font-weight: bold; padding-bottom: 1%; text-align: center;">
                  <el-col style="border: 0px solid red; text-align: left;" :span="13">
                    <span>CONCEPTO</span> <span style="color: white;">{{ actualiza }}</span> <!-- No borrar el span, este componente permite renderizar la diferencia de valores -->
                  </el-col>
                  <el-col style="border: 0px solid red;" :span="2">
                    <span>UNIDAD</span>
                  </el-col>
                  <el-col style="border: 0px solid red;" :span="3">
                    <span>TARIFARITO</span>
                  </el-col>
                  <el-col style="border: 0px solid red;" :span="3">
                    <span>REVISIÓN</span>
                  </el-col>
                  <el-col style="border: 0px solid red;" :span="3">
                    <span>DIFERENCIA</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-collapse accordion>
                      <el-collapse-item v-for="item in components" :key="item.title" :name="item.name">
                        <template slot="title">
                          {{ item.title }}<i class="header-icon el-icon-information" />
                        </template>
                        <el-row v-for="value in item.data" :key="value.campo">
                          <el-col :span="13" style="padding-left: 2%; border: 0px solid blue;">
                            <span>{{ value.concepto }}</span>
                          </el-col>
                          <el-col style="border: 0px solid blue; text-align: center;" :span="2">
                            <span>{{ value.unidad }}</span>
                          </el-col>
                          <span v-for="valorInput in value.inputs" :key="valorInput.key">
                            <span v-if="valorInput.start === true && valorInput.diferencia === false">
                              <el-col v-if="valorInputDefault === valorInput.show" style="border: 0px solid yellow; text-align: center;" :span="3">
                                <input
                                  v-if="values[valorInput.key]"
                                  v-model="values[valorInput.key].values"
                                  :type="valorInput.type"
                                  :placeholder="valorInput.placeholder"
                                  style="width: 95%; height: 2em; margin-bottom: 0.5em;"
                                  :disabled="true"
                                  @input="diferencia(valorInput.key)"
                                >
                              </el-col>
                            </span>
                            <span v-else-if="valorInput.start === false && valorInput.diferencia === false">
                              <el-col v-if="valoresDiferencia === valorInput.show" style="border: 0px solid blue;" :span="3">
                                <input
                                  v-if="values[valorInput.key]"
                                  v-model="values[valorInput.key].values"
                                  :type="valorInput.type"
                                  :placeholder="valorInput.placeholder"
                                  :disabled="valorInput.disabled"
                                  style="width: 95%; height: 2em; margin-bottom: 0.5em;"
                                  @input="diferencia(valorInput.key); formula()"
                                >
                              </el-col>
                            </span>
                            <span v-else>
                              <el-col v-if="valoresDiferencia === valorInput.show" style="border: 0px solid red;" :span="3">
                                <input
                                  v-model="values[valorInput.key].values"
                                  :type="valorInput.type"
                                  :placeholder="valorInput.placeholder"
                                  :disabled="true"
                                  style="width: 95%; height: 2em; margin-bottom: 0.5em;"
                                >
                              </el-col>
                            </span>
                          </span>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding-top: 1%;">
      <el-col :span="15" style="border: 0px solid yellow;">
        <span>Componente TARIFARITO (El que esta bien) $/kWh</span>
        <el-input v-model="cpteCalculado" type="number" placeholder="" style="width: 30%; margin-left: 1%;" />
      </el-col>
      <el-col :span="15" style="border: 0px solid yellow;">
        <span>Componente publicado $/kWh</span>
        <el-input v-model="cptePublicado" placeholder="" style="width: 30%; margin-left: 1%;" />
      </el-col>
      <el-col :span="15" style="border: 0px solid yellow;">
        <span>Componente calculado revisión $/kWh</span>
        <el-input v-model="valuePruebas" type="number" placeholder="" style="width: 30%; margin-left: 1%;" />
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
          <i class="el-icon-info" style="color: #304156;" />
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logTarifarito from '../../../../../../assets/logo_buho.png'
import componentesGeneracion from './../options/componentsG'
import {
  getCpteGValues
} from '@/api/tarifarito/revisor/componentG'

export default {
  name: 'ViewG',
  props: {
    message: {
      type: Object,
      default: function() {
        return { message: null }
      }
    }
  },
  data() {
    return {
      logo: logTarifarito,
      valorInputDefault: true,
      valoresDiferencia: false,
      components: componentesGeneracion,
      input: 0,
      input1: 0,
      cptePublicado: 0,
      cpteCalculado: 0,
      valuePruebas: 0,
      values: [],
      actualiza: false,
      dataCpteG: [],
      keysValues: [],
      loadIputs: Boolean,
      modelValues: {
        campo16: [
          1,
          2,
          3,
          4,
          5,
          1,
          2,
          3,
          4,
          5
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      // Data enviada del padre
      const dataParentG = JSON.parse(JSON.stringify(this.message))
      // Se traen valores de variables
      console.log('dataParentG --> ', dataParentG)
      this.cptePublicado = parseFloat(dataParentG.componentes[0].component_g[0].cpte_publicado).toFixed(3)
      this.cpteCalculado = parseFloat(dataParentG.componentes[0].component_g[0].cpte_calculado).toFixed(3)
      console.log(this.cptePublicado)
      await getCpteGValues(dataParentG).then((response) => {
        this.modelValues = JSON.parse(JSON.stringify(response[0].values))
        // console.log('respons: ', this.modelValues)
        this.initInputs()
        this.loadIputs = true
        this.formula()
      })
    },
    initInputs() {
      const valores = []
      let diferencia = 0
      this.keysValues = Object.keys(this.modelValues)
      // console.log('LLAVE: ', this.keysValues)
      this.components.forEach((item, index) => {
        item.data.forEach((input, idx) => {
          input.inputs.forEach(campo => {
            if (campo.diferencia === false) {
              valores.push(campo.value)
              this.values[campo.key] = {
                placeholder: campo.placeholder,
                show: campo.show,
                values: this.modelValues[this.keysValues[index]][idx]
              }
            } else {
              diferencia = valores[0] - valores[1]
              this.values[campo.key] = {
                placeholder: campo.placeholder,
                show: campo.show,
                values: diferencia
              }
            }
          })
        })
      })
      // console.log('VALUES ->> ', this.values)
    },
    diferencia(key) {
      // hacer que esta funcion se ejecute cuando se modifique un valor de un input , ejecutar en la funcion formula , acondicionarla con un foreach
      this.actualiza = false // sirve para renderizar el nuevo valor, no quitar
      const splitKey = key.split('_')
      const idKey = splitKey[0]
      const KeyOne = idKey + '_' + 1
      const KeyTwo = idKey + '_' + 2
      const KeyThree = idKey + '_' + 3
      const valor1 = this.values[KeyOne].values
      const valor2 = this.values[KeyTwo].values
      this.values[KeyThree].values = valor1 - valor2
      // console.log('Values: ', this.values)
      this.actualiza = true
    },
    calcular() {
      this.valoresDiferencia = true
    },
    verificar() {
      this.valoresDiferencia = false
    },
    formula() {
      this.valuePruebas = null
      // console.log('CAMPO16 --> ', parseFloat(this.values['c16_2'].values))
      const campo16 = parseFloat(this.values['c12_2'].values) + parseFloat(this.values['c13_2'].values) + parseFloat(this.values['c14_2'].values) + parseFloat(this.values['c15_2'].values)
      const campo17 = Math.min(1, (parseFloat(this.values['c1_2'].values) + parseFloat(this.values['c3_2'].values)) / campo16)
      const campo22 = (parseFloat(this.values['c4_2'].values) + parseFloat(this.values['c6_2'].values)) / (parseFloat(this.values['c1_2'].values) + parseFloat(this.values['c3_2'].values))
      const campo18 = 1 - campo17
      const campo23 = parseFloat(this.values['c8_2'].values) / parseFloat(this.values['c7_2'].values)
      const campo21 = parseFloat(this.values['c19_2'].values) + parseFloat(this.values['c20_2'].values)
      const campo11 = parseFloat(this.values['c9_2'].values) + parseFloat(this.values['c10_2'].values)
      const campo29 = campo17 * ((parseFloat(this.values['c25_2'].values) * campo22) + (1 - parseFloat(this.values['c25_2'].values)) * campo11)
      const campo30 = (1 - campo17 - campo21) * campo23
      const campo28 = campo29 + campo30 + parseFloat(this.values['c24_2'].values) + parseFloat(this.values['c26_2'].values)

      this.values['c16_2'].values = campo16
      this.values['c17_2'].values = campo17
      this.values['c22_2'].values = campo22
      this.values['c18_2'].values = campo18
      this.values['c23_2'].values = campo23
      this.values['c21_2'].values = campo21
      this.values['c11_2'].values = campo11
      this.values['c29_2'].values = campo29
      this.values['c30_2'].values = campo30
      this.values['c28_2'].values = campo28

      // console.log('campo28 --> ', campo28)
      this.valuePruebas = campo28.toFixed(3)
      console.log('MODEL --> ', this.values)
    },
    reportar() {
      this.valoresDiferencia = false
      this.$alert('La empresa no reporto los ajustes aplicados', 'TARIFARITO REPORTA', {
        confirmButtonText: 'Aceptar',
        callback: action => {
          this.$emit('clicked', false)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .el-collapse-item__content{
    padding-bottom: 1.5%;
  }
</style>
