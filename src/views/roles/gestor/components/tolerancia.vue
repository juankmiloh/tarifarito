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
            <b>NIVEL DE TOLERANCIA</b>
          </span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="24" style="border: 0px solid red; text-align: center;">
            <el-select v-model="value1" placeholder="Año" @change="verifyVariable($event)">
              <el-option
                v-for="item in optionsAno"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="value2"
              :disabled="value1 == ''"
              placeholder="Mes"
              @change="verifyVariable($event)"
            >
              <el-option
                v-for="item in optionsMes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input-number
              v-model="variable"
              :disabled="disableVariable"
              :precision="2"
              :step="0.01"
              :min="0"
              :max="10"
              placeholder="Tolerancia"
              @change="verifyVariable('input')"
            />
            <el-button
              :disabled="disableModify"
              type="primary"
              :loading="loadingModify"
              icon="el-icon-refresh"
              class="btnLogin"
              @click.native.prevent="modifyVariable"
            >Modificar</el-button>
          </el-col>
        </div>
      </el-card>

      <el-col :span="24" style="border: 0px solid red; text-align: center; padding: 10px;">
        <el-button
          :disabled="disableLoad"
          type="success"
          :loading="loadingLoad"
          icon="el-icon-check"
          class="btnLogin"
          round
          @click.native.prevent="saveVariable"
        >Cargar</el-button>
      </el-col>
    </el-row>
    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" content="subir">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BackToTop from '@/components/BackToTop'
import { Message } from 'element-ui'
import { CONSTANTS } from '../../../../constants/constants'
import {
  getNTolerancia,
  postNTolerancia,
  putNTolerancia
} from '@/api/gestor/tolerancia'

export default {
  name: 'ViewTolerancia',
  components: { BackToTop },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px',
        background: '#e7eaf1'
      },
      disableLoad: true,
      disableModify: true,
      disableVariable: true,
      loadingLoad: false,
      loadingModify: false,
      optionsAno: CONSTANTS.optionsAno,
      optionsMes: CONSTANTS.optionsMes,
      value1: '',
      value2: '',
      variable: '',
      date: new Date()
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created() {},
  methods: {
    async verifyVariable(evt) {
      await getNTolerancia(this.value1).then(response => {
        if (response.length > 0 && this.value2 !== '') {
          const mes = this.optionsMes[this.value2 - 1].key
          if (response[0].meses.hasOwnProperty(mes)) {
            if (evt !== 'input') {
              const length = response[0].meses[mes].length - 1
              const valueVariable = response[0].meses[mes][length].n_tolerancia
              if (valueVariable >= 0) {
                this.variable = valueVariable
                this.disableVariable = false
                this.disableLoad = true
                this.disableModify = false
              }
            } else {
              this.disableModify = false
            }
          } else {
            if (evt !== 'input') {
              this.disableVariable = false
              this.disableLoad = false
              this.disableModify = true
              this.variable = 0
            }
          }
        } else if (response.length === 0 && this.value2 !== '') {
          if (evt !== 'input') {
            this.disableVariable = false
            this.disableLoad = false
            this.disableModify = true
            this.variable = 0
          }
        }
      })
    },
    async modifyVariable() {
      this.loadingModify = true
      const anio = this.value1
      const mes = this.optionsMes[this.value2 - 1].key
      const model = {
        fecha_modif: this.date,
        n_tolerancia: this.variable
      }
      await putNTolerancia(anio, mes, model).then(response => {
        this.disableModify = true
        Message({
          message: 'Registro actualizado con éxito!',
          type: 'success',
          duration: 5 * 1000
        })
        this.loadingModify = false
      })
    },
    async saveVariable() {
      this.loadingLoad = true
      const anio = parseInt(this.value1)
      const mes = this.optionsMes[this.value2 - 1].key
      await getNTolerancia(this.value1).then(async response => {
        if (response.length === 0) {
          const model = {
            anio: anio,
            meses: {
              [mes]: [
                {
                  fecha_modif: this.date,
                  n_tolerancia: this.variable
                }
              ]
            }
          }
          await postNTolerancia(model).then(response => {
            this.loadingLoad = false
            this.disableLoad = true
            Message({
              message: 'Registro guardado con éxito!',
              type: 'success',
              duration: 5 * 1000
            })
          })
        } else {
          const model = {
            fecha_modif: this.date,
            n_tolerancia: this.variable
          }
          await putNTolerancia(anio, mes, model).then(response => {
            Message({
              message: 'Registro guardado con éxito!',
              type: 'success',
              duration: 5 * 1000
            })
          })
          this.loadingLoad = false
          this.disableLoad = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.placeholder-container div {
		margin: 10px;
	}
</style>
