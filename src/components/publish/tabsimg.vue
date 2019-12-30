<template>
  <el-tabs v-model="activeName" v-loading="loading">
    <el-tab-pane label="素材库" name="first">
      <div class="card-img">
        <el-card v-for="item in list" class="img-card-item" :key="item.id">
          <img @click="uplodeImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page.page"
          :page-size="page.per_page"
          :total="page.total_count"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="second">
      <el-upload :http-request="updataImg" class="avatar-uploader" action :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon iconAvatar"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'first',
      list: [],
      page: {
        page: 1,
        total_count: 0,
        per_page: 8
      },
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    // 上传图片
    updataImg (url) {
      console.log(url)
      this.loading = true
      let data = new FormData()
      data.append('image', url.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.loading = false
        this.$emit('uplodeImg', result.data.url)
      })
    },
    uplodeImg (url) {
      this.$emit('uplodeImg', url)
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.per_page
        }
      }).then(result => {
        this.list = result.data.results
        this.page.page = result.data.page
        this.page.per_page = result.data.per_page
        this.page.total_count = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.card-img {
  display: flex;
  flex-wrap: wrap;
  .img-card-item {
    width: 150px;
    height: 150px;
    margin: 10px 13px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.iconAvatar {
  font-size: 80px;
  padding: 20px;
  border: 2px dashed #eee;
  font-weight: 100;
  display: block;
  border-radius: 8px;
}
.avatar-uploader {
  text-align: center;
}
</style>
