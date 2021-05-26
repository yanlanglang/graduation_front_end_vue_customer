<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide(){
      return{
        reload: this.reload
      }
    },
    data(){
      return{
        isRouterAlive: true
      }
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    },
    //防止人为刷新时store中的数据出现丢失的情况
    created() {
    //在页面加载时读取sessuibStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时store中的信息保存到sessionStorage中
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  }
</script>

<style>
  /*#app {
    text-align: center;
  }*/

  body {
    margin: 0;
    padding: 0;
  }


</style>
