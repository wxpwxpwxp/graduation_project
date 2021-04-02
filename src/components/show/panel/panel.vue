<template>
    <div class="box">
      <div class="panel_top">
        <div class="panel_x">
          <div class="input-item">
            <div class="sprite-info_icon-wrapper_3Wbqq">
              <img class="sprite-info_icon_1iZ_9" src="/static/media/38a70367a21e2f1fb15aa59b7d367450.svg">
            </div>
            <span style="font-weight:bold;">x:</span>
            <input v-model="x" type="text" placeholder="x" tabindex="0" value="0" class="input_input-form input_input-small">
          </div>
        </div>
        <div class="panel_y">
          <div class="input-item">
            <div class="sprite-info_icon-wrapper_3Wbqq">
              <img class="sprite-info_icon_1iZ_9" src="/static/media/9ddae4f6c1aeaf0784007203d9d4ac9c.svg">
            </div>
            <span style="font-weight:bold;">y:</span>
            <input v-model="y" type="text" placeholder="y" tabindex="0" value="0" class="input_input-form input_input-small">
          </div>
        </div>
      </div>
      <div class="panel_bottom">
        <div class="panel-show">
          <div class="input-item">
            <span>&nbsp;&nbsp;显示</span>
            <div class="icon-box">
              <div class="icon-radio-first" :class="{iconSelector:role_show}" @click="roleShowChange(true)">
                <img class="sprite-info_icon_1iZ_9" src="/static/media/acc6c29b5eee67bc6b2aa85854d9bb3a.svg">
              </div>
              <div class="icon-radio-last" :class="{iconSelector:!role_show}" @click="roleShowChange(false)">
                <img class="sprite-info_icon_1iZ_9" src="/static/media/68d9ddbb2aa63310b88c7697e5b0c6c9.svg">
              </div>
            </div>
          </div>
        </div>
        <div class="panel-weight">
          <div class="input-item">
            <span>大小:</span>
            <input @input.stop="cancelBubble()" v-model="weight" type="text" placeholder="大小" tabindex="0" value="0" class="input_input-form input_input-small">
          </div>
        </div>
        <div class="panel-rotate">
          <div class="input-item">
            <span>方向:</span>
            <input v-model="rotate" type="text" placeholder="方向" tabindex="0" value="0" class="input_input-form input_input-small">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import functions from '../../../../static/js/executeFunc';
  import pubsub from 'pubsub-js';
  export default {
    data(){
      return {
        x:0,
        y:0,
        weight:100,
        rotate:0,
        role_show:true,
        role:null,
        guideComponent:null,
        mypubsub:null
      }
    },
    props:{
      that : Object
    },
    mounted () {
      Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(input =>{
        input.onkeydown = function (ev) {
          ev.stopPropagation();
        }
      })
      this.mypubsub = pubsub;
      let inputArray = document.getElementsByClassName('input_input-form')
      for(let i = 0 ; i < inputArray.length ; i++){
          inputArray[i].onclick = function (ev) {
            ev.stopPropagation();
            inputArray[i].classList.add('input-select');
            document.onmousedown = function () {
              document.onmousedown = null;
              inputArray[i].classList.remove('input-select');
            }
          }
      }
      this.role = this.that.$refs.role;
      let that = this;
      let roleClickFlag = true;
      this.role.onmousedown = function (ev) {
        roleClickFlag = true
        ev.stopPropagation();
        if(document.onmousedown !== null){
          document.onmousedown();
        }
        let event = ev || window.event;  //兼容IE浏览器
        //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        let client = this.getBoundingClientRect();
        let oldX = event.clientX;
        let oldY = event.clientY;
        document.onmousemove = function (ev) {
          roleClickFlag = false;
          let event = ev || window.event;
          let moveX = event.clientX-oldX;
          let moveY = event.clientY-oldY;
          oldX = event.clientX;
          oldY = event.clientY;
          that.x = that.x * 1  + moveX;
          that.y = that.y * 1  + moveY;
        }
        document.onmouseup = function (ev) {
          pubsub.publish('watchMouse');
          this.onmouseup = null;
          if(roleClickFlag){
            pubsub.publish('roleMouseDown');
          }
        }
      }

      pubsub.subscribe('execute',(subject,blocky)=>{
        if(functions.startBlocky === blocky){
          if(blocky.classList.contains('blocklyExecute')){
            functions.exit = true;
            functions.loop = [];
            functions.removeExecuteCss();
            functions.startBlocky = null;
          }else{
            functions.exit = false;
            functions.loop = [];
            functions.executefunc(blocky,this);
          }
        }else{
          functions.exit = false;
          functions.loop = [];
          functions.startBlocky = blocky;
          functions.executefunc(blocky,this);
        }
      })

      pubsub.subscribe('guideComponent',(subject,that)=>{
        this.guideComponent = that;
      })
    },
    methods:{
      cancelBubble(a,b,c){

      },
      roleShowChange(role_show){
        this.role_show = role_show;
      },
      getNewTranslate(){
        let x,y,weight,rotate;
        this.x || ( x = 0 );
        this.x && ( x = this.x * 1);
        Number.isNaN(this.x * 1) && (this.x = 0)

        this.y || ( y = 0 );
        this.y && ( y = this.y * 1);
        Number.isNaN(this.y * 1) && (this.y = 0)

        this.weight || ( weight = 0 );
        this.weight && ( weight = this.weight * 1);
        Number.isNaN(this.weight * 1) && (this.weight = 100)

        this.rotate || ( rotate = 0 );
        this.rotate && ( rotate = this.rotate * 1);
        Number.isNaN(this.rotate * 1) && (this.rotate = 0)
        weight = weight / 100;
        return 'translate(calc(-50% + '+x+'px), calc(-50% + '+y+'px)) '
        + 'scale('+weight+') '
        + 'rotate('+rotate+'deg)';
      }
    },
    watch:{
      x(){
        this.role.style.transform = this.getNewTranslate();
      },
      y(){
        this.role.style.transform = this.getNewTranslate();
      },
      role_show(){
        this.role_show && (this.role.style.visibility = 'visible')
        this.role_show ||  (this.role.style.visibility = 'hidden')
      },
      weight(){
        this.role.style.transform = this.getNewTranslate();
      },
      rotate(){
        this.role.style.transform = this.getNewTranslate();
      }
    }
  }
</script>

<style scoped>
  .box{
    height: 100%;
    width: 100%;
    font-size: 0.625rem;
  }

  .iconSelector{
    border-color: rgb(51, 115, 204) !important;
    filter: none !important;
  }

  .icon-box{
    white-space: nowrap;
    box-sizing: border-box;
    display: inline-block;
    -webkit-box-direction: normal;
    color: hsla(225, 15%, 40%, 1);
    position: absolute;
    top: 50%;
    transform: translate(0,-50%);
  }

  .sprite-info_icon-wrapper_3Wbqq{
    display: inline-block;
    width: calc(1rem + 2px);
    height: calc(1rem + 2px);
    outline: none;
    user-select: none;
    line-height: 2rem;
    transform: translate(-0.1rem,0.3rem);
  }

  .sprite-info_icon_1iZ_9{
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  img{
    border: 0;
  }

  .icon-radio-first{
    filter: saturate(0);
    cursor: pointer;
    display: inline-block;
    width: calc(1rem + 2px);
    height: calc(1rem + 2px);
    padding: 0.5rem;
    outline: none;
    user-select: none;
    white-space: nowrap;
    margin-right: 0;
    border: 1px solid hsla(0, 0%, 0%, 0.15);
    border-top-left-radius: calc(0.5rem / 2);
    border-bottom-left-radius: calc(0.5rem / 2);
    position: relative;
    left: 4px;
  }

  .icon-radio-last{
    border: 1px solid hsla(0, 0%, 0%, 0.15);
    border-top-right-radius: calc(0.5rem / 2);
    border-bottom-right-radius: calc(0.5rem / 2);
    filter: saturate(0);
    cursor: pointer;
    display: inline-block;
    width: calc(1rem + 2px);
    height: calc(1rem + 2px);
    padding: 0.5rem;
    outline: none;
    user-select: none;
    white-space: nowrap;
    margin-left: 0;
  }

  .panel_top{
    height: 50%;
    width: 100%;
    display: flex;
  }

  .panel_bottom{
    height: 50%;
    width: 100%;
    display: flex;
  }

  .panel-show{
    flex: 1;
    height: 100%;
    position: relative;
  }

  .panel-weight{
    flex: 1;
    height: 100%;
    position: relative;
  }

  .panel-rotate{
    flex: 1;
    height: 100%;
    position: relative;
  }

  .input-item{
    width: 8rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    /*border: 1px solid red;*/
    transform: translate(-50%,-50%);
    line-height: 2rem;
  }

  .panel_x{
    flex: 1;
    height: 100%;
    position: relative;
  }

  .panel_y{
    flex: 1;
    height: 100%;
    position: relative;
  }

  .input_input-small {
    width: 3rem;
    padding: 0 0.5rem;
    text-overflow: clip;
    text-align: center;
  }

  .input_input-form {
    height: 2rem;
    padding: 0 0.75rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 0.625rem;
    font-weight: bold;
    color: hsla(225, 15%, 40%, 1);
    border-width: 1px;
    border-style: solid;
    border-color: hsla(0, 0%, 0%, 0.15);
    border-radius: 2rem;
    outline: none;
    cursor: text;
    transition: 0.25s ease-out;
    box-shadow: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .input-select{
    box-shadow: 0px 0px 10px rgb(51, 115, 204);
    border-color: rgb(51, 115, 204);
  }

  .input_input-form:hover{
    border-color: rgb(51, 115, 204);
  }

  input {
    line-height: normal;
    font:inherit;
    margin: 0;
    border-image: initial;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    /*background-color: -internal-light-dark-color(white, black);*/
  }

</style>
