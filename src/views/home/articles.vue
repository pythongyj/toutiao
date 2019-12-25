<template>
  <div>
    <el-card>
      <bread slot="header">
        <template slot="title">文章列表</template>
      </bread>
      <el-form class="forms">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="radio">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="list" placeholder="请选择">
            <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            v-model="value1"
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
      <el-row type="flex" justify="space-between" class="list">
        <div class="left">
          <img src="../../assets/img/login_bg.jpg" alt />
          <div class="listContainer">
            <span>哪个校区的同学？这么拼吗？自愧不如</span>
            <el-tag>标签一</el-tag>
            <span>2019-12-16 20:05:36</span>
          </div>
        </div>
        <div class="right">
          <i class="el-icon-edit">修改</i>
          <i class="el-icon-delete">删除</i>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 5,
      list: []
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
