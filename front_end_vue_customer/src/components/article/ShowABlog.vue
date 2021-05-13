<template>
  <el-container>
    <el-header>
      <top-nav/>
    </el-header>
    <el-main>

      <article-model :articleObj="articleObj" />

    </el-main>
    <el-footer>
      <bottom-nav/>
    </el-footer>
  </el-container>
</template>

<script>
import ArticleModel from '../fragment/ArticleModel.vue'
import BottomNav from '../fragment/BottomNav.vue'
import TopNav from '../fragment/TopNav.vue'
export default {
  name: 'ShowABlogComponent',
  components: {
    TopNav,
    BottomNav,
    ArticleModel
  },
  data () {
    return {
      articleObj: {
        customer: {},
        type: {},
      }
    }
  },
  methods: {
  },
  mounted() {
    //获取
    this.articleObj =  this.$store.state.article;
  }
}
</script>

<style  scoped>
.el-header {
  padding: 0;
}

.el-footer {
  padding: 0;
}
</style>
