<template>
  <div class="shop">
    <el-col :span="24" class="header-shop">
      <el-input clearable class="search-input" v-model="searchWord" @keyup.enter.native="queryShop"></el-input>
      <el-button type="primary" size="middle" @click="queryShop">查询</el-button>
      <el-button type="primary" size="middle" @click="addShop">新增</el-button>
    </el-col>
    <el-col :span="22"  class="shop-list" >
      <el-table :data="tableDataComputed"  style="width: 100%" height="500px">
        <el-table-column type="index" align="center" width="50"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称" align="center" width="80"></el-table-column>
        <el-table-column prop="mjBuss" label="主营" align="center" width="200"></el-table-column>
        <el-table-column prop="shopAdress" label="店铺地址"  min-width="480"></el-table-column>
        <el-table-column label="操作" width="60" align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delShop(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog :title="shopTitle" :visible.sync="shopDialogVisible">
      <el-form :model="shopForm" ref="shopForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="店铺名称" prop="shopName">
          <el-input v-model.trim="shopForm.shopName" clearable></el-input>
        </el-form-item>
        <el-form-item label="主营" prop="mjBuss">
          <el-input v-model.trim="shopForm.mjBuss" clearable></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="shopAdress">
          <el-input v-model.trim="shopForm.shopAdress" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'shop',
    data () {
      return {
        tableData:[],
        tableDataComputed:[],
        searchWord:'',
        shopTitle:'',
        shopDialogVisible:false,
        shopForm:{}
      }
    },
    methods:{
      queryShop(){
        this.tableDataComputed = this.tableData;
        if (this.searchWord){
          let searchword = this.searchWord.toLowerCase();
          this.tableDataComputed = this.tableData.filter(item => item.shopName.indexOf(searchword) > -1)
        }
      },
      addShop(){
        this.shopTitle = '新增店铺';
        this.shopDialogVisible = true;

      },
      delShop(row){

      }
    },
    created:function () {
      axios.get('https://www.easy-mock.com/mock/5c8d05d636743d2c6db8e7ba/pos/shops')
        .then(response =>{
          // console.log(response);
          this.tableData = response.data;
          this.tableDataComputed = this.tableData;
        })
        .catch(error =>{
          // console.log(error)
          alert('网络错误，请检查您的网络！');
        });
    }
  }
</script>

<style scoped>

  .shop{
    padding: 20px 10px;
  }

  .header-shop{
    padding: 10px 30px;
    text-align: left;
  }
  .search-input{
    width: 200px;
  }

  .header-shop button{
    margin-left: 30px;
  }

  .shop-list{
    margin-left: 30px;
  }
</style>
