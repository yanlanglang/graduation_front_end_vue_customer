var customBlocks = [
  {
    "type": "object",
    "message0": "create a  %1 object %2 set some properties: %3 set some methods: %4",
    "args0": [
      {
        "type": "field_input",
        "name": "object_name",
        "text": "ObjectName"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "object_properties"
      },
      {
        "type": "input_statement",
        "name": "object_methods"
      }
    ],
    "output": null,
    "colour": 260,
    "tooltip": "",
    "helpUrl": ""
  },
  
  {
    "type": "loops_fori",
    "message0": "iterate with %1 %2 from  %3 to %4 %5 by %6 %7",
    "args0": [
      {
        "type": "field_variable",
        "name": "initialValue",
        "variable": "i"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "fromValue",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "judge",
        "options": [
          [
            "<",
            "<"
          ],
          [
            "≤",
            "<="
          ],
          [
            ">",
            ">"
          ],
          [
            "≥",
            ">="
          ],
          [
            "=",
            "=="
          ],
          [
            "≠",
            "!="
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "toValue",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "byValue",
        "check": "Number"
      },
      {
        "type": "input_statement",
        "name": "others"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },
  
  {
    "type": "loops_stopfor",
    "message0": "%1 of loop",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "stopType",
        "options": [
          [
            "break out",
            "break"
          ],
          [
            "continue with next iteration",
            "continue"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },

  {
    "type": "math_toint",
    "message0": "from float %1 %2 to int",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "input_number",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": 230,
    "tooltip": "浮点类型转换为整数类型",
    "helpUrl": ""
  },
  
  {
    "type": "text_description",
    "message0": "create description %1",
    "args0": [
      {
        "type": "input_value",
        "name": "description_value",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  },

  //variables let声明
  {
    "type": "variables_let",
    "message0": "let %1 to %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "let_variable",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "let_value"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "",
    "helpUrl": ""
  },

  //variables const声明
  {
    "type": "variables_const",
    "message0": "const %1 to %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "const_variable",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "const_value"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "",
    "helpUrl": ""
  },

  //variables var声明
  {
    "type": "variables_var",
    "message0": "var %1 to %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "var_variable",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "var_value"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "",
    "helpUrl": ""
  }


  

]


  export {customBlocks};

