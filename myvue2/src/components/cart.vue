<style>
  .container {
    width: 100%;
    height: 500px;
    padding: 0px;
    margin: 0px;
  }

  .dv_cart {
    width: 90%;
    padding-left: 120px;
  }

  .dv_cart_img {
    width: 80px;
    height: 90px;
    background-size: 100%;
  }

  .dv_cart .table {
    text-align: center;
    padding: 5px;
  }
  .dv_cart_payall{
    position:relative;height: 50px;width: 100%;
    background-color: #E5E5E5;text-align: center;
  }
  .dv_cart_paybtn{
    background-color: #FF4400; width: 150px;height: 100%;
    color: white;position: absolute;right: 0px;top: 0px;
    line-height: 50px;font-size: 20px;cursor: pointer;
  }
</style>
<template>
  <div class="container" @click="upotherchangenull()">
    <!-- 顶部导航 -->
    <bars_top1></bars_top1>
    <!-- 搜索框以及各类图标-->
    <bars_top2></bars_top2>
    <br />
    <!-- 当前登录用户的订单信息 -->
    <div class="dv_cart">
      <table class="table">
        <thead>
          <tr style="font-size: 20px; font-weight: bold;">
            <td>订单编号</td>
            <td>订单商品</td>
            <td>尺寸</td>
            <td>单价</td>
            <td>数量</td>
            <td>单类总价</td>
            <td>操作</td>
            <td><button class="btn btn-default" @click="changechouse()" v-model="chouseAll" style="font-size: 12px;">全选/全不选</button></td>
          </tr>
        </thead>
        <tr v-for="(c,index) in carts" height="100px" bgcolor="#FFF8E1">
          <td>{{c.ctid}}</td>
          <td>
            <div class="dv_cart_img" :style="c.gimgurl"></div>
          </td>
          <td>{{c.gstext}}</td>
          <td>¥{{c.price}}.00</td>
          <td>
            <button style="font-size: 9px;" class="btn btn-default" @click="changecount(index,-1)">-</button>
            {{c.gdcount}}件
            <button style="font-size: 9px;" class="btn btn-default" @click="changecount(index,1)">+</button>
          </td>
          <td>¥{{c.gdcount*c.price}}.00</td>
          <td>
            <input type="checkbox" :value="c.ctid" v-model="count_index" />
          </td>
          <td>
            <button @click="deletecart(c.ctid)" class="btn btn-danger">删除</button>
          </td>
        </tr>

      </table>
      <div class="text-center" style="margin-top: 10px;">
        <button class="btn btn-default" @click="getcartinfos(1)">首页</button>
        <button class="btn btn-default" @click="getcartinfos( (page-1<1)?1:(page-1) )">上一页</button>
        <button v-for="pn in pagecount" class="btn" :class="{'btn-primary':pn==page,'btn-link':pn!=page}" @click="getcartinfos(pn)">{{pn}}</button>
        <button class="btn btn-default" @click="getcartinfos((page+1>pagecount)?page:(page+1))">下一页</button>
        <button class="btn btn-default" @click="getcartinfos(pagecount)">尾页</button>
      </div>
      <div class="dv_cart_payall">
        <h5 style="line-height: 50px;">
          已选中<font style="color: #EF2F23;font-weight: bold;">{{count_index.length}}</font>件 &nbsp;&nbsp;&nbsp;
          合计（不含运费）：<font style="color: #EF2F23;font-weight: bold;font-size: 20px;">¥{{total}}.00</font>
        </h5>
        <div class="dv_cart_paybtn" @click="toorderinfo()">结算</div>
      </div>
    </div>

  </div>
</template>

<script>
  import bars_top1 from '@/components/bars_top1.vue'
  import bars_top2 from '@/components/bars_top2.vue'

  export default {
    components: {
      bars_top1,
      bars_top2
    },
    data() {
      return {
        /* 显示所有商品信息*/
        carts: [],
        /* 总计金额是多少*/
        total:0,
        /* 选中付款时的商品信息，得到商品的id*/
        count_index:[],
        /* 点击全选默认为不是*/
        chouseAll:false,
        /* 分页显示，当前页面*/
        page:1,
        /* 当前用户商品总页数*/
        pagecount:0
      };
    },
    watch:{
      count_index:function(){
        this.topay();
      },
      chouseAll:function () {
        if(this.chouseAll){
          for(var c in this.carts){
            this.count_index.push(this.carts[c].ctid);
          }
        }else{
          this.count_index=[];
        }
      }
    },
    mounted() {
      this.getcartinfos(this.page);
      $(window).unbind("scroll");


    },
    methods: {
      toorderinfo(){
        this.$router.push({
          name:"orderinfo",
          query:{
            count_index:this.count_index,
          }
        });
      },
      changechouse(){
        /* 点击全选，当业所有商品都选中，否则都不选*/
        this.chouseAll=!this.chouseAll;
      },
      topay(){
        /* 计算选中商品金额*/
        this.total=0;
        for(var i in this.count_index){
          for(var j in this.carts){
            if(this.carts[j].ctid==this.count_index[i]){
              this.total+=this.carts[j].price*this.carts[j].gdcount;
              break;
            }
          }
        }
      },
      /* 管理商品数量，点击增加或减少，传入商品的id编号，数量，接收到后返回来显示在页面上*/
      changecount(index,num){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/updatecart";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          async:false,
          data:{
            ctid:po.carts[index].ctid,
            count:(po.carts[index].gdcount+num)
          },
          success: function(result) {
            if(result==true){
              if((po.carts[index].gdcount+num)==0){
                po.carts.splice(index,1);
              }else{
                po.carts[index].gdcount=(po.carts[index].gdcount+num);
              }
              po.topay();
            }
          }
        });
      },
      /* 根据商品的id 删除*/
      deletecart(ctid){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/deletecartbyctid";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          data:{
            ctid:ctid
          },
          success: function(result) {
            po.getcartinfos(po.page);
          }
        });
      },
      /* 获取当前用户的信息，包括订单号，商品信息，商品数量、价格、图片url等*/
      getcartinfos(pn) {
        var po = this;
        po.page = pn;
        var url = "http://127.0.0.1:8082/backstage/selectcurrentusercart";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          data:{
            page:po.page
          },
          async:false,
          success: function(result) {
            /* 显示购物车页面获取分页信息*/
            po.pagecount = result.pagecount;
            po.carts = result.cartlist;
            for (var i in po.carts) {
              po.carts[i].gimgurl = "background-image: url('http://127.0.0.1:8082/backstage/imgs/tp/" + po.carts[
                i].gimgurl + "')";
            }
          }
        });
      },
      /* 下拉搜索框上下移动，可点击页面任何位置取消*/
      upotherchangenull() {
        this.$children[1].keywordlist = [];
      }
    }
  }
</script>
