<template>
  <div class="box">
    <div class="info_box">
      <div class="info_list">
        <div class="info_item"><span>存档名:</span><input type="text" v-model="file_name"></div>
      </div>
    </div>
    <div class="button_box">
      <div class="button_list">
        <button style="background-color: #006700" @click="click()">保存</button>
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
      return{
        file_name:''
      }
    },
    props:{
      save:Function
    },
    methods:{
      click(){
        this.save(this.file_name);
      }
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
    margin-top: 100px;
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
