//自定义的j5块
var customBlocks = [{
  "type": "package_j5",
  "message0": "johnny-five",
  "output": "JohnnyFive",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "object_board",
  "message0": "%1 Board",
  "args0": [
    {
      "type": "input_value",
      "name": "instance_johnny_five",
      "check": "JohnnyFive"
    }
  ],
  "output": "Board",
  "colour": 260,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_board_on",
  "message0": "%1 on %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-board",
      "check": "Board"
    },
    {
      "type": "field_dropdown",
      "name": "ready",
      "options": [
        [
          "ready",
          "ready"
        ],
        [
          "connect",
          "connect"
        ],
        [
          "exit",
          "exit"
        ],
        [
          "close",
          "close"
        ],
        [
          "info",
          "info"
        ],
        [
          "warn",
          "warn"
        ],
        [
          "fail",
          "fail"
        ],
        [
          "message",
          "message"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statement-input-body"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "object_led",
  "message0": "%1 Led , and port is %2",
  "args0": [
    {
      "type": "input_value",
      "name": "instance_johnny_five",
      "check": "JohnnyFive"
    },
    {
      "type": "field_input",
      "name": "param_led_port",
      "text": "13"
    }
  ],
  "output": "Led",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_led_on",
  "message0": "%1 on",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-led",
      "check": "Led"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_led_off",
  "message0": "%1 off",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-led",
      "check": "Led"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_led_toggle",
  "message0": "%1 toggle",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-led",
      "check": "Led"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_led_strobe",
  "message0": "%1 strobe %2 (ms) %3 [ callback ] %4",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-led",
      "check": "Led"
    },
    {
      "type": "field_input",
      "name": "param-led-strobe-time",
      "text": "100"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statement-input-callback"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_led_blink",
  "message0": "%1 blink %2 (ms) %3 [ callback ] %4",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-led",
      "check": "Led"
    },
    {
      "type": "field_input",
      "name": "param-led-blink-time",
      "text": "100"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statement-input-callback"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "function_led_stop",
  "message0": "%1 stop",
  "args0": [
    {
      "type": "input_value",
      "name": "value-input-led",
      "check": "Led"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
}]

export { customBlocks };