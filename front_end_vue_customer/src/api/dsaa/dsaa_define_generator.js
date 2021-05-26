//自定义j5块生成的js语言
export function generator(Blockly) {

  Blockly.JavaScript['object'] = function (block) {
    // 类的名称
    var object_name = block.getFieldValue('object_name');


    // 全部属性
    var statements_object_properties = Blockly.JavaScript.statementToCode(block, 'object_properties');
    // 根据";"符号来进行分割
    var properties = statements_object_properties.split("\n");
    //遍历属性，添加 'this.'
    for (let index = 0; index < properties.length; index++) {
      properties[index] = "this." + properties[index];
    }
    console.log(properties);

    // 全部方法
    // 根据";"符号来进行分割
    var statements_object_methods = Blockly.JavaScript.statementToCode(block, 'object_methods');



    // TODO: Assemble JavaScript into code variable.
    var code1 = "function " + object_name + "(){\n" +
      statements_object_properties + "\n" + statements_object_methods + "\n" +
      "}";


    console.log(code1);

    var code = "...";
    //console.log(statements_object_methods);



    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  //loops 自定义的for i块
  Blockly.JavaScript['loops_fori'] = function (block) {
    var variable_initialvalue = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('initialValue'), Blockly.Variables.NAME_TYPE);
    var value_fromvalue = Blockly.JavaScript.valueToCode(block, 'fromValue', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_judge = block.getFieldValue('judge');
    var value_tovalue = Blockly.JavaScript.valueToCode(block, 'toValue', Blockly.JavaScript.ORDER_ATOMIC);
    var value_byvalue = Blockly.JavaScript.valueToCode(block, 'byValue', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_others = Blockly.JavaScript.statementToCode(block, 'others');

    if (value_fromvalue == "" || value_tovalue == "" || value_byvalue == "") {
      return "";
    } else {
      var code = "for(" + variable_initialvalue + " = " + value_fromvalue + "; " + variable_initialvalue + " "+dropdown_judge+" " + value_tovalue + "; " + variable_initialvalue + " = " + value_byvalue + ") {\n" + statements_others + "}\n";

      return code;
    }


  };

  //loops 自定义的跳出循环
  Blockly.JavaScript['loops_stopfor'] = function(block) {
    var dropdown_stoptype = block.getFieldValue('stopType');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_stoptype+";\n";
    return code;
  };


  //math 浮点类型转换为整数类型
  Blockly.JavaScript['math_toint'] = function(block) {
    var value_input_number = Blockly.JavaScript.valueToCode(block, 'input_number', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'parseInt( '+value_input_number+' )';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  //text 添加注释
  Blockly.JavaScript['text_description'] = function(block) {
    var value_description_value = Blockly.JavaScript.valueToCode(block, 'description_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "//"+value_description_value+"\n";
    return code;
  };

  //variables let声明
  Blockly.JavaScript['variables_let'] = function(block) {
    var variable_let_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('let_variable'), Blockly.Variables.NAME_TYPE);
    var value_let_value = Blockly.JavaScript.valueToCode(block, 'let_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'let '+variable_let_variable+" = "+value_let_value+";\n";
    return code;
  };
  
  //variables const声明
  Blockly.JavaScript['variables_const'] = function(block) {
    var variable_const_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('const_variable'), Blockly.Variables.NAME_TYPE);
    var value_const_value = Blockly.JavaScript.valueToCode(block, 'const_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'const '+variable_const_variable+" = "+value_const_value+";\n";
    return code;
  };
  
  //variables var声明
  Blockly.JavaScript['variables_var'] = function(block) {
    var variable_var_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_variable'), Blockly.Variables.NAME_TYPE);
    var value_var_value = Blockly.JavaScript.valueToCode(block, 'var_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'var '+variable_var_variable+" = "+value_var_value+";\n";
    return code;
  };


  return Blockly;

}