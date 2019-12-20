<template>
  <el-container>
    <el-aside width='200px'>
      <home-aside></home-aside>
    </el-aside>
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-main>
        <!-- 耳机路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Aside from '../../components/home/homeAside'
// import Header from '../../components/home/homeHeader'
export default {
  // components: {
  //   'home-aside': Aside,
  //   'home-header': Header
  // }
}
</script>

<style lang='less' scoped>
.el-aside {
    background-color:#353b4e;
    text-align: center;
    height: 100vh;
  }
</style>
