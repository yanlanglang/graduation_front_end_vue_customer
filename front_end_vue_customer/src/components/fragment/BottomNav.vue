<template>
  <div class="bottomNav">

    <el-divider></el-divider>

    <el-row>
      <el-col :span="8">
        <h3>B&J</h3>
        <p>加入我们</p>
        <p>联系我们</p>
      </el-col>
      <el-col :span="8">
        <h3>
          相关链接
        </h3>
        <p>
          <el-link :underline="false" href="https://developers.google.com/blockly">Blockly</el-link>
        </p>
        <p>
          <el-link :underline="false" href="http://johnny-five.io/examples/">Johnny-Five</el-link>
        </p>
        <p>
          <el-link :underline="false" href="https://github.com/judge0">Judge</el-link>
        </p>
      </el-col>
      <el-col :span="8">
        <el-col>
          <h3>联系方式</h3>
          <p>
            WeChat: yl_ns4a
          </p>
          <p>
            Email: ns4a_up@163.com
          </p>
        </el-col>
      </el-col>
    </el-row>
    
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
    
  }

</style>
