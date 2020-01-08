<style scoped="scoped">
  .container{
    padding: 30px;
    margin-top:60px;
  }
  .div_top{
    width: 100%;
    height: 55px;
    text-align: center;
  }
  table{
    width: 100%;
    text-align: center;
  }
  .dv_img {
    width: 80px;
    height: 90px;
    background-size: 100%;
  }
</style>

<template>
  <div class="containers">
    <bars_top1></bars_top1>

      <bars_top2></bars_top2>

      <div class="container">

        <div style="width:100%; ">
          <hr />

          <div class="div_top">

            <font size="5">发货单</font>
            <br />
            <br />

            <font>快递单号： </font>
          </div>
          <hr />
          <div >
            <table style="margin-left: -20px;">
              <tr>
                <td>商品编号</td>
                <td>商品信息</td>
                <td>发货商家</td>
                <td>尺寸</td>
                <td>单价</td>
                <td>数量</td>
                <td>金额</td>
                <td>收件人</td>
                <td>联系电话</td>
                <td>收货地址</td>
              </tr>
              <tr v-for="g in goodsorder">
                <td>{{g.gdid}}</td>
                <td>{{g.gdname}}</td>
                <td>{{g.slogname}}</td>
                <td>{{g.gstext}}</td>
                <td>¥{{g.price}}.00</td>
                <td>{{g.gdcount}}件</td>
                <td>¥{{g.money}}.00</td>
                <td>{{g.recipient}}</td>
                <td>{{g.contactnumber}}</td>
                <td>{{g.address}}</td>
              </tr>
            </table>
          </div>



        </div>
    </div>
  </div>
</template>

<script>
  import bars_top1 from '@/components/bars_top1.vue'
  import bars_top2 from '@/components/bars_top2.vue'
  export default{
    components:{bars_top1,bars_top2},
    data:function(){
      return{
        goodsorder:[]
      }
    },
    methods:{
      getuserorder(){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/supplier/selectusersorderbysuppId";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            po.goodsorder=result;
          }
        });
      }
    },
    mounted() {
      this.getuserorder();
    }
  }
</script>
