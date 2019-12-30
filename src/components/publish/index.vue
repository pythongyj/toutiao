<template>
  <div class="cover-img">
    <div class="cover-img-item" v-for="(item,index) in list" :key="index">
      <img @click="dialogOpen(index)" :src="item?item:defult" alt />
      <el-dialog  :visible.sync='dialogVisible' @close="dialogClose">
        <tabs-img @uplodeImg="uplodeImg"></tabs-img>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defult: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      dialogIndex: -1
    }
  },
  methods: {
    uplodeImg (url) {
      this.$emit('uplodeImg', url, this.dialogIndex)
      this.dialogClose()
    },
    dialogOpen (index) {
      this.dialogVisible = true
      this.dialogIndex = index
    },
    dialogClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-img {
  display: flex;
  .cover-img-item {
    width: 250px;
    height: 250px;
    border: 1px solid #008c8c;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
