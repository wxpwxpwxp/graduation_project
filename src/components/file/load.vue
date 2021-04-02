<template>
  <div class="box">
    <div class="info_box">
      <div class="info_list">
        <div class="info_item" v-for="(val,key,i) in fileList" :key="key" ><span @click="my_load(key)">{{key}}</span>&nbsp;&nbsp;<p @click="remove(key)">删除</p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
  export default {
    data(){
      return   {
         fileList:null
      }
    },
    mounted () {
      let fileList = localStorage.getItem('fileList') || {};
      (typeof fileList === 'string') && (fileList = JSON.parse(fileList));
      this.fileList = fileList;
    },
    methods:{
      my_load(key){
        pubsub.publish('load_file',key)
      },
      remove(key){
        let fileList = localStorage.getItem('fileList') || {};
        (typeof fileList === 'string') && (fileList = JSON.parse(fileList));
        delete fileList[key];
        localStorage.setItem('fileList',JSON.stringify(fileList));
        this.fileList = fileList;
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
    height: 370px;
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
    width: 200px;
    box-shadow: 1px 1px 7px black;
    height: 30px;
    line-height: 30px;
    margin: 10px 0px;
    border-radius: 10px;
  }

  .info_item p{
    display: inline-block;
    color: red;
    font-size: 12px;
  }

</style>
