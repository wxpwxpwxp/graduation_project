<template>
    <div class="box">
      <div class="info_panel" v-if="panel_show">
        <div class="quit_box">
          <div class="quit" @click="quit()">X</div>
        </div>
        <div class="content_box">
          <my_register v-if="show_content === 'register'" :cancel="reigster_cancel"></my_register>
          <login v-if="show_content === 'login'" :cancel="cancel" :register="register" :login="login"></login>
          <information v-if="show_content === 'information'" :user="user" :quit_login="quit_login"></information>
          <save v-if="show_content === 'save'" :save="save"></save>
          <load v-if="show_content === 'load'"></load>
        </div>
      </div>
      <div class="login_box" @click="login_show()" v-if="login_flag"><span>登录/注册</span></div>
      <div class="login_box" v-if="!login_flag">
        <span @click="information_show()" >个人信息</span>
        <span @click="load_show()">加载存档</span>
        <span @click="save_show()">存档保存</span>
      </div>
    </div>
</template>

<script>
  import my_register from './user/register';
  import Login from './user/login';
  import Information from './user/information';
  import Save from './file/save';
  import pubsub from 'pubsub-js';
  import Load from './file/load'
  export default {
    data(){
      return{
        panel_show : false,
        show_content:'register',
        login_flag:true,
        user:{}
      }
    },
    name: 'top',
    components:{Load, Save, Information, Login, my_register},
    methods:{
      login_show(){
        this.panel_show = true;
        this.show_content = 'login'
      },
      quit(){
        this.panel_show = false
      },
      cancel(){
        this.panel_show = false
      },
      register(){
        this.show_content = 'register'
      },
      reigster_cancel(){
        this.show_content = 'login'
      },
      login(username,password){
        let userList = localStorage.getItem('userList') || [];
        userList = JSON.parse(userList);
        for(let i = 0 ; i < userList.length ; i++){
          if(userList[i].username === username && userList[i].password === password){
            this.login_flag = false
            this.show_content = 'information'
            this.user = userList[i];
            return;
          }
        }
      },
      information_show(){
        this.panel_show = true;
        this.show_content = 'information'
      },
      quit_login(){
        this.login_flag = true;
        this.user = {};
        this.panel_show = false;
      },
      save_show(){
        this.panel_show = true;
        this.show_content = 'save'
      },
      save(filename){
        pubsub.publish('save',filename);
        this.panel_show = false;
      },
      load_show(){
        this.panel_show = true;
        this.show_content = 'load'
      }
    }
  }
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  position: relative;
}

.content_box{
  height: 370px;
  width: 100%;
}

  .login_box{
    position: absolute;
    right: 200px;
    height: 30px;
    width: 60px;
    top: 10px;
    white-space: nowrap;
    line-height: 30px;
  }

  .login_box span{
    background-color: #357ebd;
    color: white;
    font-size: 14px;
    line-height: 20px;
    border-radius: 10px;
  }

  .info_panel{
    position: fixed;
    width: 400px;
    height: 400px;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    background-color: #CECDCE;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #CECDCE;
  }

  .quit_box{
    height: 30px;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.15);
    width: 100%;
    position: relative;
  }

  .quit{
    position: absolute;
    right: 0px;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 22px;
    line-height: 30px;
  }
</style>
