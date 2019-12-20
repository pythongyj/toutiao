<template>
  <div class="homeAside">
    <div class="homeImg">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu router background-color='#353b4e' text-color='#adafb5' active-text-color='#ffd04b'>
       <el-menu-item index='/home'>
       <i class="el-icon-eleme"></i>
       <span>首页</span>
       </el-menu-item>
      <el-submenu index='1'>
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
        <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index='2'>
        <template slot="title">
          <i class="el-icon-sugar"></i>
          <span >粉丝管理</span>
        </template>
        <el-menu-item index='/home/fans'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansgaikuang'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>
       <el-menu-item index='/home/account'>
       <i class="el-icon-s-custom"></i>
       <span slot="title">账户信息</span>
       </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.homeAside {
  .homeImg {
    background-color: #2e2f32;
    img {
      height: 50px;
      padding: 10px;
    }
  }
  .el-menu{
    border-right: none;
    text-align: left;
    .is-active{
      background-color: #409eff!important;
    }
  }
}
</style>
