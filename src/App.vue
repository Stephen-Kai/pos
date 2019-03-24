<template>
  <div id="app">
    <LeftNav></LeftNav>
    <div class="main">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import LeftNav from '@/components/common/LeftNav'
  export default {
    name: 'App',
    components: {
      LeftNav
    }
  }
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
  }
  .main{
    float: left;
    width:95%;
    background-color: #EFF2F7;
    height: 100%;
    overflow: hidden;
  }

  .el-table__body-wrapper::-webkit-scrollbar{
    width: 6px;
    height: 6px;
    background-color: #F5F5F5;
    opacity:0;
  }

  /*!*定义滚动条轨道 内阴影+圆角*!*/
  .el-table__body-wrapper::-webkit-scrollbar-track{
    opacity:0;
  }

  /*!*定义滑块 内阴影+圆角*!*/
  .el-table__body-wrapper::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #1bb5d9;
  }
</style>
