<template>
  <div class="left-nav">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#1D8CE0"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="open('/pos')">
        <i class="icon iconfont icon-goumai"></i>
        <span slot="title">收银</span>
      </el-menu-item>
      <el-menu-item index="2" @click="open('/shop')">
        <i class="icon iconfont icon-dianpu"></i>
        <span slot="title">店铺</span>
      </el-menu-item>
      <el-menu-item index="3" @click="open('/goods')">
        <i class="icon iconfont icon-hanbao"></i>
        <span slot="title">商品</span>
      </el-menu-item>
      <el-menu-item index="4"  @click="open('/vip')">
        <i class="icon iconfont icon-huiyuanqia"></i>
        <span slot="title">会员</span>
      </el-menu-item>
      <el-menu-item index="5"  @click="open('/setup')">
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "LeftNav",
        data(){
          return {

          }
        },
      methods:{
          open(url){
            this.$router.push(url);
          },
      }
    }
</script>

<style>
  .left-nav{
    color:#fff;
    font-size: 10px;
    height: 100%;
    background-color: #1D8CE0;
    float: left;
    width: 5%;
  }

  .iconfont{
    font-size: 18px;
  }

  .left-nav ul{
    padding: 0;
    margin: 0;
    border-right: none;
  }

  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    cursor: pointer;
    padding:0 !important;
  }

  .left-nav .el-menu-item i{
    color: #fff;
  }
  .left-nav .el-menu-item.is-active i{
    color: #ffd04b;
  }
</style>
