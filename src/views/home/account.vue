<template>
  <el-card v-loading='loading'>
    <bread slot="header">
      <template slot="title">账户信息</template>
    </bread>
    <el-row type="flex" justify="space-around">
      <el-form ref="myForm" :model="formData" :rules="rules" class="a" label-width="100px">
        <el-form-item prop="name" label="用户名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="简介">
          <el-input v-model="formData.intro"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input disabled v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存信息</el-button>
        </el-form-item>
      </el-form>
      <el-upload action :show-file-list="false" :http-request="uploadImg" class="upImg">
        <img :src="formData.photo ? formData.photo : defaultImg" alt />
      </el-upload>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/img/login_bg3.jpg'),
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名' }
        ],
        intro: [
          { required: true, message: '请输入简介' }
        ],
        email: [
          { required: true, message: '请输入邮箱' }
        ]
      }
    }
  },
  methods: {
    save () {
      this.$refs.myForm.validate().then(result => {
        if (result) {
          this.$axios({
            url: '/user/profile',
            method: 'PATCH',
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getProfile()
          })
        }
      })
    },
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'PATCH',
        data
      }).then(result => {
        this.loading = false
        this.formData.photo = result.data.photo
      })
    },
    getProfile () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getProfile()
  }
}
</script>

<style lang="less" scoped>
.upImg {
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-top: 30px;
  }

}
  .el-form-item {
    width: 500px;
    .el-input {
      width: 100%;
    }
  }
</style>
