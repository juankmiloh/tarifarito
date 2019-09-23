<template>
  <div class="login-container">

    <el-row>
      <el-col :span="8" style="border: 0px solid red; ">
        <el-row>
          <el-col :span="24" style="border: 0px solid;">
            <div class="grid-logoTarifarito">
              <img :src="logTarifarito" alt="Tarifarito" class="imgLogtarifarito">
            </div>
          </el-col>
          <el-col :span="24" style="border: 0px solid;">
            <div class="grid-textoTarifarito">
              <span class="letraT">T</span><span class="otrasLetras"><b>ARIFARITO</b></span>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="16" style="border: 0px solid; z-index: 1;">

        <el-row>
          <el-col :span="24" style="border: 0px solid;">
            <div class="grid-logoSuper">
              <img :src="logSuper" alt="Superservicios" class="logoSuper">
              <div class="grid-textSuper">
                <span style="font-size: 250%;"><b>Superservicios</b></span><br>
                <span style="font-size: 130%;">Superintendencia de Servicios</span><br>
                <span style="font-size: 130%;">Públicos Domiciliarios</span>
              </div>  
            </div>
          </el-col>
        </el-row>

        <el-row> <!-- form -->
          <el-col :span="24" style="border: 0px solid;">
            <div class="grid-form">
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  class="input_user"
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="Usuario"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-tooltip v-model="capsTooltip" content="Mayúscula" placement="right" manual>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Contraseña"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>
              </el-tooltip>

              <div style="text-align: right;">
                <el-button :loading="loading" class="btnLogin" @click.native.prevent="handleLogin">Ingresar</el-button>
              </div>

            </el-form>
            </div>
          </el-col>
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<style>
  .imgLogtarifarito{
    position: relative;
    height: 250px;
    z-index: 100;
  }

  .grid-textoTarifarito{
    /* border-top: 2.5px solid; */
    text-align: center;    
    padding-left: 65%;
    margin-top: -1%;
    z-index: -1;
  }

  .grid-textoTarifarito .letraT{
    font-size: 284%;
    position: relative;
    left: -12px;
    top: -16px;
  }

  .grid-textoTarifarito .otrasLetras{
    border-top: 3.7px solid;
    font-size: 200%;
    position: relative;
    left: -22px;
    top: -16.5px;
  }
  
  .grid-logoTarifarito {
    border: 0px solid;
    text-align: center;
    padding-top: 43%;
    padding-left: 60%;
    z-index: 100;
    /* width: 100%; */
    /* height: 95vh; */
    /* display:flex; */
    /* align-items: center; */
    /* margin-left: 30%; */
  }

  .grid-textSuper{
    text-align: center;
  }

  .grid-logoSuper{
    padding-top: 5%;
    margin-right: 15%;
  }

  .logoSuper{
    height: 150px;
    margin: auto;
    display: block !important;
  }

  .grid-form{
    padding-top: 3%;
    margin-right: 15%;
  }

  .btnLogin{
    width:100%;
    margin-bottom:30px;
    background:#353880;
    color:white;
  }

  .btnLogin:hover{
    background:#4b4d95;
    color:white;
  }

  .btnLogin:focus {
    background: #353880;
    color:white;
  }
</style>

<script>
  import { validUsername } from '@/utils/validate'
  import logSuper from '@/assets/superservicios1.png'
  import logTarifarito from '@/assets/logo_buho.png'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Por favor ingrese un usuario válido'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('La contraseña no puede ser menor a seis caracteres'))
        } else {
          callback()
        }
      }
      return {
        logSuper: logSuper,
        logTarifarito: logTarifarito,
        loginForm: {
          username: '',
          password: ''
          // password: '111111'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock({ shiftKey, key } = {}) {
        if (key && key.length === 1) {
          if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style lang="scss">

  $bg:#c4cbd0;
  $light_gray:black; //color texto del input
  $cursor: black; //color del cursor

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important; //color del cuadro de autocompletar
          -webkit-text-fill-color: $cursor !important;
        }
      }

      input::placeholder {
        color: #787f84;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1); //color de fondo del input
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: linear-gradient(to bottom, rgba(242,246,248,1) 0%, rgba(242,246,248,1) 27%, rgba(216,225,231,1) 51%, rgba(181,198,208,1) 99%, rgba(181,198,208,1) 100%);
  $dark_gray: black; // color iconos inputs
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    background: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      // padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
