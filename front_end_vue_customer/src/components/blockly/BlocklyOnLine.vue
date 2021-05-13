<template>
  <el-container>
    <el-header>
      <TopNav />
    </el-header>

    <el-main>
      <!-- blockly -->
      <div class="c-flag-left">
        <!--在changeCode方法中，可以读取子组件实时的代码-->
        <blockly-model
          :type="codeType"
          @blocklyCode="changeCode"
          id="blockly2"
          :options="options"
          ref="foo"
        />
      </div>

      <!--相关按钮和代码生成-->
      <div class="c-flag-right">
        <!-- 相关按钮 -->
        <div class="c-btn">
          <el-row >

            <el-col :span="8">
              <!--运行-->
              <el-button plain @click="showCode">运行</el-button>
            </el-col>


            <!-- class="c-flag-export" -->
            <el-col :span="8">
              <!--导出-->
              <el-button
                type="success"
                plain
                @click="exportFile"
                >导出</el-button
              >
            </el-col>


            <!-- class="upload-demo" -->
            <el-col :span="8">
              <!--导入-->
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :on-change="handlePreview"
                :multiple="false"
                :auto-upload="false"
                :limit="1"
                ref="fileUpload"
              >
                <el-button type="primary" plain>点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  确保列表只有一个文件
                </div>
              </el-upload>
            </el-col>
          </el-row>
        </div>

        <!--代码生成区-->
        <!--:value 将父组件code的值传给子组件-->
        <code-mirror-model
          :isBlockly="isBlockly"
          :language="codeType"
          :value="code"
          @languageChange="changeCodeType"
          id="#codeMirror"
        />
      </div>

      <!-- 运行结果 -->
      <div class="c-flag-bottom">

        <el-input
            type="textarea"
            :rows="5"
            placeholder="运行结果..."
            :readonly="true"
            resize="none"
            :value="textareaValue">
            </el-input>
        

      </div>
    </el-main>

    <!-- <el-footer>
      <BottomNav />
    </el-footer> -->
  </el-container>
</template>

<script>
/*Blockly*/
import BlocklyModel from "../fragment/BlocklyModel";
/*目标语言*/
import BlocklyJS from "blockly/javascript";
import BlocklyPhp from "blockly/php";
import BlocklyPython from "blockly/python";
import BlocklyXml from "blockly/blockly_compressed";

/*FileSaver插件*/
import FileSaver from "file-saver";

// 导入bloockly的配置
import { options } from "@/api/blockly/blockly_config";

/*自定义的组件*/
import CodeMirrorModel from "../fragment/CodeMirrorModel";
import TopNav from "../fragment/TopNav";
// import BottomNav from "../fragment/BottomNav";

export default {
  name: "BlocklyOnLineComponent",
  components: {
    TopNav,
    BlocklyModel,
    CodeMirrorModel
  },
  data() {
    return {
        //运行结果
      codeResult: {
        stdout: "",
        time: "",
        stderr: "error",
      },
      //文本域的显示结果
      textareaValue: "",
      /*当前代码的类型*/
      codeType: "javascript",
      /*当前代码对应Judge0中的 language_id*/
      codeId: "63",
      /*当前的代码*/
      code: "",
      /*Blockly的相关配置项*/
      options: options,
      //使用j5的codemirror
      isBlockly: true,
    };
  },
  methods: {
    /*提交代码到远程服务器*/
    showCode() {
      //判断当前的codeType!=xml;
      if (this.codeType === "xml") {
        this.$message.warning("不能运行xml文件!");
        return false;
      }

      //提交到服务器
      this.$axios
        .post(
          "blockly/submissions",
          {
            source_code: this.code,
            language_id: this.codeId,
          },
          {
            params: {
              base64_encoded: false,
              /*立刻得到结果*/
              wait: true,
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          var result = res.data;

          if(result.stderr === null || result.stderr === 'error'){
              this.textareaValue = result.time+"ms\n\n"+result.stdout;
          }else{
              this.textareaValue = result.time+"ms\n\n"+result.stderr;
          }
        })
        .catch(function (err) {
          console.log("失败的响应结果->\n" + err);
        });
    },

    /*当切换不同类型的代码时会触发*/
    changeCodeType(data) {
      //改变代码的类型
      this.codeType = data;

      //改变生成的代码
      switch (this.codeType) {
        /*curCode*/
        case "php":
          this.code = BlocklyPhp.workspaceToCode(this.$refs["foo"].workspace);
          this.codeId = "68";
          break;
        case "python":
          this.code = BlocklyPython.workspaceToCode(
            this.$refs["foo"].workspace
          );
          this.codeId = "71";
          break;
        case "xml":
          /*未经格式化的xml字符串*/
          var xml_dom = BlocklyXml.Xml.workspaceToDom(
            this.$refs["foo"].workspace
          );
          /*格式化之后的xml字符串*/
          this.code = BlocklyXml.Xml.domToPrettyText(xml_dom);
          break;
        default:
          this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
          this.codeId = "63";
      }
    },

    /*实时更新Blockly生成的代码*/
    changeCode(data) {
      this.code = data;
    },

    /*导出xml文件*/
    exportFile() {
      /*未经格式化的xml字符串*/
      var xml_dom = BlocklyXml.Xml.workspaceToDom(this.$refs["foo"].workspace);
      /*格式化之后的xml字符串*/
      var xmlText = BlocklyXml.Xml.domToPrettyText(xml_dom);
      var blob = new Blob([xmlText]);

      FileSaver.saveAs(blob, "blockly.xml");
    },

    handlePreview(file, fileList) {
        console.log(file.raw);

        //offset: 距离页面顶部的偏移量
      if (file.raw.type !== "text/xml") {
        this.$message({
            message: "只能上传xml文件!",
            type: 'error',
            offset: '70'
        })
        //清除已上传的文件列表
        this.$refs['fileUpload'].clearFiles();
        
        return false;
      }

      var reader = new FileReader();
      var rawlog = "empty";
      //注意：是file.raw
      reader.readAsText(file.raw);

      reader.onload = (e) => {
        rawlog = reader.result;
        this.$refs["foo"].workspace.clear();
        var xml = BlocklyXml.Xml.textToDom(rawlog);
        BlocklyXml.Xml.domToWorkspace(xml, this.$refs["foo"].workspace);
      };
    },
    handleExceed(files, fileList) {

      this.$message({
          message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
          type: 'error',
          offset: '70'
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style scoped>
#blockly2 {
  margin-top: 5%;
  left: 2%;
  position: absolute;
  width: 65%;
  height: 55%;
}

.c-btn {
  position: absolute;
  margin-top: 5%;
  right: 2%;
  z-index: 3;
  width: 20%;
}

.c-flag-export {
  position: absolute;
}

.upload-demo {
  top: 0;
  position: absolute;
  right: 5%;
  width: 40%;
}

.el-dropdown {
  position: absolute;
  margin-top: 5%;
  right: 20%;
}

.c-flag-bottom {
  z-index: 100;
  margin-top: 2%;
  bottom: 12%;
  position: absolute;
  right: 2%;
  width: 96%;
  height: 15%;
  /* background: cadetblue; */
}

.el-header {
  padding: 0;
  position: absolute;
  top: 0;
  height: 10%;
}

.el-main {
  width: 100%;
  height: 80%;
}

.el-footer {
  width: 100%;
  background: darkgrey;
  position: absolute;
  bottom: 0;
  padding: 0;
  height: 10%;
  z-index: 99;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
