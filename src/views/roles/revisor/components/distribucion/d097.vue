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
          <span><b>COMPONENTE D | CREG 097</b></span>
        </div>
        <div style="margin-bottom:200px;">
          <el-col :span="24" style="border: 0px solid red; text-align: center;">
            <el-select v-model="value1" clearable placeholder="Año">
              <el-option
                v-for="item in optionsAno"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select><br><br>
            <el-select v-model="value2" clearable placeholder="Mes">
              <el-option
                v-for="item in optionsMes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select><br><br>
            <el-select v-model="value3" clearable placeholder="Empresa">
              <el-option
                v-for="item in optionsEmpresa"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select><br><br>
            <el-tooltip class="item" effect="dark" content="Nivel de tensión y propiedad del activo del CU a consultar." placement="left" style="margin-left: -1.3em;">
              <i class="el-icon-info" style="color: #304156;" />
            </el-tooltip>
            <el-select v-model="value4" clearable placeholder="NT - PRO">
              <el-option
                v-for="item in optionsNTPRO"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </div>
      </el-card>

      <el-col :span="24" style="border: 0px solid red; text-align: right; padding: 10px;">
        <el-button type="success" icon="el-icon-check" :loading="false" round>Consultar</el-button>
      </el-col>
    </el-row>

    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" content="subir">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import meses from './options/optionsMes'
import anos from './options/optionsAno'
import empresas from './options/optionsEmpresa'

export default {
  name: 'D097',
  data() {
    return {
      optionsAno: anos,
      optionsMes: meses,
      optionsEmpresa: empresas,
      optionsNTPRO: [{
        value: '0',
        label: 'Opción 1'
      }, {
        value: '1',
        label: 'Opción 2'
      }, {
        value: '2',
        label: 'Opción 3'
      }],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px',
        background: '#e7eaf1'
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

  }
}
</script>

<style lang="scss" scoped>
  .placeholder-container div {
    margin: 10px;
  }
</style>
