<template>
  <div class="pos" id="pos">
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="点餐" name="order">
            <el-table :data="tableData"  style="width: 100%" height="400px">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" align="center" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" align="center" width="70"></el-table-column>
              <el-table-column label="操作" width="100" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delOrderList(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total-div">
              <small>数量：</small>{{totalCount}} <small>  金额：</small>{{totalMoney}}元
            </div>
            <div class="div-btn">
              <el-button type="warning" @click="addTempOrder">挂单</el-button>
              <el-button type="danger" @click="delAllOrderGoods">删除</el-button>
              <el-button type="success" @click="checkOut">结账</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="挂单" name="tempOrder">
            <el-table :data="tempData"  style="width: 100%" height="400px">
              <el-table-column prop="tempOrderNum" label="订单编号" align="center"></el-table-column>
              <el-table-column prop="orderDeskId" label="座位号" align="center" width="70"></el-table-column>
              <el-table-column prop="totalPrice" label="金额" align="center" width="60"></el-table-column>
              <el-table-column label="操作" width="90" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="showDetail(scope.row)">详情</el-button>
                  <el-button type="text" size="small" @click="checkTempOrder(scope.row)">结账</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total-div">
              <small>  总金额：</small>{{allTotalMoney}}元
            </div>
            <div class="div-btn">
              <el-button type="success" @click="checkAllOut">赵公子买单</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="外卖" name="takeOut">
            <el-table :data="takeOutData"  style="width: 100%" height="400px">
              <el-table-column prop="takeOutId" label="订单号" align="center"></el-table-column>
              <el-table-column prop="takeOutType" label="外卖平台" align="center"></el-table-column>
              <el-table-column prop="takeOutPrice" label="金额" align="center" width="60"></el-table-column>
              <el-table-column label="操作" width="90" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="checkTakeDetail(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-dialog :title="tempOrderNumTitle" :visible.sync="dialogTableVisible">
        <el-table :data="tempDetailData" style="width: 100%" height="300px">
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="count" label="数量" align="center" width="50"></el-table-column>
          <el-table-column prop="price" label="金额" align="center" width="70"></el-table-column>
        </el-table>
        <div class="total-div">
          <small>数量：</small>{{tempTotalCount}} <small>  金额：</small>{{tempTotalMoney}}元
        </div>
        <div class="div-btn">
          <el-button @click="dialogTableVisible = false">关闭</el-button>
          <el-button type="success" @click="checkDialogTempOrder">结账</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="takeOutTitle" :visible.sync="dialogTakeOutVisible">
        <div class="cunstomRelated">
          <span>姓名：{{takeOutDetail.customName}}</span>
          <span style="margin-left: 50px;">联系方式：{{takeOutDetail.callNumber}}</span>
        </div>
        <el-table :data="takeOutDetailData" style="width: 100%" height="300px">
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="count" label="数量" align="center" width="50"></el-table-column>
          <el-table-column prop="price" label="金额" align="center" width="70"></el-table-column>
        </el-table>
        <div class="total-div">
          <small>数量：</small>{{takeTotalCount}} <small>  金额：</small>{{takeTotalMoney}}元
        </div>
      </el-dialog>

      <el-col :span="17" class="goods-list">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-good-list">
            <ul>
              <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs type="card">
            <el-tab-pane label="汉堡">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" @click="addOrderList(goods)" >
                    <span class="foodImg"><img :src="goods.goodsImg" width="80" height="70"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="80" height="70"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="80" height="70"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="80" height="70"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </div>
</template>

<script>

  import axios from 'axios';
    export default {
        name: "Pos",
      data(){
          return {
            tableData: [],
            oftenGoods:[],
            type0Goods:[],
            type1Goods:[],
            type2Goods:[],
            type3Goods:[],
            totalCount:0,
            totalMoney:0,
            deskArr:[1,2,3,4,5,6,7,8,9,10],
            tempData:[],
            activeName:'order',
            tempOrderNumTitle:'',
            dialogTableVisible:false,
            dialogTakeOutVisible:false,
            tempDetailData:[],
            tempTotalCount:0,
            tempTotalMoney:0,
            tempDetail:{},
            allTotalMoney:0,
            takeOutData:[],
            takeOutTitle:'',
            takeOutDetailData:[],
            takeOutDetail:{},
            takeTotalCount:0,
            takeTotalMoney:0,
          }
      },
      created:function () {
        axios.get('https://www.easy-mock.com/mock/5c8d05d636743d2c6db8e7ba/pos/oftenGoods')
          .then(response =>{
            // console.log(response);
          this.oftenGoods = response.data;
          })
          .catch(error =>{
            // console.log(error)
            alert('网络错误，请检查您的网络！');
        });

        axios.get('https://www.easy-mock.com/mock/5c8d05d636743d2c6db8e7ba/pos/typeGoods#!method=get')
          .then(response =>{
            // console.log(response);
            this.type0Goods = response.data[0];
            this.type1Goods = response.data[1];
            this.type2Goods = response.data[2];
            this.type3Goods = response.data[3];
          })
          .catch(error =>{
            // console.log(error)
            alert('网络错误，请检查您的网络！');
          })

        axios.get('https://www.easy-mock.com/mock/5c8d05d636743d2c6db8e7ba/pos/takeOutsList')
          .then(response =>{
            // console.log(response);
            this.takeOutData = response.data;
          })
          .catch(error =>{
            // console.log(error)
            alert('网络错误，请检查您的网络！');
          })
      },
      methods:{
          addOrderList(goods){

              this.activeName = 'order';
              //  判断商品是否在订单列表中
              let isHave = false;
              for (let i = 0; i < this.tableData.length; i++){
                if (this.tableData[i].goodsId == goods.goodsId){
                  isHave = true;
                }
              }

              //  根据判断值写相应逻辑代码
              if (isHave){
                let arr = this.tableData.filter(item => item.goodsId == goods.goodsId);
                arr[0].count++;
              } else {
                let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                this.tableData.push(newGoods);
              }
              this.reCountTotalInfo(1);
          },
          delOrderList(goods){
            this.tableData = this.tableData.filter(item => item.goodsId != goods.goodsId);
            this.reCountTotalInfo(1);
          },
          addTempOrder(){
            if (this.totalCount != 0) {
              let tempDesk = this.getRandomDesk();
              if (tempDesk) {
                var params = {
                  tempOrderNum: this.getTempCode(),
                  orderDeskId: tempDesk,
                  totalPrice: this.totalMoney,
                  details: this.tableData
                }
                this.tableData = [];
                this.tempData.push(params);
              }
              this.reCountTotalInfo(3);
              this.activeName = 'tempOrder';
            }  else {
              this.$message.error('您没点单呀，老板了解你急切的心情，别着急呀！')
            }
          },
          showDetail(row){

            this.tempOrderNumTitle = '订单：' + row.tempOrderNum + ' 详情';
            this.tempDetailData = row.details;
            this.reCountTotalInfo(2);
            this.tempDetail = row;
            this.dialogTableVisible = true;

          },
          checkTakeDetail(row){

            this.takeOutTitle = row.takeOutType +'：'+ row.takeOutId+' 订单详情';
            this.takeOutDetailData = row.details;
            this.reCountTotalInfo(4);
            row.callNumber = row.callNumber.substr(0,3)+"****"+row.callNumber.substr(7);
            this.takeOutDetail = row;
            this.dialogTakeOutVisible = true;

          },
          checkDialogTempOrder(){

            this.checkTempOrder(this.tempDetail);
            this.tempDetail = {};

          },
          checkTempOrder(row){

              this.tempData = this.tempData.filter(item => item.tempOrderNum != row.tempOrderNum);
              this.$message({
                message: '结账成功，感谢你又为店里做出了一份贡献!',
                type: 'success'
              });
              this.deskArr.push(row.orderDeskId);
              this.dialogTableVisible = false;
              this.tempDetailData = [];

          },
          reCountTotalInfo(flag){

            if (flag == 1){
              //  totalCount、totalMoney初始化
              this.totalCount = 0;
              this.totalMoney = 0;


              //  计算totalCount、totalMoney
              if(this.tableData){
                this.tableData.forEach((item) => {
                  this.totalCount += item.count;
                  this.totalMoney = this.totalMoney + (item.price*item.count);
                })
              }
            } else if (flag == 2) {
              //  empTotalCount、tempTotalMoney初始化
              this.tempTotalCount = 0;
              this.tempTotalMoney = 0;

              debugger
              //  计算tempTotalCount、tempTotalMoney
              if(this.tempDetailData){
                this.tempDetailData.forEach((item) => {
                  this.tempTotalCount += item.count;
                  this.tempTotalMoney = this.tempTotalMoney + (item.price*item.count);
                })
              }
            } else if (flag == 3){
              //  allTotalMoney初始化
              this.allTotalMoney = 0;

              //  计算allTotalMoney
              if(this.tempData){
                this.tempData.forEach((item) => {
                  this.allTotalMoney += item.totalPrice;
                })
              }
            } else if (flag == 4) {
              //  empTotalCount、tempTotalMoney初始化
              this.takeTotalCount = 0;
              this.takeTotalMoney = 0;

              debugger
              //  计算tempTotalCount、tempTotalMoney
              if(this.takeOutDetailData){
                this.takeOutDetailData.forEach((item) => {
                  this.takeTotalCount += item.count;
                  this.takeTotalMoney = this.takeTotalMoney + (item.price*item.count);
                })
              }
            }


          },
          delAllOrderGoods(){
              this.tableData=[];
              this.totalCount = 0;
              this.totalMoney = 0;
          },
          checkOut(){
              // 模拟结账
              if (this.totalCount != 0){
                  this.tableData = [];
                  this.totalCount = 0;
                  this.totalMoney = 0;
                  this.$message({
                    message: '结账成功，感谢你又为店里做出了一份贡献!',
                    type: 'success'
                  });
              } else{
                this.$message.error('您没点单呀，老板了解你急切的心情，别着急呀！')
              }

          },
          checkAllOut(){
            // 模拟结账
            if (this.allTotalMoney != 0){
              this.tempData = [];
              this.allTotalMoney = 0;
              this.$message({
                message: '谢谢赵公子，请客吃饭!',
                type: 'success'
              });
              this.deskArr = [1,2,3,4,5,6,7,8,9,10];
            } else{
              this.$message.error('您没点单呀，老板了解你急切的心情，别着急呀！')
            }
          },
          getTempCode(){

              let date = new Date();
              let month = (date.getMonth() + 1).toString().padStart(2,'0');
              let strDate = date.getDate().toString().padStart(2,'0');
              let strHour = date.getHours().toString().padStart(2,'0');
              let strMinu = date.getMinutes().toString().padStart(2,'0');
              let strSec = date.getSeconds().toString().padStart(2,'0');

              return `TMP${month}${strDate}${strHour}${strMinu}${strSec}`;
          },
          getRandomDesk() {
            if (null != this.deskArr && this.deskArr.length > 0) {
              // 随机选择座位
              var item = this.deskArr[Math.floor(Math.random() * this.deskArr.length)];
              this.deskArr = this.deskArr.filter(data => data != item);
              return item;
            } else {
              this.$message.error('对不起，座位满了，请稍等片刻！')
              return false;
            }
          }
      }
    }
</script>

<style >

  .pos {
    font-size: 12px;
    height: 100%;
  }

  .pos-order{
    background-color:#F9FAFC;
    border-right: 1px solid #C0CCDA;
    height: 100%;
  }

  .goods-list{
    height: 100%;
  }

  .div-btn{
    margin-top: 10px;
  }

  .title{
    height: 20px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding: 10px;
    text-align: left;
  }

  .often-good-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    cursor: pointer;
  }

  .o-price{
    color:#25B7FF;
  }

  .goods-type{
    clear: both;
  }

  .cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
    cursor: pointer;
  }
  .cookList li span{
    display: block;
    float:left;
  }
  .foodImg{
    width: 40%;
  }
  .foodName{
    font-size: 18px;
    padding-left: 10px;
    color:brown;
  }
  .foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
  }

  .total-div{
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #D3DCE6;
  }

  .total-div small:nth-child(2){
    margin-left: 20px;
  }

  #pos .el-table__body-wrapper::-webkit-scrollbar{
    width: 6px;
    height: 6px;
    background-color: #F5F5F5;
    opacity:0;
  }

  /*!*定义滚动条轨道 内阴影+圆角*!*/
  #pos .el-table__body-wrapper::-webkit-scrollbar-track{
    opacity:0;
  }

  /*!*定义滑块 内阴影+圆角*!*/
  #pos .el-table__body-wrapper::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #1bb5d9;
  }

  #pos > div> div > div.el-dialog__header{
    text-align: left;
  }

  #pos > div > div > div.el-dialog__body{
    padding-top: 0 ;
  }

  .cunstomRelated{
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 20px;
    font-size: 24px;
    border-bottom: 1px solid #1bb5d9;
  }
</style>
