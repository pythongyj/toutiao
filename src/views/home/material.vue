<template>
  <!-- <div>素材管理模块</div> -->
  <el-card  v-loading="loading" >
    <!-- 面包屑 -->
    <bread slot="header">
      <template slot="title">素材管理</template>
    </bread>
    <!-- 标签页 -->
    <div class="flTag">
      <el-tabs type="card" v-model="activeName" @tab-click="selectItem">
        <el-tab-pane name="all" label="全部">
          <!-- 列表项 -->
          <div class="imgList">
            <el-card class="cardItem" v-for="item in list" :key="item.id">
              <img :src="item.url" />
              <el-row type="flex" justify="space-between" align="middle" class="itenIcom">
                <i
                  @click="quxiaoOrShoucang(item)"
                  :style="{color:item.is_collected?'red':null}"
                  class="el-icon-star-on"
                ></i>
                <i @click="changeItem(item.id)" class="el-icon-delete-solid"></i>
              </el-row>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane name="collect" label="收藏">
          <!-- 列表项 -->
          <div class="imgList">
            <el-card class="cardItem" v-for="item in list" :key="item.id">
              <img :src="item.url" />
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-upload action="" :show-file-list="false" :http-request='uploadImg' class="uplodeBtn" >
        <el-button type="primary">上传图片</el-button>
      </el-upload>
    </div>
    <el-row type="flex" justify="center">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :page-size="page.per_page"
        :current-page="page.page"
        :total="page.total_count"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total_count: 0, // 总数
        page: 1, // 当前页
        per_page: 12 // 每页数量
      },
      loading: false
    }
  },
  methods: {
    // 切换页签时的事件
    selectItem () {
      this.getMaterial()
    },
    // 更改页面
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      // let collect =
      this.$axios({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.page,
          per_page: this.page.per_page
        } // 是否是收藏的图片 false 代表所有的数据  true代表收藏数据
      }).then(result => {
        this.list = result.data.results
        this.page.page = result.data.page
        this.page.per_page = result.data.per_page
        this.page.total_count = result.data.total_count
      })
    },
    // 取消或者收藏
    quxiaoOrShoucang (item) {
      this.$axios({
        url: `user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected
        }
      }).then(result => {
        this.getMaterial()
      })
    },
    // 删除
    changeItem (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?').then(() => {
        this.$axios({
          url: `user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      this.loading = true
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.loading = false
        this.getMaterial()
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
  .cardItem {
    width: 240px;
    height: 240px;
    margin: 20px 34px;
    position: relative;
    img {
      width: 100%;
    }
    i {
      cursor: pointer;
    }
    .itenIcom {
      height: 40px;
      background-color: #eee;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 20px;
      font-size: 20px;
    }
  }
}
.flTag {
  position: relative;
  .uplodeBtn {
    position: absolute;
    top: 0px;
    right: 0;
  }
}
// .uplodeBtn{

// }
</style>
