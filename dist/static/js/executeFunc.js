import {compileToFunctions} from 'vue-template-compiler'

export default {
  exit: false,
  loop: [],
  startBlocky: null,
  timeouts: [],
  newPromise (blocky, that) {
    return new Promise((resolve, reject) => {
      this.executefunc(blocky, that, resolve, reject)
    })
  },
  executefunc (blocky, that, resolve, reject) {
    let category = blocky.getAttribute('data-category')
    let func = blocky.getAttribute('data-id')
    return this[category][func](blocky, that, this, resolve, reject)
  },
  removeExecuteCss () {
    for (let i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i])
    }
    this.timeouts = []
    if (this.loop.length !== 0) {
      return
    }
    this.remove(this.startBlocky)
  },
  remove (blocky) {
    blocky && blocky.classList.remove('blocklyExecute')
    blocky && blocky.next && this.remove(blocky.next)
    blocky && blocky.innernext && this.remove(blocky.innernext)
    blocky && blocky.ifnext && this.remove(blocky.ifnext)
    blocky && blocky.elsenext && this.remove(blocky.elsenext)
  },
  resolve_arguments (blocky,that) {
    let args = []
    let child = blocky.firstChild
    while (child = child.nextElementSibling) {
      if (child.classList.contains('blocklyEditableTextArea') || child.classList.contains('argumentDraggable') || child.classList.contains('booleanDraggable') || child.classList.contains('booleanArea')) {
        if (child.getAttribute('visibility') !== 'hidden') {
          args.push(child)
        }
      }
    }
    let res = []
    for (let i = 0; i < args.length; i++) {
      args[i].classList.contains('blocklyEditableTextArea') && res.push(this.getAgrumentText(args[i]))
      args[i].classList.contains('booleanArea') && res.push(false)
      args[i].classList.contains('argumentDraggable') && res.push(this.executefunc(args[i],that))
      args[i].classList.contains('booleanDraggable') && res.push(this.executefunc(args[i],that))
    }
    return res
  },
  getAgrumentText (textArea) {
    return textArea.getElementsByClassName('blocklyEditableText')[0].textContent
  },
  'motions': {
    'motion_steps': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let steps = obj.resolve_arguments(blocky,that)[0] * 1
      Number.isNaN(steps) && (steps = 0)
      that.x = that.x * 1 + steps * 10
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'motion_turn_right': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let degrees = obj.resolve_arguments(blocky,that)[0] * 1
      Number.isNaN(degrees) && (degrees = 0)
      that.rotate = that.rotate * 1 + degrees
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'motion_turn_left': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let degrees = obj.resolve_arguments(blocky,that)[0] * -1
      Number.isNaN(degrees) && (degrees = 0)
      that.rotate = that.rotate * 1 + degrees
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'motion_goto': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let arg = blocky.getElementsByClassName('blocklyEditableText')[0].firstChild.textContent;
      let {width,height} = that.that.$refs.role.parentNode.getBoundingClientRect();
      if(arg === '鼠标位置'){
        let originX = (that.role.parentNode.getBoundingClientRect().x * 1)+ (width / 2);
        let originY = (that.role.parentNode.getBoundingClientRect().y * 1)+ (height / 2);
        that.x = (that.guideComponent.mousePosition.x * 1) - originX;
        that.y = (that.guideComponent.mousePosition.y * 1) - originY;
      }
      if(arg === '随机位置'){
        that.x = (Math.random() - 0.5) * width;
        that.y = (Math.random() - 0.5) * height;
      }

      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'motion_goto_xy': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let args = obj.resolve_arguments(blocky,that)
      let x = args[0] * 1;
      let y = args[1] * 1;
      !Number.isNaN(x) && (that.x = x)
      !Number.isNaN(y) && (that.y = y)
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
  },
  'looks': {
    'look_say_time': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let args = obj.resolve_arguments(blocky,that);
      let message = args[0];
      let time = args[1] * 1 * 1000;
      that.that.message_show(message);
      !Number.isNaN(time) && (setTimeout(() => {
        that.that.message_flag = false;
      }, time))
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'look_say': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let args = obj.resolve_arguments(blocky,that);
      let message = args[0];
      that.that.message_show(message);
      setTimeout(() => {
        that.that.message_flag = false;
      }, 2000)
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'look_setsizeto': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let weight = obj.resolve_arguments(blocky,that)[0] * 1
      !Number.isNaN(weight) && (that.weight = weight)
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'look_hide': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      that.role_show = false
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    },
    'look_show': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      that.role_show = true
      blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
      blocky.next || obj.removeExecuteCss()
      blocky.next || resolve === undefined || resolve()
    }
  },
  'controls': {
    'control_wait': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let time = obj.resolve_arguments(blocky,that)[0] * 1 * 1000;
      let timeoutID
      !Number.isNaN(time) && (timeoutID = setTimeout(() => {
        if (obj.exit) {
          reject && reject()
          obj.removeExecuteCss()
          return
        }
        blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
        blocky.next || obj.removeExecuteCss()
        blocky.next || resolve === undefined || resolve()
      }, time)) && (obj.timeouts.push(timeoutID))
    },
    'control_repeat': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject();
        obj.removeExecuteCss();
        return;
      }
      let times = obj.resolve_arguments(blocky,that[0]) * 1;
      obj.loop.push('repeat');
      let promise = new Promise((res) => {
        res();
      })
      for (let i = 0; i < times; i++) {
        promise = promise.then(() => {
          return obj.newPromise(blocky.innernext, that)
        }).then(() => {
          return new Promise((res) => {
            setTimeout(() => {
              res()
            }, 10)
          })
        })
      }
      promise.then(() => {
        obj.loop.pop()
        blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
        blocky.next || obj.removeExecuteCss()
        blocky.next || resolve === undefined || resolve()
      }).catch(() => {
        console.log('exit repeat')
        obj.loop.pop()
        blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
        blocky.next || obj.removeExecuteCss()
        blocky.next || resolve === undefined || resolve()
      })
    },
    'control_forever': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      obj.loop.push('forever');
      let promise = new Promise((res) => {
        res();
      })

      function command (obj, promise, blocky, that) {
        for (let i = 0; i < 100; i++) {
          if (obj.exit) {
            break;
          }
          promise = promise.then(() => {
            if (obj.exit) {
              obj.loop.pop()
              obj.removeExecuteCss()
              console.log('exit forever')
            }
            return obj.newPromise(blocky.innernext, that)
          }).then(() => {
            return new Promise((res) => {
              setTimeout(() => {
                res()
              }, 10)
            })
          })
        }
        promise.then(() => {
          command(obj, promise, blocky, that)
        }).catch(()=>{
          //
        })
      }

      promise.then(() => {
        if (!blocky.innernext) {
          obj.loop.pop()
          obj.removeExecuteCss()
          console.log('exit forever')
        } else {
          command(obj, promise, blocky, that)
        }
      })
    },
    'control_if': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let flag = obj.resolve_arguments(blocky,that)[0]
      let promise = new Promise((res) => {
        res()
      })
      if (flag) {
        obj.loop.push('if')
        blocky.innernext && (promise = promise.then(() => {
          return obj.newPromise(blocky.innernext, that)
        }))
      }
      promise.then(() => {
        obj.loop.pop()
        blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
        blocky.next || obj.removeExecuteCss()
        blocky.next || resolve === undefined || resolve()
      }).catch(() => {
        console.log('exit if')
      })
    },
    'control_if_else':function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let flag = obj.resolve_arguments(blocky,that)[0];
      let promise = new Promise((res) => {
        res()
      })
      if (flag) {
        obj.loop.push('if_else')
        blocky.ifnext && (promise = promise.then(() => {
          return obj.newPromise(blocky.ifnext, that)
        }))
      }else {
        obj.loop.push('if_else')
        blocky.elsenext && (promise = promise.then(() => {
          return obj.newPromise(blocky.elsenext, that)
        }))
      }
      promise.then(() => {
        obj.loop.pop()
        blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
        blocky.next || obj.removeExecuteCss()
        blocky.next || resolve === undefined || resolve()
      }).catch(() => {
        console.log('exit if_else')
      })
    },
    'control_repeat_until':function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      obj.loop.push('repeat until');
      let promise = new Promise((res) => {
        res();
      })

      function end(promise){
        promise.catch(() => {
          obj.loop.pop()
          blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
          blocky.next || obj.removeExecuteCss()
          blocky.next || resolve === undefined || resolve()
        })
      }
      function command (obj, promise, blocky, that) {
        for (let i = 0; i < 100; i++) {
          if (obj.exit) {
            break;
          }
          promise = promise.then(() => {
            if (obj.exit) {
              obj.loop.pop()
              obj.removeExecuteCss()
              console.log('exit forever')
            }
            let flag = obj.resolve_arguments(blocky,that)[0];
            if(flag){
              end(promise);
              return Promise.reject();
            }else {
              return obj.newPromise(blocky.innernext, that)
            }
          }).then(() => {
            return new Promise((res) => {
              setTimeout(() => {
                res()
              }, 10)
            })
          })
        }
        promise.then(() => {
          command(obj, promise, blocky, that)
        }).catch(()=>{
          //
        })
      }

      promise.then(() => {
        if (!blocky.innernext) {
          obj.loop.pop()
          obj.removeExecuteCss()
          console.log('exit repeat until')
        } else {
          command(obj, promise, blocky, that)
        }
      })
    }
  },
  'events':{
    'event_whenspritepressed':function (blocky, that, obj) {
      blocky.next && obj.executefunc(blocky.next, that)
      blocky.next || obj.removeExecuteCss()
    },
    'event_whenkeypressed':function (blocky, that, obj) {
      blocky.next && obj.executefunc(blocky.next, that)
      blocky.next || obj.removeExecuteCss()
    },
    'event_whensmessagereceived':function (blocky, that, obj) {
      blocky.next && obj.executefunc(blocky.next, that)
      blocky.next || obj.removeExecuteCss()
    }
  },
  'sensing': {
    'sensing_touchingobject': function (blocky, that, obj) {
      let arg = blocky.getElementsByClassName('blocklyEditableText')[0].firstChild.textContent;
      function Inbox (x1,y1,width,height,x2,y2) {
        return (((x1 * 1) < (x2 * 1)) && ((x2 * 1) < ((x1 * 1) + (width * 1)))) && (((y1 * 1) < (y2 * 1)) && ((y2 * 1) < ((y1 * 1) + (height * 1))));
      }
      if(arg === '鼠标指针') {
        let obj = that.that.$refs.role.getBoundingClientRect();
        return  Inbox(obj.left, obj.top, obj.width, obj.height, that.guideComponent.mousePosition.x, that.guideComponent.mousePosition.y)
      }else if(arg === '舞台边缘'){
        let args = [];
        let res = [];
        let obj = that.that.$refs.role.getBoundingClientRect();
        args.push({'x':obj.left,'y':obj.top});
        args.push({'x':obj.left + obj.width,'y':obj.top});
        args.push({'x':obj.left,'y':obj.top + obj.height});
        args.push({'x':obj.left + obj.width,'y':obj.top + obj.height});
        let parent_obj = that.that.$refs.role.parentNode.getBoundingClientRect();
        for(let i = 0 ; i < args.length ; i++){
          if(!Inbox(parent_obj.left,parent_obj.top,parent_obj.width,parent_obj.height,args[i].x,args[i].y)){
            return true;
          }
        }
        return false;
      }else{
        return false;
      }
    },
    'askandwait': function (blocky, that, obj, resolve, reject) {
      if (obj.exit) {
        reject && reject()
        obj.removeExecuteCss()
        return
      }
      let args = obj.resolve_arguments(blocky,that);
      let message = args[0];
      let time = 2000;
      that.that.message_show(message);
      that.mypubsub.publish('input_show');
      !Number.isNaN(time) && (setTimeout(() => {
        that.that.message_flag = false;
        if (obj.exit) {
          reject && reject()
          obj.removeExecuteCss()
          return
        }
        blocky.next && obj.executefunc(blocky.next, that, resolve, reject)
        blocky.next || obj.removeExecuteCss()
        blocky.next || resolve === undefined || resolve()
      }, time))
    },
    'answer': function (blocky, that, obj) {
      return that.that.answer;
    },
    'sensing_mousex': function (blocky, that, obj) {
      return that.x;
    },
    'sensing_mousey': function (blocky, that, obj) {
      return that.y;
    }
  },
  'operators': {
    'operator_add': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return args[0] * 1 + args[1] * 1
    },
    'operator_subtract': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return args[0] * 1 - args[1] * 1
    },
    'operator_multiply': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return (args[0] * 1) * (args[1] * 1)
    },
    'operator_divide': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return (args[0] * 1) / (args[1] * 1)
    },
    'operator_random': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      let max, min
      if ((args[0] * 1) > (args[1] * 1)) {
        max = args[0] * 1
        min = args[1] * 1
      } else {
        max = args[1] * 1
        min = args[0] * 1
      }
      return Math.random() * (max - min) + min
    },
    'operator_gt': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      if ((args[0] * 1) > (args[1] * 1)) {
        return true
      } else {
        return false
      }
    },
    'operator_lt': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      if ((args[0] * 1) < (args[1] * 1)) {
        return true
      } else {
        return false
      }
    },
    'operator_eq': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      if ( args[0] === args[1] ) {
        return true
      } else {
        return false
      }
    },
    'operator_and': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return args[0] && args[1]
    },
    'operator_or': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return args[0] || args[1]
    },
    'operator_not': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return !args[0]
    },
    'operator_join': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return (args[0] + '') + (args[1] + '')
    },
    'operator_letter_of': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      let text = args[0] + ''
      let index = args[1] * 1
      Number.isNaN(index) && (index = 0)
      if (index > 0 && index < text.length) {
        return text[index + 1]
      } else {
        return ''
      }
    },
    'operator_charNumber': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return args[0] + ''.length
    },
    'operator_contains': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      if ((args[0] + '').indexOf(args[1] + '') !== -1) {
        return true
      } else {
        return false
      }
    },
    'operator_mod': function (blocky, that, obj) {
      let args = obj.resolve_arguments(blocky,that)
      return (args[0] * 1) % (args[1] * 1)
    }
  }
}
