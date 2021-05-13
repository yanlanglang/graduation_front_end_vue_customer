<template>
  <el-container>
    <el-header>
      <top-nav />
    </el-header>
    <el-main>

        <!-- 遍历example -->
        <div v-for="e in examples" :key="e.id">
            <example-model :exampleObj="e" />
        </div>

    </el-main>
    <!-- <el-footer>
      <bottom-nav />
    </el-footer> -->
  </el-container>
</template>

<script>
// import BottomNav from "../fragment/BottomNav.vue";
import ExampleModel from '../fragment/ExampleModel.vue';
import TopNav from "../fragment/TopNav.vue";
export default {
  name: "ShowExamplesComponent",
  components: {
    TopNav,
    ExampleModel,
  },
  data() {
    return {
        examples: [],
    };
  },
  methods: {},
  mounted() {
    //异步请求获取examples
    this.$axios.get(this.$baseUrl + '/examples')
    .then(res => {
        this.examples = res.data.data;
    })
    .catch(err => {

    })
  },
};
</script>

<style  scoped>
.el-header {
  padding: 0;
}

/* .el-footer {
  padding: 0;
} */
</style>
