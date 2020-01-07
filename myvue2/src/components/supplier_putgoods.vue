<style>
  .container {
    width: 100%;
    height: 500px;
    padding: 0px;
    margin: 0px;
  }
  .dv_putgoods{
    width: 500px;
    height: 400px;
    margin: auto;
  }
  .dv_putgoods table{
    line-height: 50px;
  }
  .dv_putgoods .dv_putgoods_td button{
    margin-left: 90px;
    margin-top: 50px;
  }
  .dv_dv_putgoods_btn{
    margin-left: 100px;
  }
  .dv_putgoods_change{
    margin-top: 150px;
    width: 400px;
    height: 250px;
  }
</style>

<template>
  <div class="container">
    <bars_top1></bars_top1>
    <bars_top2></bars_top2>
    <!-- 商品添加详情页面-->
    <div class="dv_putgoods">
      <form enctype="multipart/form-data" method="post" action="http://127.0.0.1:8082/backstage/supplier/testUploadimg">
        <table class="table">
          <tr>
            <td colspan="2">
              <h3>请添加所需商品的相关信息:</h3>
            </td>
          </tr>
          <tr>
            <td>商品名称:</td>
            <td>
              <input placeholder="请填写商品名称" type="text" name="gdname" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>商品图片:</td>
            <td>
              <input type="file" name="file" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>商品价格:</td>
            <td>
              <input placeholder="请填写商品价格" type="text" name="price" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>商品尺寸:</td>
            <td>
              <input placeholder="请填写商品尺寸" type="text" name="gsid" class="form-control" />
            </td>
          </tr>
          <tr>
            <td colspan="2" class="dv_putgoods_td">
              <button class="btn btn-primary" @click="supp_putgoods()">确定添加</button>
              <button class="btn btn-default" type="reset">取消添加</button>
            </td>
          </tr>
        </table>
      </form>
      <div class="dv_putgoods_change">
        <h3>请商家选择商品进行修改商品状态</h3>
        <select class="form-control" v-model="aparentid" >
          <option v-for="s in supp_goodslist">{{s.gdname}}</option>
        </select>
        <button @click="changegoods(1)" class="btn btn-info dv_dv_putgoods_btn">上架</button>
        <button @click="changegoods(0)" class="btn btn-danger dv_dv_putgoods_btn">下架</button>
      </div>
    </div>
  </div>
</template>

<script>
  import bars_top1 from '@/components/bars_top1.vue'
  import bars_top2 from '@/components/bars_top2.vue'

  export default {
    components: {
      bars_top1,bars_top2
    },
    data: function() {
      return {
        statuc:1,
        gdname:"",
        supp_goodslist:[],
        aparentid:0
      };
    },
    watch:{
    },
    methods: {
      selectgoods(){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/supplier/selectsuppliergoods";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            po.supp_goodslist=result;
          }
        });
      },
      /* 查看用户是否在线，以及用户信息*/
      supp_putlogon() {
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/supplieronline";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          async: false,
          success: function(result) {
            if (result.slogname == undefined) {
              po.$router.push({
                name: "supplier_register"
              });
            }
          }
        });
      },
      changegoods(i){
        var po = this;
        po.statuc=i;
        var url = "http://127.0.0.1:8082/backstage/supplier/changesuppgoods";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          data:{
            statuc:po.statuc,
            gdname:po.aparentid
          },
          success: function(result) {
            alert("设置成功！");
          }
        });
      }
    },
    mounted() {
      /* 商家未登录点击添加商品，会执行代码，未登录则要返回登录页面登录*/
      this.supp_putlogon();
      this.selectgoods();
    }
  }
</script>
