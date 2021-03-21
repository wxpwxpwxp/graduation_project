export default [
  //外观标签    y: 295-580  模块间距 小45 大55   模块高度 33
  {
    'tag':'g',
    'attributes':{
      'class':'categoryLabel',
      'transform':'translate(12,295) scale(0.675)',
      'display':'block',
      'style':'cursor: default;'
    },
    'children':[
      {
        'tag':'rect',
        'attributes':{
          'style':'opacity:0;',
          'rx':'4',
          'ry':'4',
          'width':'37',
          'height':'40'
        }
      },
      {
        'tag':'text',
        'content':'外观',
        'attributes':{
          'class':'blocklyFlyoutLabelText',
          'x':'19',
          'y':'20',
          'text-anchor':'middle',
          'dominant-baseline':'central',
          'dy':'0'
        }
      }
    ]
  },
  //外观 说...几秒模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'look_say_time',
        'data-category':'looks',
        'class':'blocklyDraggable',
        'transform':'translate(12,335) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#774DCB',
            'fill':'#9966FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'235',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'说',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'15',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'text number',
          'transform':'translate(43,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#774DCB',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'96',
              'd1':'m 0,0 m 16,0 H ',
              'd2':' a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z'
            }
          },
          {
            'tag':'g',
            'attributes':{
              'transform':'translate(8,0)',
              'style':'cursor: text;'
            },
            'children':[
              {
                'tag':'text',
                'content':'hello world!',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'look_say_time_says'
                }
              }
            ]
          }
        ]
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'text number',
          'transform':'translate(162,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#774DCB',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'24',
              'd1':'m 0,0 m 16,0 H ',
              'd2':' a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z'
            }
          },
          {
            'tag':'g',
            'attributes':{
              'transform':'translate(8,0)',
              'style':'cursor: text;'
            },
            'children':[
              {
                'tag':'text',
                'content':'2',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'look_say_time_times'
                }
              }
            ]
          }
        ]
      },
      {
        'tag':'text',
        'content':'秒',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'30',
          'transform':'translate(187, 24)'
        }
      }
    ]
  },
  //外观 说...模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'look_say',
        'data-category':'looks',
        'class':'blocklyDraggable',
        'transform':'translate(12,380) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#774DCB',
            'fill':'#9966FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'168',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'说',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'15',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'text number',
          'transform':'translate(43,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#774DCB',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'96',
              'd1':'m 0,0 m 16,0 H ',
              'd2':' a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z'
            }
          },
          {
            'tag':'g',
            'attributes':{
              'transform':'translate(8,0)',
              'style':'cursor: text;'
            },
            'children':[
              {
                'tag':'text',
                'content':'hello world!',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'look_say'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  //外观 大小模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'look_setsizeto',
        'data-category':'looks',
        'class':'blocklyDraggable',
        'transform':'translate(12,435) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#774DCB',
            'fill':'#9966FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'178.8',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'将大小设置为',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'50',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'text number',
          'transform':'translate(110,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#774DCB',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'41.8',
              'd1':'m 0,0 m 16,0 H ',
              'd2':' a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z'
            }
          },
          {
            'tag':'g',
            'attributes':{
              'transform':'translate(8,0)',
              'style':'cursor: text;'
            },
            'children':[
              {
                'tag':'text',
                'content':'100',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'look_setsizeto'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  //外观 颜色模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'look_setcolorto',
        'data-category':'looks',
        'class':'blocklyDraggable',
        'transform':'translate(12,480) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#774DCB',
            'fill':'#9966FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'161',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'将颜色设置为',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'50',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'string',
          'transform':'translate(110,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#774DCB',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'24',
              'd1':'m 0,0 m 16,0 H ',
              'd2':' a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z'
            }
          },
          {
            'tag':'g',
            'attributes':{
              'transform':'translate(8,0)',
              'style':'cursor: text;'
            },
            'children':[
              {
                'tag':'text',
                'content':'5',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'look_setcolorto'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  //外观 消失模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'look_hide',
        'data-category':'looks',
        'class':'blocklyDraggable',
        'transform':'translate(12,535) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#774DCB',
            'fill':'#9966FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'76',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'隐藏',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'30',
          'transform':'translate(8, 24)'
        }
      }
    ]
  },
  //外观 隐藏模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'look_show',
        'data-category':'looks',
        'class':'blocklyDraggable',
        'transform':'translate(12,580) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#774DCB',
            'fill':'#9966FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'76',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'显示',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'30',
          'transform':'translate(8, 24)'
        }
      }
    ]
  }
]
