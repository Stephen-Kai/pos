<template>
  <div class="good">
    <el-col :span="24" class="header-good">
      <el-input clearable class="search-input" v-model="searchWord" @keyup.enter.native="queryGoods"></el-input>
      <el-button type="primary" size="middle" @click="queryGoods">查询</el-button>
      <el-button type="primary" size="middle" @click="addGoods">新增</el-button>
    </el-col>
    <el-col :span="22"  class="good-list" >
      <el-table :data="tableDataComputed"  style="width: 100%" height="500px" :cell-style="{height:'51px'}">
        <el-table-column type="index" align="center" width="60"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center" min-width="100"></el-table-column>
        <el-table-column prop="price" label="商品价格" align="center" width="200"></el-table-column>
        <el-table-column label="商品图片"  min-width="480">
          <template slot-scope="scope">
            <img :src="scope.row.goodsImg" width=60  />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" >
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="editGoods(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delGoods(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog :title="goodsTitle" :visible.sync="goodDialogVisible" @close="closeGoodDialog('goodForm')">
      <el-form :model="goodForm" ref="goodForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="goodsName"
                      :rules="{required: true, message: '商品名称不能为空', trigger: 'blur'}">
          <el-input v-model.trim="goodForm.goodsName" placeholder="填写商品名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price"
                      :rules="{required: true, message: '商品价格不能为空', trigger: 'blur'}">
          <el-input v-model.trim="goodForm.price" type="number" placeholder="填写商品价格且为数字" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goodsImg"
                      :rules="[{required: true, message: '商品价格不能为空', trigger: 'blur'},
                              {pattern: /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/, message: '图片链接无效' }]">
          <el-input v-model.trim="goodForm.goodsImg" placeholder="填写商品图片链接" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodForm')">保存</el-button>
          <el-button @click="closeGoodDialog('goodForm')" >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'good',
    data () {

      var ValidHref = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入图片地址'));
        } else {
          if (this.goodForm.goodsImg !== '') {
            this.$refs.goodForm.validateField('checkPass');
          }
          callback();
        }
      };


      return {
        tableData:[],
        tableDataComputed:[],
        searchWord:'',
        goodsTitle:'',
        goodDialogVisible:false,
        goodForm:{},
        edit:false,
      }
    },
    methods:{
      queryGoods(){
        this.tableDataComputed = this.tableData;
        if (this.searchWord){
          let searchword = this.searchWord.toLowerCase();
          this.tableDataComputed = this.tableData.filter(item => item.goodsName.indexOf(searchword) > -1)
        }
      },
      addGoods(){
        this.goodForm={};
        this.edit=false;
        this.goodsTitle = '新增商品信息';
        this.goodDialogVisible = true;
      },
      closeGoodDialog(formName){
        this.$refs[formName].resetFields();
        this.goodDialogVisible = false;
      },
      editGoods(index,row){
        this.goodForm={};
        this.goodDialogVisible = true;
        this.edit=true;
        this.goodsTitle = '编辑商品信息';
        this.goodForm={
          goodsName:row.goodsName,
          price:row.price,
          goodsImg:row.goodsImg,
          index:index
        };
      },
      delGoods(index,row){
        this.tableDataComputed.splice(index,1);
      },
      submitForm(formName){
        let _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {

            let tempForm = Object.assign({},_this.goodForm);
            if (_this.edit){
              _this.tableDataComputed.splice(tempForm.index,1,tempFormm);
            } else if (!_this.edit) {
              _this.tableDataComputed.push(tempForm);
            }
            _this.$message({
              message: '保存成功！',
              type: 'success'
            });
            _this.goodDialogVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created:function () {
      axios.get('https://www.easy-mock.com/mock/5c8d05d636743d2c6db8e7ba/pos/goods')
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
  table > tbody > tr > td > div > img{
    cursor: pointer;
    transition: all 0.6s;
  }
  table > tbody > tr > td > div > img:hover{
    transform: scale(2);
  }

  .good{
    padding: 20px 10px;
  }

  .header-good{
    padding: 10px 30px;
    text-align: left;
  }
  .search-input{
    width: 200px;
  }

  .header-good button{
    margin-left: 30px;
  }

  .good-list{
    margin-left: 30px;
  }

</style>
