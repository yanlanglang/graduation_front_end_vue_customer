import Blockly from "blockly"

//自定义johnny的块
import { customBlocks } from "@/api/johnny5/johnny5_define_blocks";

//自定义johnny的语法
import { generator } from "@/api/johnny5/johnny5_define_generator";

//自定义johnny5的块
Blockly.defineBlocksWithJsonArray(customBlocks);
//自定义johnny的语法
var blockly = generator(Blockly)


export{blockly};



