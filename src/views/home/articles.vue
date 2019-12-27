<template>
  <div>
    <el-card>
      <bread slot="header">
        <template slot="title">文章列表</template>
      </bread>
      <el-form class="forms">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="searchForm.status" @change="changeStatus">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败 {{ searchForm }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select @change="changeStatus" v-model="searchForm.channel_id" placeholder="请选择">
            <!-- label显示值  value存储值 -->
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeStatus"
            v-model="searchForm.dataRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottomCard">
      <el-row class="bottomList">
        共找到
        <span>62221</span> 条符合条件的内容
      </el-row>
      <el-row
        v-for="item in listArticles"
        :key="item.id.toString()"
        type="flex"
        justify="space-between"
        class="list"
      >
        <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defoutImg" alt />
          <div class="listContainer">
            <span>{{ item.title }}</span>
            <el-tag :type="item.status | filterType" class="tags">{{ item.status | filterStatus }}</el-tag>
            <span>{{ item.pubdate }}</span>
          </div>
        </div>
        <div class="right">
          <i class="el-icon-edit">修改</i>
          <i @click="delectItem(item.id)" class="el-icon-delete">删除</i>
        </div>
      </el-row>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :page-size="page.per_page"
          :current-page="page.page"
          :total="page.total_count"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 选中的文章类型
        channel_id: null, // 频道类型
        dataRange: [] // 日期范围
      },
      channels: [],
      listArticles: [],
      defoutImg: require('../../assets/img/login_bg3.jpg'),
      page: {
        page: 1,
        per_page: 10,
        total_count: 0
      }
    }
  },
  methods: {
    getArticles (params) {
      // let status = null
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.listArticles = result.data.results
        this.page.page = result.data.page
        this.page.per_page = result.data.per_page
        this.page.total_count = result.data.total_count
        console.log(result)
      })
    },
    changeStatus () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dataRange.length && this.searchForm.dataRange.length
          ? this.searchForm.dataRange[0]
          : null,
        end_pubdate:
          this.searchForm.dataRange.length && this.searchForm.dataRange.length > 1
            ? this.searchForm.dataRange[1]
            : null,
        page: this.page.page,
        per_page: this.page.per_page
      }
      // alert(this.searchForm.status)
      console.log(params)

      this.getArticles(params)
    },
    // 获取文章数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result)
        this.channels = result.data.channels
      })
    },
    delectItem (id) {
      // this.searchForm.status = item.status
      this.$axios({
        url: `/articles/${id.toString()}`,
        method: 'delete'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.changeStatus()
      })
    },
    changePage (newPage) {
      this.page.page = newPage
      this.changeStatus()
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  },
  filters: {
    filterStatus (value) {
      //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
      return value
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.forms {
  margin-left: 80px;
}
.bottomCard {
  margin-top: 20px;
  .bottomList {
    height: 40px;
    border-bottom: 1px dashed rgb(104, 101, 101);
  }
  .list {
    margin: 10px 0;
    .left {
      display: flex;
      justify-content: start;
      img {
        width: 240px;
        height: 180px;
        border-radius: 10px;
      }
      .listContainer {
        display: flex;
        margin-left: 20px;
        justify-content: space-around;
        flex-direction: column;
        .tags {
          width: 70px;
        }
      }
    }
    .right {
      i {
        margin: 20px;
        float: right;
      }
    }
  }
}
</style>
