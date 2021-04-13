<template>
<div>
  <div class="box">
    <div class="info_box">
      <div class="info_list">
        <div class="info_item"><span>用户名:</span>{{user.username}}</div>
        <div class="info_item"><span>昵&nbsp;&nbsp;称:</span>{{user.nickname}}</div>
        <div class="info_item"><span>手机号:</span>{{user.phone_number}}</div>
      </div>
    </div>
    <div class="button_box">
      <div class="button_list">
        <button style="background-color: #c40000" @click="quit_login()">退出登录</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'information',
    props:{
      user:Object,
      quit_login:Function
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
