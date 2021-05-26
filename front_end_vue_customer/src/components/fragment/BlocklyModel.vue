<template>
  <div>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none">
      <slot></slot>
    </xml>
  </div>
</template>

<script>
/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly Vue Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

//import Blockly from "blockly";
import { blockly } from "@/api/dsaa/dsaa_define_package";

import BlocklyPhp from "blockly/php";
import BlocklyPython from "blockly/python";
import BlocklyJS from "blockly/javascript";
import BlocklyXml from "blockly/blockly_compressed";
//自定义johnny的块
import { customBlocks } from "@/api/dsaa/dsaa_define_blocks";

export default {
  name: "BlocklyModel",
  props: ["options", "type"],
  data() {
    return {
      workspace: null,
      code: "",
    };
  },
  mounted() {

    var options = this.$props.options || {};
    if (!options.toolbox) {
      options.toolbox = this.$refs["blocklyToolbox"];
    }
    this.workspace = blockly.inject(this.$refs["blocklyDiv"], options);
    this.workspace.addChangeListener(this.blocklyListener);
  },
  methods: {
    blocklyListener() {
      //改变生成的代码
      switch (this.type) {
        /*curCode*/
        case "php":
          this.code = BlocklyPhp.workspaceToCode(this.workspace);
          break;
        case "python":
          this.code = BlocklyPython.workspaceToCode(this.workspace);
          break;
        case "xml":
          /*未经格式化的xml字符串*/
          var xml_dom = BlocklyXml.Xml.workspaceToDom(this.workspace);
          /*格式化之后的xml字符串*/
          this.code = BlocklyXml.Xml.domToPrettyText(xml_dom);
          break;
        default:
          this.code = BlocklyJS.workspaceToCode(this.workspace);
      }

      // 允许父容器通过以下函数监听当前的代码
      this.$emit("blocklyCode", this.code);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
