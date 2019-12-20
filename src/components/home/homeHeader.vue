<template>
  <el-row class="layout-header">
    <el-col class="left" :span="12">
      <i class="el-icon-s-unfold"></i>
      <span>葛运杰个人博客系统</span>
    </el-col>
    <el-col class="right" :span="12">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ? userInfo.photo:defImg" alt />
        <el-dropdown @command="clickList">
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">github</el-dropdown-item>
            <el-dropdown-item command="goBack">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defImg: require('../../assets/img/login_bg4.jpg')
    }
  },
  methods: {
    goBack () {},
    clickList (command) {
      if (command === 'userinfo') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/pythongyj/toutiao'
      } else if (command === 'goBack') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    let token = window.localStorage.getItem('user-token')
    console.log(token)
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data
      console.log(this.userInfo)
    }).catch(() => {

    })
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  margin: 8px 0;
  .left {
    span {
      margin-left: 8px;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
