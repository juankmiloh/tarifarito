<template>
  <div class="div-cont">
    <el-row class="cont-row">
      <el-col :span="24">
        <aside>
          <span class="text-header">
            <b>DIRECCIÓN TÉCNICA DE GESTIÓN DE ENERGÍA</b>
          </span>
        </aside>
      </el-col>
      <el-col :span="24">
        <aside>
          <span class="text-user">
            <b>{{ name }}</b>
          </span>
        </aside>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text-page">
          <b>INFORMACIÓN COMERCIAL</b>
        </span>
      </div>
      <el-row :gutter="10">
        <el-col :sm="24" :md="12" class="cont-col-right">
          <el-select v-model="value1" placeholder="Año" class="select" @change="verifyVariable($event)">
            <el-option
              v-for="item in optionsAno"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-select
            v-model="value2"
            placeholder="Empresa"
            class="select"
            @change="verifyVariable($event)"
          >
            <el-option
              v-for="item in optionsEmpresa"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card margin-card">
      <el-row class="cont-row">
        <el-col :sm="24" :md="24">
          <el-row>
            <el-col :sm="24" :md="24">
              <el-tooltip
                class="item"
                effect="dark"
                content="Factor de productividad acumulado."
                placement="top"
              >
                <i class="el-icon-info" style="color: #304156;" />
              </el-tooltip>
              <label for="input1">Factor de productividad</label>
            </el-col>
            <el-col :sm="24" :md="24" class="input-padding">
              <el-select v-model="value3" class="input-select">
                <el-option
                  v-for="item in optionsFactor"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                class="btn-plain"
                plain
                @click="dialogFormVisible = true"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="24" :md="24" class="cont-input">
          <el-row>
            <el-col :sm="24" :md="24">
              <el-tooltip class="item" effect="dark" content="Prima de riesgo de cartera." placement="top">
                <i class="el-icon-info" style="color: #304156;" />
              </el-tooltip>
              <label for="input2">RCNU</label>
            </el-col>
            <el-col :sm="24" :md="24" class="input-padding">
              <el-input-number
                id="input2"
                v-model="input2"
                :disabled="disableVariable"
                :precision="2"
                :step="0.01"
                :min="0"
                :max="100"
                class="input-number"
                @change="verifyVariable('input_variable')"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="24" :md="24" class="cont-input">
          <el-row>
            <el-col :sm="24" :md="24">
              <el-tooltip
                class="item"
                effect="dark"
                content="Costo de la contribución liquidado al comercializador minorista."
                placement="top"
              >
                <i class="el-icon-info" style="color: #304156;" />
              </el-tooltip>
              <label for="input3">Contribución CREG</label>
            </el-col>
            <el-col :sm="24" :md="24" class="input-padding">
              <el-input-number
                id="input3"
                v-model="input3"
                :disabled="disableVariable"
                :precision="2"
                :step="0.01"
                :min="0"
                :max="100"
                class="input-number"
                @change="verifyVariable('input_variable')"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="24" :md="24" class="cont-input">
          <el-row>
            <el-col :sm="24" :md="24">
              <el-tooltip
                class="item"
                effect="dark"
                content="Costo de la contribución liquidado al comercializador minorista."
                placement="top"
              >
                <i class="el-icon-info" style="color: #304156;" />
              </el-tooltip>
              <label for="input4">Contribución SSPD</label>
            </el-col>
            <el-col :sm="24" :md="24" class="input-padding">
              <el-input-number
                id="input4"
                v-model="input4"
                :disabled="disableVariable"
                :precision="2"
                :step="0.01"
                :min="0"
                :max="100"
                class="input-number"
                @change="verifyVariable('input_variable')"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="24" :md="24" class="cont-input">
          <el-row>
            <el-col :sm="24" :md="24">
              <label for="input5">N° Resolución CREG</label>
            </el-col>
            <el-col :sm="24" :md="24" class="input-padding">
              <el-input-number
                id="input5"
                v-model="input5"
                :disabled="disableVariable"
                :precision="2"
                :step="0.01"
                :min="0"
                :max="100"
                class="input-number"
                @change="verifyVariable('input_variable')"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="24" :md="24" class="cont-input">
          <el-row>
            <el-col :sm="24" :md="24">
              <label for="input6">N° Radicado SSPD</label>
            </el-col>
            <el-col :sm="24" :md="24" class="input-padding">
              <el-input-number
                id="input6"
                v-model="input6"
                :disabled="disableVariable"
                :precision="2"
                :step="0.01"
                :min="0"
                :max="100"
                class="input-number"
                @change="verifyVariable('input_variable')"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-divider />

      <el-row :gutter="10">
        <el-col :sm="24" :md="12" class="cont-col-right">
          <el-button
            :disabled="disableModify"
            type="primary"
            icon="el-icon-refresh"
            :loading="loadingModify"
            class="btn"
            @click.native.prevent="modifyVariable"
          >Modificar</el-button>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-button
            :disabled="disableLoad"
            type="success"
            icon="el-icon-check"
            :loading="loadingLoad"
            class="btn"
            @click.native.prevent="saveVariable"
          >Cargar</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- dialog agregar factor de productividad -->
    <el-dialog
      title="Agregar"
      :visible.sync="dialogFormVisible"
      width="20em"
    >
      <el-card class="cont-row" style="margin-top: 1.2em;">
        <el-row>
          <el-col :sm="24" :md="24">
            <label for="input1">Factor de productividad</label>
          </el-col>
          <el-col :sm="24" :md="24" class="input-padding">
            <el-input-number
              id="input1"
              v-model="input1"
              :disabled="disableVariable"
              :precision="2"
              :step="0.01"
              :min="0"
              :max="100"
              class="input-number"
              @change="verifyVariable('input_variable')"
            />
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :sm="24" :md="24">
            <el-button
              type="success"
              icon="el-icon-check"
              :loading="loadingFP"
              class="btn"
              @click="functionConfirmar"
            >Guardar</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>

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
import { CONSTANTS } from '../../../../constants/constants'

export default {
  name: 'ViewInfoComercial',
  components: { BackToTop },
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      loadingFP: false,
      myBackToTopStyle: CONSTANTS.myBackToTopStyle,
      optionsAno: CONSTANTS.optionsAno,
      optionsEmpresa: CONSTANTS.optionsEmpresa,
      optionsFactor: CONSTANTS.optionsFactor,
      value1: '',
      value2: '',
      value3: '',
      inputDialog: '',
      input1: 0,
      input2: 0,
      input3: 0,
      input4: 0,
      input5: 0,
      input6: 0
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created() {},
  methods: {
    handleClose(done) {
      this.$confirm('¿Realmente deseas cerrar la ventana?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    functionConfirmar() {
      this.loadingFP = true
      this.optionsFactor.push({
        value: this.input1,
        label: this.input1
      })
      this.loadingFP = false
      this.dialogFormVisible = false
      this.value3 = this.input1
      this.input1 = 0
    }
  }
}
</script>

<style lang="scss" scoped>
	.text-header {
		color: black;
	}

	.div-cont {
		padding: 1em;
	}

	.margin-card {
		margin-top: 1em;
	}

	.cont-row {
		text-align: center;
	}

	.input-padding {
		padding-top: 0.5em;
	}

  .dialog-style {
    border: 1px solid red;
  }

	// Pantallas superiores a 800px (PC)
	@media screen and (min-width: 800px) {
		.text-header {
			font-size: x-large;
		}

		.text-user {
			font-size: large;
		}

		.text-page {
			font-size: large;
		}

		.cont-col-right {
			text-align: right;
		}

		.select {
			width: 13em;
		}

		.input-number {
			width: 17em;
		}

		.btn {
			width: 10em;
		}

		.cont-input {
			padding-top: 1.5em;
		}

		.input-select {
			width: 13em;
		}
	}

	// Pantallas inferiores a 800px (mobile)
	@media screen and (max-width: 800px) {
		.text-header {
			font-size: small;
		}

		.text-user {
			font-size: small;
		}

		.text-page {
			font-size: small;
		}

		.cont-col-right {
			padding-bottom: 0.5em;
		}

		.select {
			width: 100%;
		}

		.input-number {
			width: 100%;
		}

		.btn {
			width: 100%;
		}

		.cont-input {
			padding-top: 1em;
		}

		.input-select {
			width: 77%;
		}

		.btn-plain {
			width: 21%;
		}
	}
</style>
