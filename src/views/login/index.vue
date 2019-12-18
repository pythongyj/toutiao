<template>
  <div class="loginImg">
    <el-card class="loginCard">
      <div class="logo">
        <img src="..//../assets/img/logo_index.png" alt />
      </div>
      <el-form>
          <el-form-item>
              <el-input></el-input>
          </el-form-item>
          <el-form-item>
              <el-input class="loginCode"></el-input>
              <el-button class="loginGetCode" plain>获取验证码</el-button>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" class="submint">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scope>
.loginImg {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginCard {
    width: 400px;
    height: 300px;
    .logo{
        text-align: center;
        margin-bottom: 30px;
        img{
            height: 40px;
        }
    }
    .loginCode{
        width: 60%;
    }
    .loginGetCode{
        float: right;
    }
    .submint{
        width: 100%;
    }
  }
}
</style>
