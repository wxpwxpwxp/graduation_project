<template>
    <div class="box">
      <div class="info_box">
        <div class="info_list">
          <div class="info_item"><span>用户名:</span><input type="text" v-model="username"></div>
          <div class="info_item"><span>手机号:</span><input type="text" v-model="phone_number"></div>
          <div class="info_item"><span>昵&nbsp;&nbsp;称:</span><input type="text" v-model="nickname"></div>
          <div class="info_item"><span>密&nbsp;&nbsp;码:</span><input type="password" v-model="password"></div>
          <div class="info_item"><span>重复密码:</span><input type="password" v-model="ensure_password"></div>
        </div>
      </div>
      <div class="button_box">
        <div class="button_list">
          <button style="background-color: #006700" @click="register()">确认</button>
          <button style="background-color: #c40000" @click="cancel()">取消</button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    mounted () {
      let array = document.getElementsByTagName('input')
      for(let i = 0 ; i < array.length ; i++){
        array[i].onkeydown = function (ev) {
          ev.stopPropagation();
        }
      }
    },
    data(){
      return {
        username:'',
        password:'',
        ensure_password:'',
        phone_number:'',
        nickname:''
      }
    },
    methods:{
      register(){
        //localStorage.clear()
        let obj = {};
        obj.username = this.username;
        obj.password = this.password;
        obj.phone_number = this.phone_number;
        obj.nickname = this.nickname;
        let temp = localStorage.getItem('userList');
        if(temp) {
          temp = JSON.parse(temp);
          temp.push(obj);
          localStorage.setItem('userList',JSON.stringify(temp))
        }else {
          let userList = []
          userList.push(obj);
          localStorage.setItem('userList',JSON.stringify(userList))
        }
        this.cancel();
      }
    },
    props:{
      cancel:Function
    }
  }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 100%;
  }

  .info_box{
    position: relative;
    width: 100%;
    height: 300px;
  }

  .info_list{
    position: absolute;
    height: 250px;
    width: 100%;
    margin-top: 20px;
  }

  .info_item{
    height: 50px;
    width: 100%;
    text-align: center;
  }

  .info_item input{
    width: 250px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px black solid;
    outline: none;
    cursor: text;
    transition: 0.25s ease-out;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-shadow: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info_item span{
    display: inline-block;
    width: 80px;
  }

  .button_box{
    position: relative;
    width: 100%;
    height: 70px;
  }

  button {
    width: 100px;
    border-color: #357ebd;
    color: #fff;
    border-radius: 5px; /* future proofing */
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    font-size: 20px;
  }

  .button_list{
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    white-space: nowrap;
  }
</style>
