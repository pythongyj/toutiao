<template>
  <el-card v-loading='loading'>
    <bread slot="header">
      <template slot="title">发表文章</template>
    </bread>
    <el-form ref="myForm" label-width="80px" :model="formDatas" :rules="rules">
      <el-form-item label="标题:"  prop="title">
        <el-input v-model="formDatas.title"></el-input>
      </el-form-item>
      <el-form-item style="height:400px" label="内容:" prop="content">
        <quill-editor style="height:300px"  v-model="formDatas.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面:">
        <el-radio-group @change="changeType" v-model="formDatas.cover.type">
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <publish-img @uplodeImg="uplodeImg" :list='formDatas.cover.images'></publish-img>
        {{formDatas.cover}}
      </el-form-item>
      <el-form-item label="频道:">
        <el-select v-model="formDatas.channel_id" placeholder="请选择">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作:">
        <el-button type="primary" @click="myArticles(false)">发表</el-button>
        <el-button @click="myArticles(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formDatas: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      channels: [],
      rules: {
        title: [
          { required: true, message: '请输入文章标题' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符' }
        ],
        content: [
          { required: true, message: '请输入文章标题' }
        ]
      }
    }
  },
  methods: {
    uplodeImg (url, index) {
      this.formDatas.cover.images = this.formDatas.cover.images.map((item, i) => index === i ? url : item
      )
    },
    changeType () {
      if (this.formDatas.cover.type === 0 || this.formDatas.cover.type === -1) {
        this.formDatas.cover.images = []
      } else if (this.formDatas.cover.type === 1) {
        this.formDatas.cover.images = ['']
      } else if (this.formDatas.cover.type === 3) {
        this.formDatas.cover.images = ['', '', '']
      }
    },
    // 发布文章的校验
    myArticles (draft) {
      console.log(draft)
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.loading = true
          // 判断是修改文章还是发布文章
          let { id } = this.$route.params// 获取动态路由
          this.$axios({
            url: id ? `/articles/${id}` : `/articles`,
            method: id ? 'put' : 'post',
            params: { draft },
            data: this.formDatas
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.loading = false
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 查询所有的文章分类
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 根据文章id查询文章内容
    getArticleByID (id) {
      this.loading = true
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.loading = false
        this.formDatas = result.data
      })
    }
  },
  created () {
    this.getChannels()
    let { id } = this.$route.params
    id && this.getArticleByID(id)
  },
  watch: {
    '$route' (to, from) {
      if (to.params.id) {
        // 修改
        console.log(111)
      } else {
        // 发布
        this.formDatas = {
          title: '',
          content: '',
          channel_id: null,
          cover: {
            type: 0,
            images: []
          }
        }
        console.log(to)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-left: 80px;
}
</style>
