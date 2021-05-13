<template>
  <el-container>
    <el-main>

      <el-row >
        <!-- 标题 -->
        <el-col :span="6">
          {{ exampleObj.content | stringSplit }}
        </el-col>
        <!-- 创建时间 -->
        <el-col :span="6">
          {{ exampleObj.createTime | timeFormat }}
        </el-col>
        <!-- blockly/johnny-five -->
        <el-col :span="6">
          <el-tag v-if="exampleObj.blockly">Blockly</el-tag>
          <el-tag v-else type="success">Johnny-Five</el-tag>
        </el-col>
        <!-- 下载链接 -->
        <el-col :span="6">
          <a
            style="color:#409EFF"
            v-if="exampleObj.blockly"
            @click="downloadFile(exampleObj.fileMapPath, 'blocklyExample.xml')"
            >下载</a
          >
          <a
          style="color:#67C23A"
            v-else
            @click="downloadFile(exampleObj.fileMapPath, 'j5Example.xml')"
            >下载</a
          >
        </el-col>
        
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "exampleModel",
  components: {},
  props: {
    exampleObj: {
      type: Object,
    },
  },
  data() {
    return {
      prefixAccessory: "",
    };
  },
  methods: {
    //下载文件
    downloadFile(fileMapPath, fileName) {
      var x = new XMLHttpRequest();
      //this.prefixAccessory : 路径前缀
      x.open("GET", this.prefixAccessory + fileMapPath, true);
      x.responseType = "blob";
      x.onload = function (e) {
        var url = window.URL.createObjectURL(x.response);
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      };
      x.send();
    },
  },
  mounted() {
    //设置附件的前缀
    this.prefixAccessory = "http://localhost:8000/yl";
  },
};
</script>

<style  scoped>
</style>
