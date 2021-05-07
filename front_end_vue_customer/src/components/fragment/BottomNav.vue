<template>
  <div class="bottomNav">


    <h3 style="bottom: 0">Footer</h3>

    <!--    路由出口-->
    <!--    路由匹配到的组件将渲染显示在这里-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "BottomNav",
    data() {
      return {
      };
    },
    methods: {

    }
  }
</script>

<style scoped>
  .bottomNav{
    width: 100%;
    position: absolute;
    text-align: center;
    background: #409EFF;
  }

</style>
