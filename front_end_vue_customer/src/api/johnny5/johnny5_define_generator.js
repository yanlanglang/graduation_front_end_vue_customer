//自定义j5块生成的js语言
export function generator(Blockly) {

  Blockly.JavaScript['package_j5'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'require("johnny-five")';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['object_board'] = function (block) {
    var value_instance_johnny_five = Blockly.JavaScript.valueToCode(block, 'instance_johnny_five', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'new '+value_instance_johnny_five+".Board()";

    // TODO: Change ORDER_NONE to the correct strength.
    return (value_instance_johnny_five==="") ? "" : [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['function_board_on'] = function (block) {
    var value_value_input_board = Blockly.JavaScript.valueToCode(block, 'value-input-board', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_options_ready = block.getFieldValue('ready');
    var statements_statement_input_body = Blockly.JavaScript.statementToCode(block, 'statement-input-body');

    var code = value_value_input_board+'.on("'+dropdown_options_ready+'", () => {\n'+statements_statement_input_body+'\n});\n';

    return (value_value_input_board==="") ? "" : code;
  };

  Blockly.JavaScript['object_led'] = function (block) {
    var value_instance_johnny_five = Blockly.JavaScript.valueToCode(block, 'instance_johnny_five', Blockly.JavaScript.ORDER_ATOMIC);
    var text_param_led_port = block.getFieldValue('param_led_port');
    // TODO: Assemble JavaScript into code variable.
    var code = 'new '+value_instance_johnny_five+".Led("+text_param_led_port+")";
    // TODO: Change ORDER_NONE to the correct strength.
    return (value_instance_johnny_five==="") ? "" : [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['function_led_on'] = function (block) {
    var value_value_input_led = Blockly.JavaScript.valueToCode(block, 'value-input-led', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_value_input_led+'.on()';
    // TODO: Change ORDER_NONE to the correct strength.
    return (value_value_input_led==="")? "" : [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['function_led_off'] = function (block) {
    var value_value_input_led = Blockly.JavaScript.valueToCode(block, 'value-input-led', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_value_input_led+'.off()';
    // TODO: Change ORDER_NONE to the correct strength.
    return (value_value_input_led==="")? "" :  [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['function_led_toggle'] = function (block) {
    var value_value_input_led = Blockly.JavaScript.valueToCode(block, 'value-input-led', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_value_input_led+'.toggle()';
    // TODO: Change ORDER_NONE to the correct strength.
    return (value_value_input_led==="")? "" : [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  //需要对方法体进行判空
  Blockly.JavaScript['function_led_strobe'] = function (block) {
    var value_value_input_led = Blockly.JavaScript.valueToCode(block, 'value-input-led', Blockly.JavaScript.ORDER_ATOMIC);
    var text_param_led_strobe_time = block.getFieldValue('param-led-strobe-time');
    var statements_statement_input_callback = Blockly.JavaScript.statementToCode(block, 'statement-input-callback');
    // TODO: Assemble JavaScript into code variable.
    var code = "";
    //判断是否有实例对象
    if(value_value_input_led===""){
      return code;
    }
    //判断是否有第二个参数(这里指callback)
    if(statements_statement_input_callback===""){
      code = value_value_input_led+'.strobe('+text_param_led_strobe_time+');\n';
    }else{
      code = value_value_input_led+'.strobe('+text_param_led_strobe_time+', () => {\n'+statements_statement_input_callback+'\n});\n';
    }

    return code;
  };

  //需要对方法体进行判空
  Blockly.JavaScript['function_led_blink'] = function (block) {
    var value_value_input_led = Blockly.JavaScript.valueToCode(block, 'value-input-led', Blockly.JavaScript.ORDER_ATOMIC);
    var text_param_led_blink_time = block.getFieldValue('param-led-blink-time');
    var statements_statement_input_callback = Blockly.JavaScript.statementToCode(block, 'statement-input-callback');
    // TODO: Assemble JavaScript into code variable.
    var code = "";
    //判断是否有实例对象
    if(value_value_input_led===""){
      return code;
    }
     //判断是否有第二个参数(这里指callback)
    if(statements_statement_input_callback===""){
      code = value_value_input_led+'.blink('+text_param_led_blink_time+');\n';
    }else{
      code = value_value_input_led+'.blink('+text_param_led_blink_time+', () => {\n'+statements_statement_input_callback+'\n});\n';
    }
    return code;
  };

  Blockly.JavaScript['function_led_stop'] = function (block) {
    var value_value_input_led = Blockly.JavaScript.valueToCode(block, 'value-input-led', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_value_input_led+'.stop()';
    // TODO: Change ORDER_NONE to the correct strength.
    return (value_value_input_led==="")? "" : [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  return Blockly;

};


