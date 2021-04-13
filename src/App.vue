<template>
  <div id="app" class="box">
    <div class="top">
      <my_top></my_top>
    </div>
    <div class="bottom">
      <div class="left">
        <my_guide></my_guide>
      </div>
      <div class="temp"></div>
      <div class="right">
        <my_show></my_show>
      </div>
    </div>
  </div>
</template>

<script>
import my_guide from './components/guide/guide'
import my_show from './components/show/show'
import my_top from './components/top'
export default {
  name: 'App',
  components:{my_guide,my_show,my_top}
}
</script>

<style scoped>
  .temp{
    width:5px;
    background: transparent;
    height: 100%;
  }

  .box{
    width: 100%;
    height: 100%;
  }

  .top{
    width: 100%;
    height: 50px;
  }

  .bottom{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
  }

  .left{
    flex: 7;
    min-width: 270px;
    height: 100%;
  }

  .right{
    flex: 3;
    height: 100%;
    min-width: 26rem;
  }
</style>
