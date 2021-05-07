<template>
  <el-container :style="heightStyle" v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-header>
      <TopNav/>
    </el-header>

    <el-main>

      <!--遍历文章-->
      <div v-for="a in page.content" :key="a.id" class="text item" style="margin: 0">
        <!-- 使用自定义模板 -->
        <article-model :articleObj="a" />

      </div>

      <!--分页-->
      <div class="block">

        <el-pagination
        align="center"
          :hide-on-single-page="hideFlag"
          @current-change="handleCurrentChange"
          @prev-click="handlePrev"
          @next-click="handleNext"
          layout="total,prev, pager, next, jumper"
          :page-size="page.size"
          :total="page.totalElements">
        </el-pagination>

      </div>

    </el-main>

    <el-footer>
      <BottomNav/>
    </el-footer>
  </el-container>

</template>

<script>
import TopNav from "../fragment/TopNav";
import BottomNav from "../fragment/BottomNav";

import ArticleModel from '../fragment/ArticleModel.vue';

  export default {
    name: "ShowAllBlogComponent",
    components: {BottomNav, TopNav, ArticleModel},
    data() {
      return {
        page: '',
        loading: true,
        heightStyle: {height: '1000px'},
        hideFlag: true
      };
    },
    methods: {
      
      /*切换页面 提取出来的公共部分*/
      changePageNumber(page) {
        this.loading = true;

        this.$axios.get(this.$baseUrl + '/blog/blogs', {
          params: {
            page: page
          }
        })
          .then(res => {
            //console.log(res.data.data);
            this.page = res.data.data;
            this.loading = false;
          })
      },

      /*选择页码数时触发*/
      handleCurrentChange(val) {
        this.changePageNumber(val - 1);
      },
      /*点击上一页时触发*/
      handlePrev() {
        this.changePageNumber(this.page.number - 1);
      },
      /*点击下一页时触发*/
      handleNext() {
        this.changePageNumber(this.page.number + 1);
      }

    },
    mounted() {

      this.$axios.get(this.$baseUrl + '/blog/blogs')
        .then(res => {
          
          //console.log(res.data.data);
          this.page = res.data.data;
          this.heightStyle = null;
          this.loading = false;
          this.hideFlag = false;
        })
        .catch(res => {

        });
    }
  }
</script>

<style scoped>
  .el-header {
    padding: 0;
  }

  .el-footer {
    padding: 0;
  }

  .el-main {
    /* text-align: center; */
    margin: 0;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
