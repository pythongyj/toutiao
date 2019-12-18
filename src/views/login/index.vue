<template>
  <div class="loginImg">
    <el-card class="loginCard">
      <div class="logo">
        <img src="..//../assets/img/logo_index.png" alt />
      </div>
      <el-form>
        <el-form-item>
          <el-input v-model="formData.phone" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.code" class="loginCode" placeholder="请输入您的验证码"></el-input>
          <el-button class="loginGetCode" plain>获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formData.reads">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submint">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        phone: '',
        code: '',
        reads: true
      }
    }
  }
}
</script>

<style lang='less' scope>
.loginImg {
  background-image: url("../../assets/img/login_bg.jpg");
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
