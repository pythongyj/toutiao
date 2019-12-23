<template>
  <el-card>
    <bread slot="header">
      <template slot="title">
        <div>评论列表</div>
      </template>
    </bread>
    <el-table :data="list">
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column prop="comment_status" :formatter="zhuangtai" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrclose(obj.row)"
          >{{ obj.row.comment_status?'关闭':'打开' }}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getData () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
        // console.log(result)
      })
    },
    zhuangtai (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrclose (row) {
      let msg = row.comment_status ? '打开' : '关闭'
      this.$confirm(`您是否确定要${msg}评论吗`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          console.log(result)
          this.getData()
        })
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>
</style>
