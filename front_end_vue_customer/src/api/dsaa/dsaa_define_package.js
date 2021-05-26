import Blockly from "blockly"

//自定义的块
import { customBlocks } from "@/api/dsaa/dsaa_define_blocks";

//自定义块的语法
import { generator } from "@/api/dsaa/dsaa_define_generator";

//装载自定义的块
Blockly.defineBlocksWithJsonArray(customBlocks);
//装载自定义块的语法
var blockly = generator(Blockly)


export{blockly};

