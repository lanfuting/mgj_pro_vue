<style>
  .dv_order{
    width: 500px;
    height: 500px;
    margin: auto;
    padding: 50px;
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
          <td colspan="2" style="text-align: center;font-size: 25px;font-weight: bold;">请填写收件信息</td>
        </tr>
        <tr>
          <td>收件人：</td>
          <td>
            <input type="text" v-model="recipient" class="form-control"/>
          </td>
        </tr>
        <tr>
          <td>联系电话：</td>
          <td>
            <input type="text" v-model="contactnumber" class="form-control"/>
          </td>
        </tr>
        <tr>
          <td>收件地址：</td>
          <td>
            <input type="text" v-model="address" class="form-control"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click="mkorder()" style="margin-left: 320px;" class="btn btn-danger">确认信息</button>
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
        address:"青岛市即墨市古城",
        recipient:"张三",
        contactnumber:"15811111111",
        orderlist:[]
      };
    },
    mounted(){
      /* 把选中结算的商品，放到数组中*/
      this.orderlist=this.$route.query.count_index;
      $(window).unbind("scroll");
    },
    methods:{
      /* 传回数据，得到订单信息*/
        mkorder(){
          var po = this;
          var url = "http://127.0.0.1:8082/backstage/getorderinfo";
          $.ajax(url, {
            xhrFields: {
              withCredentials: true
            },
            data:{
              address:po.address,
              recipient:po.recipient,
              contactnumber:po.contactnumber,
              orderlist:po.orderlist
            },
            //层次序列化数组信息，以进行 ajax数组 数据的传递
            traditional:true,
            success: function(result) {
              if(result!=undefined){
                po.$router.push({
                  name:"orderinfo_topay"
                });
              }
            }
          });
        }
    }

  }
</script>
