<template>

  <el-container>
    <el-header>
      <TopNav/>
    </el-header>
    <el-main>
      <!--时间线-->
      <div class="block" style="position: fixed; bottom: 50px; right: 30px">
        <el-timeline>

          <el-timeline-item icon="el-icon-thumb" size="larger" :color="activityColor.color2">
            <el-link type="primary" :underline="false">喜欢</el-link>
          </el-timeline-item>

          <el-timeline-item icon="el-icon-star-on" size="larger" :color="activityColor.color2">
            <el-link type="primary" :underline="false">收藏</el-link>
          </el-timeline-item>

          <el-timeline-item icon="el-icon-chat-line-round" size="larger" :color="activityColor.color2">
            <el-link type="primary" :underline="false">评论</el-link>
          </el-timeline-item>

          <el-timeline-item icon="el-icon-top" size="larger" :color="activityColor.color2">
            <el-link type="primary" :underline="false" @click="toTop">回到顶部</el-link>
          </el-timeline-item>

        </el-timeline>
      </div>


      <div v-if="blog!==null">

        <!--作者信息-->
        <el-row style="text-align: center" v-if="blog.customer!==null">

          <el-avatar shape="circle" :size="30"
                     :src="require('C:/Career/GiteeProjects/avatars/'+(blog.customer.avatar)+'.jpg')"></el-avatar>
          {{blog.customer.nickname}}
          {{blog.updateTime | timeFormat}}

        </el-row>

        <el-divider></el-divider>

        <!--文章主题内容-->
        <div class="typo js-toc-content" v-html="blog.content">

        </div>
      </div>

    </el-main>
    <el-footer>
      <BottomNav/>
    </el-footer>
  </el-container>


</template>

<script>

  /*中文排版*/
  import '@/utils/css/typo.css';

  /*代码高亮*/
  import Prism from 'prismjs';

  /*JQuery*/
  import $ from 'jquery';
  /*scrollTo平滑滚动依赖于JQuery*/
  import 'jquery.scrollto';

  /*组件*/
  import TopNav from "../fragment/TopNav";
  import BottomNav from "../fragment/BottomNav";

  export default {
    blog: '',
    name: "ShowABlog",
    components: {BottomNav, TopNav},
    data() {
      return {
        activityColor: {
          activityFlag: false,
          color1: '#ff5d58',
          color2: '#9fdeff'
        }
      }
    },
    methods: {
      /*回到顶部*/
      toTop() {
        /*平滑滚动*/
        $(window).scrollTo('.el-header', 1500);
      }
    },
    filters: {
      //定义过滤器
      timeFormat: function (data) {
        //根据形参data，得到特定的时间
        var dt = new Date(data);
        var year = dt.getFullYear();
        var month = (dt.getMonth() + 1).toString().padStart(2, '0');
        var day = dt.getDate().toString().padStart(2, '0');
        var hour = dt.getHours().toString().padStart(2, '0');
        var minute = dt.getMinutes().toString().padStart(2, '0');
        var second = dt.getSeconds().toString().padStart(2, '0');

        //返回模板
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
      }
    },
    beforeMount() {
      this.blog = JSON.parse(sessionStorage.getItem('blog'));
    },
    mounted() {
      /*代码高亮*/
      Prism.highlightAll();


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
    margin-left: 20%;
    width: 60%;
  }
</style>
