<template>
  <div class="loginImg">
    <el-card class="loginCard">
      <div class="logo">
        <img src="..//../assets/img/logo_index.png" alt />
      </div>
      <el-form ref="myform" :model="formData" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formData.code" class="loginCode" placeholder="请输入您的验证码"></el-input>
          <el-button class="loginGetCode" plain>获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="reads">
          <el-checkbox v-model="formData.reads">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="submint">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rules, value, callback) {
      value
        ? callback()
        : callback(new Error('您必须阅读并同意用户协议和隐私条款才能登录'))
    }
    return {
      formData: {
        mobile: '',
        code: '',
        reads: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入您的手机号码' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码不合法，请重新输入'
          }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码不合法，请重新输入' }
        ],
        reads: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myform.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.formData
          })
            .then(result => {
              // console.log('验证成功，开始请求后台数据', result.data.data.token)
              window.localStorage.setItem(
                'user-token', result.data.token
              )
              this.$router.push({ path: '/home' })
            })
            .catch(() => {
              this.$message({
                message: '手机号或验证码错误',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.loginImg {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginCard {
    width: 450px;
    height: 350px;
    .logo {
      text-align: center;
      margin-bottom: 30px;
      img {
        height: 40px;
      }
    }
    .loginCode {
      width: 70%;
    }
    .loginGetCode {
      float: right;
    }
    .submint {
      width: 100%;
    }
  }
}
</style>
