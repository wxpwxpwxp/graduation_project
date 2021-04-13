<template>
  <div class="box">
    <div class="stage">
      <img ref="role" draggable="false" src="/static/media/role.jpg" class="role" style="transform: translate(calc(-50%),-50%) scale(1) rotate(0deg)">
      <div ref="message_box"class="message_box" v-show="message_flag">
        <div class="arrow"></div>
        <div class="message">{{message}}</div>
      </div>
      <div class="input_box" v-show="input_flag"><input class="myinput" type="text" v-model="answer"></div>
    </div>
    <div class="panel">
      <panel :that="this"></panel>
    </div>
  </div>
</template>

<script>
  import panel from './panel/panel';
  import pubsub from 'pubsub-js';
export default {
  data(){
    return {
      message:'hello world aaa  a a daksdjflakj l ajsdfkljsdlk djsl  ',
      input_flag:false,
      answer:'',
      message_flag:false
    }
  },
  components:{
    panel
  },
  mounted () {
    let that = this;
    pubsub.subscribe('input_show',(subject)=>{
      this.answer = '';
      this.input_flag = true;
      this.input_flag && this.$nextTick(()=>{
        document.getElementsByClassName('myinput')[0].focus();
      })
      document.getElementsByClassName('myinput')[0].onkeydown = function (ev) {
        ev.stopPropagation();
        if(ev.keyCode === 13){
          that.input_flag = false;
          pubsub.publish('word_event',that.answer);
        }
      }
    })
  },
  methods:{
    message_show(message){
      this.message = message;
      this.message_flag = true;
      let role = this.$refs.role.getBoundingClientRect();
      let stage = this.$refs.role.parentNode.getBoundingClientRect()
      let x = role.left - stage.left + role.width / 2;
      let y = role.top -stage.top - role.height - 20;
      this.$refs.message_box.style.transform = 'translate('+x+'px,'+y+'px)';
    },
    getTransformXY (s) {
      s = s.match(/\((.+?)\)/g)[0]
      s = s.split(',')
      return {
        'x': s[0].slice(1),
        'y': s[1].slice(0, -1)
      }
    }
  }
}
</script>

<style scoped>
  .myinput{
    height: 100%;
    width: 100%;
    border-radius: 5px;
    font-size: 17px;
    border: 1px solid black;
  }


  .input_box{
    position: absolute;
    bottom: 30px;
    width: 80%;
    left: 10%;
    height: 30px;
  }

  .message{
    background-color: #a6a6ad;
    height: auto;
    width: 150px;
    min-height: 50px;
    left: 53px;
    top: 0px;
    position: absolute;
    padding: 5px 10px;
    border-radius: 5px;
    overflow: hidden;
    line-break: anywhere;
    color: white;
  }

  .message_box{
    position: absolute;
    transform: translate(100px,100px);
  }

  .arrow {
    width:0px;
    height:0px;
    border-top: 20px solid transparent;
    border-right: 30px solid #a6a6ad;
    border-left: 30px solid transparent;
    border-bottom: 20px solid transparent;
  }

  .box{
    height: calc(100% - 2px);
    width: 100%;
    position: relative;
  }

  .xuesister{
    height: 64px;
    width: 85.3px;
    transform-origin: center center;
    left: 50%;
    top: 50%;
    position: relative;
    user-select: none;
  }

  .role{
    height: 100px;
    width: 100px;
    transform-origin: center center;
    left: 50%;
    top: 50%;
    position: relative;
    user-select: none;
  }

  .stage{
    width: 99%;
    height: 80%;
    border: 1px solid hsla(0, 0%, 0%, 0.15);
    border-radius: 10px;
    box-sizing: content-box;
    overflow: hidden;
    background-color: white;
    position: relative;
    user-select: none;
    position: relative;
  }

  .panel{
    width: 99%;
    height: 19%;
    margin-top: 2px;
    border: 1px solid hsla(0, 0%, 0%, 0.15);
    border-radius: 10px;
    box-sizing: content-box;
    overflow: hidden;
    background-color: white;
  }


</style>
