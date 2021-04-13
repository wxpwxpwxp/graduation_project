export default [
  //控制标签    y: 910-1437  模块间距 小45 大55     模块高度 33 213-143
  {
    'tag':'g',
    'attributes':{
      'class':'categoryLabel',
      'transform':'translate(12,910) scale(0.675)',
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
        'content':'控制',
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
  //等待模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'control_wait',
        'data-category':'controls',
        'class':'blocklyDraggable',
        'transform':'translate(12,950) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#CF8B17',
            'fill':'#FFAB19',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'124',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'等待',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'text number',
          'transform':'translate(48,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#CF8B17',
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
                  'data-value':'control_wait'
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
          'x':'8',
          'transform':'translate(96, 24)'
        }
      }
    ]
  },
  //重复几次模块
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'control_repeat',
        'data-category':'controls',
        'class':'blocklyDraggable',
        'transform':'translate(12,1005) scale(0.675)',
        'shape':'c',
        'shape-height':'70'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#CF8B17',
            'fill':'#FFAB19',
            'fill-opacity':'1',
            'shape':'c',
            'c-width':'164.9',
            'c-height':'16',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 64 c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 h -8  a 4,4 0 0,0 -4,4 v ',
            'd3':' a 4,4 0 0,0 4,4 h  8 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd4':' H ',
            'd5':' a 4,4 0 0,1 4,4 v 24  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'重复执行',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'32',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'data-argument-type':'text number',
          'transform':'translate(80,8)',
          'class':'blocklyEditableTextArea'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'textArea':'true',
              'class':'blocklyPath',
              'stroke':'#CF8B17',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'32.9',
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
                'content':'10',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'control_repeat'
                }
              }
            ]
          }
        ]
      },
      {
        'tag':'text',
        'content':'次',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'8',
          'transform':'translate(136.9, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'transform':'translate(136.9,76)'
        },
        'children':[
          {
            'tag':'image',
            'attributes':{
              'height':'24px',
              'width':'24px',
              'xlink:href':'/static/media/repeat.svg'
            }
          }
        ]
      }
    ]
  },
  //无限重复模块 间距  85  c 高度 70
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'control_forever',
        'data-category':'controls',
        'class':'blocklyDraggable',
        'transform':'translate(12,1090) scale(0.675)',
        'shape':'c',
        'shape-height':'70'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#CF8B17',
            'fill':'#FFAB19',
            'fill-opacity':'1',
            'shape':'c',
            'c-width':'156',
            'c-height':'16',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 64 c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 h -8  a 4,4 0 0,0 -4,4 v ',
            'd3':' a 4,4 0 0,0 4,4 h  8 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd4':' H ',
            'd5':' a 4,4 0 0,1 4,4 v 24  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'重复执行',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'32',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'transform':'translate(128,76)'
        },
        'children':[
          {
            'tag':'image',
            'attributes':{
              'height':'24px',
              'width':'24px',
              'xlink:href':'/static/media/repeat.svg'
            }
          }
        ]
      }
    ]
  },
  //if模块 间距  95
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'control_if',
        'data-category':'controls',
        'class':'blocklyDraggable',
        'transform':'translate(12,1195) scale(0.675)',
        'shape':'c',
        'shape-height':'70'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#CF8B17',
            'fill':'#FFAB19',
            'fill-opacity':'1',
            'shape':'c',
            'c-width':'156',
            'c-height':'16',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 64 c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 h -8  a 4,4 0 0,0 -4,4 v ',
            'd3':' a 4,4 0 0,0 4,4 h  8 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd4':' H ',
            'd5':' a 4,4 0 0,1 4,4 v 24  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'如果',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'path',
        'attributes':{
          'style':'visibility: visible',
          'fill':'#CF8B17',
          'transform':'translate(48,8)',
          'data-argument-type':'boolean',
          'd':'M 16,0  h 16 l 16,16 l -16,16 h -16 l -16,-16 l 16,-16 z',
          'class':'booleanArea',
          'd_width':'16'
        }
      },
      {
        'tag':'text',
        'content':'那么',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(104, 24)'
        }
      }
    ]
  },
  //if_else模块 间距 85
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'control_if_else',
        'data-category':'controls',
        'class':'blocklyDraggable',
        'transform':'translate(12,1280) scale(0.675)',
        'shape':'e',
        'shape-height':'108',
        'if-height':'16'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#CF8B17',
            'fill':'#FFAB19',
            'fill-opacity':'1',
            'shape':'e',
            'e-width':'156',
            'e-if-height':'16',
            'e-else-height':'16',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 64 c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 h -8  a 4,4 0 0,0 -4,4 v ',
            'd3':' a 4,4 0 0,0 4,4 h  8 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd4':' H ',
            'd5':' a 4,4 0 0,1 4,4 v 24  a 4,4 0 0,1 -4,4 H 64 c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 h -8  a 4,4 0 0,0 -4,4 v ',
            'd6':' a 4,4 0 0,0 4,4 h  8 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd7':' a 4,4 0 0,1 4,4 v 24  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'如果',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'path',
        'attributes':{
          'style':'visibility: visible',
          'fill':'#CF8B17',
          'transform':'translate(48,8)',
          'data-argument-type':'boolean',
          'd':'M 16,0  h 16 l 16,16 l -16,16 h -16 l -16,-16 l 16,-16 z',
          'class':'booleanArea',
          'd_width':'16'
        }
      },
      {
        'tag':'text',
        'content':'那么',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(104, 24)'
        }
      },
      {
        'tag':'text',
        'content':'否则',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(8, 88)'
        }
      }
    ]
  },
  //循环直到模块 间距 45
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'control_repeat_until',
        'data-category':'controls',
        'class':'blocklyDraggable',
        'transform':'translate(12,1427) scale(0.675)',
        'shape':'c',
        'shape-height':'70'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#CF8B17',
            'fill':'#FFAB19',
            'fill-opacity':'1',
            'shape':'c',
            'c-width':'164',
            'c-height':'16',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 64 c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 h -8  a 4,4 0 0,0 -4,4 v ',
            'd3':' a 4,4 0 0,0 4,4 h  8 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd4':' H ',
            'd5':' a 4,4 0 0,1 4,4 v 24  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'重复执行直到',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'48',
          'transform':'translate(8, 24)'
        }
      },
      {
        'tag':'path',
        'attributes':{
          'style':'visibility: visible',
          'fill':'#CF8B17',
          'transform':'translate(112,8)',
          'data-argument-type':'boolean',
          'd':'M 16,0  h 16 l 16,16 l -16,16 h -16 l -16,-16 l 16,-16 z',
          'class':'booleanArea',
          'd_width':'16'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'transform':'translate(128,76)'
        },
        'children':[
          {
            'tag':'image',
            'attributes':{
              'height':'24px',
              'width':'24px',
              'xlink:href':'/static/media/repeat.svg'
            }
          }
        ]
      }
    ]
  },
]
