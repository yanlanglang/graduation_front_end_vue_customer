<template>

  <el-container>

    <el-header>
      <TopNav/>
    </el-header>

    <el-main>
      <div class="demo-image__lazy">
        <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
      </div>
    </el-main>

    <el-footer>
      <BottomNav/>
    </el-footer>
  </el-container>

</template>

<script>
  import BottomNav from "./fragment/BottomNav";
  import TopNav from "./fragment/TopNav";

  export default {
    name: "Index",
    components: {TopNav, BottomNav},
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
        ]
      }
    }
  }
</script>

<style scoped>
  .el-main {
    text-align: center;
  }

  .el-header {
    padding: 0;
  }

  .el-footer {
    padding: 0;
  }

</style>
