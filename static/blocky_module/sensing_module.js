export default [
  //侦测标签    y: 1529-1775  模块间距 小45
  {
    'tag':'g',
    'attributes':{
      'class':'categoryLabel',
      'transform':'translate(12,1529) scale(0.675)',
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
        'content':'侦测',
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
  //碰撞侦测
  {
    'tag':'g',
    'attributes':{
      'data-id':'sensing_touchingobject',
      'data-category':'sensing',
      'class':'booleanDraggable',
      'transform':'translate(12,1579) scale(0.675)',
      'shape':'boolean',
    },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#2E8EB8',
            'fill':'#5CB1D6',
            'fill-opacity':'1',
            'shape':'normal',
            'd1':'m 0,0 m 20,0 H ',
            'd2':' l 20 20 l -20 20 H 20 l -20 -20 l 20 -20 z',
            'd_width':'182.89832878112793'
          }
      },
      {
        'tag':'text',
        'content':'碰到',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(20, 20)'
        }
      },
      {
        'tag':'g',
        'attributes':{
          'class':'sensingMenu',
          'transform':'translate(60, 4)'
        },
        'children':[
          {
            'tag':'path',
            'attributes':{
              'class':'blocklyPath',
              'stroke':'#2E8EB8',
              'fill':'#47A8D1',
              'fill-opacity':'1',
              'shape':'normal',
              'd1':'m 0,0 m 16,0 H ',
              'd2':' a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z',
              'd_width':'90'
            }
          },
          {
            'tag':'g',
            'attributes':{
              'class':'blocklyEditableText',
              'transform':'translate(8, 0)',
              'style':'cursor: text;'
            },
            'children':[
              {
                'tag':'text',
                'content':'鼠标指针',
                'attributes':{
                  'class':'blocklyText',
                  'x':'35',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'middle',
                  'data-value':'sensing_touchobject'
                }
              },
              {
                'tag':'image',
                'attributes':{
                  'height':'12px',
                  'width':'12px',
                  'xlink:href':'/static/media/dropdown-arrow.svg',
                  'transform':'translate(74,11)'
                }
              }
            ]
          }
        ]
      },
      {
        'tag':'text',
        'content':'?',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'4.5',
          'transform':'translate(174, 20)'
        }
      }
    ]
  },
  //询问并等待
  {
    'tag':'g',
    'attributes':
      {
        'data-id':'askandwait',
        'data-category':'sensing',
        'class':'blocklyDraggable',
        'transform':'translate(12,1629) scale(0.675)',
        'shape':'normal',
        'shape-height':'33'
      },
    'children':[
      {
        'tag':'path',
        'attributes':
          {
            'class':'blocklyPath',
            'stroke':'#3373CC',
            'fill':'#4C97FF',
            'fill-opacity':'1',
            'shape':'normal',
            'd_width':'271',
            'd1':'m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
            'd2':' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
          }
      },
      {
        'tag':'text',
        'content':'询问',
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
              'stroke':'#2E8EB8',
              'fill':'#FFFFFF',
              'fill-opacity':'1',
              'shape':'normal',
              'd_width':'154',
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
                'content':'What\'s your name?',
                'attributes':{
                  'textArea':'true',
                  'class':'blocklyEditableText',
                  'x':'8',
                  'y':'18',
                  'dominant-baseline':'middle',
                  'dy':'0',
                  'text-anchor':'left',
                  'style':'fill:#000000;',
                  'data-value':'sensing_askandwait'
                }
              }
            ]
          }
        ]
      },
      {
        'tag':'text',
        'content':'并等待',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'24',
          'transform':'translate(222, 24)'
        }
      }
    ]
  },
  //获得回答
  {
    'tag':'g',
    'attributes':{
      'data-id':'answer',
      'data-category':'sensing',
      'class':'argumentDraggable',
      'transform':'translate(12,1674) scale(0.675)',
      'shape':'arg'
    },
    'children':[
      {
        'tag': 'path',
        'attributes':
          {
            'class': 'blocklyPath',
            'stroke': '#2E8EB8',
            'fill': '#5CB1D6',
            'fill-opacity': '1',
            'shape':'normal',
            'd1':'m 0,0 m 20,0 H ',
            'd2':' a 20 20 0 0 1 0 40 H 20 a 20 20 0 0 1 0 -40 z',
            'd_width':'36'

          }
      },
      {
        'tag':'text',
        'content':'回答',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'16',
          'transform':'translate(12, 20)'
        }
      }
    ]
  },
  //获得鼠标x值
  {
    'tag':'g',
    'attributes':{
      'data-id':'sensing_mousex',
      'data-category':'sensing',
      'class':'argumentDraggable',
      'transform':'translate(12,1729) scale(0.675)',
      'shape':'arg'
    },
    'children':[
      {
        'tag': 'path',
        'attributes':
          {
            'class': 'blocklyPath',
            'stroke': '#2E8EB8',
            'fill': '#5CB1D6',
            'fill-opacity': '1',
            'shape':'normal',
            'd1':'m 0,0 m 20,0 H ',
            'd2':' a 20 20 0 0 1 0 40 H 20 a 20 20 0 0 1 0 -40 z',
            'd_width':'92'
          }
      },
      {
        'tag':'text',
        'content':'角色的x坐标',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'44',
          'transform':'translate(12, 20)'
        }
      }
    ]
  },
  //获得鼠标y值
  {
    'tag':'g',
    'attributes':{
      'data-id':'sensing_mousey',
      'data-category':'sensing',
      'class':'argumentDraggable',
      'transform':'translate(12,1765) scale(0.675)',
      'shape':'arg'
    },
    'children':[
      {
        'tag': 'path',
        'attributes':
          {
            'class': 'blocklyPath',
            'stroke': '#2E8EB8',
            'fill': '#5CB1D6',
            'fill-opacity': '1',
            'shape':'normal',
            'd1':'m 0,0 m 20,0 H ',
            'd2':' a 20 20 0 0 1 0 40 H 20 a 20 20 0 0 1 0 -40 z',
            'd_width':'92'
          }
      },
      {
        'tag':'text',
        'content':'角色的y坐标',
        'attributes':{
          'class':'blocklyText',
          'text-anchor':'middle',
          'y':'2',
          'dominant-baseline':'middle',
          'dy':'0',
          'x':'44',
          'transform':'translate(12, 20)'
        }
      }
    ]
  },
]
