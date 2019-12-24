<template>
  <!-- <div>素材管理模块</div> -->
  <el-card>
    <!-- 面包屑 -->
    <bread slot="header">
      <template slot="title">素材管理</template>
    </bread>
    <!-- 标签页 -->
    <el-tabs type="card" v-model="activeName" @tab-click="selectItem">
      <el-tab-pane name="all" label="全部">
        <!-- 列表项 -->
        <div class="imgList">
          <el-card class="cardItem" v-for="item in list" :key="item.id">
            <img :src="item.url" />
            <el-row type="flex" justify="space-between" align="middle" class="itenIcom">
              <i class="el-icon-delete-solid"></i>
              <i class="el-icon-star-on"></i>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect',
      collect: false, // 是否是收藏的图片
      list: []
    }
  },
  methods: {
    selectItem (tab, event) {
      console.log(tab, event)
    },
    getMaterial () {
      this.$axios({
        url: 'user/images',
        params: { collect: this.collect }
      }).then(result => {
        this.list = result.data.results
        console.log(result)
        console.log(this.list)
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
</style>
