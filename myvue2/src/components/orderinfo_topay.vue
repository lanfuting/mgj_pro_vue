<style scoped="scoped">
  .dv_order{
    width: 700px;
    height: 500px;
    margin: auto;
    padding: 40px;
  }
</style>

<template>
  <div class="container">
    <!-- 顶部导航 -->
    <bars_top1></bars_top1>
    <!-- 搜索框以及各类图标-->
    <bars_top2></bars_top2>

    <div class="dv_order">
      <table style="height: 280px; width: 100%;">
        <tr>
          <td  colspan="2" style="text-align: center;font-size: 25px;font-weight: bold;">请确认信息完成支付</td>
        </tr>
        <tr>
          <td>订单编号</td>
          <td>结算金额</td>
          <td>操作</td>
        </tr>
        <tr v-for="(o,i) in orderinfoes" >
          <td>{{o.ofid}}</td>
          <td>{{o.price}}</td>
          <td>
            <button @click="toalipay(i)"  class="btn btn-danger">结算</button>
          </td>
        </tr>
      </table>
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
        orderinfoes:[]
      };
    },
    mounted(){
      $(window).unbind("scroll");
      this.getorder_topay();
    },
    methods:{
        toalipay(i){
          var ofid = this.orderinfoes[i].ofid;
          var money = this.orderinfoes[i].price;
          window.open("http://127.0.0.1:8082/backstage/alitest?ofid="+ofid+"&money="+money);
        },
        getorder_topay(){
          var po = this;
          var url = "http://127.0.0.1:8082/backstage/getorderinfobyuserid";
          $.ajax(url, {
            xhrFields: {
              withCredentials: true
            },
            async:false,
            success: function(result) {
              po.orderinfoes=result;
            }
          });
        }
    }

  }
</script>
