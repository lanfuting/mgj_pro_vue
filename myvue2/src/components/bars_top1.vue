
<style>
  .dv_top1 {
    widows: 100%;
    height: 33px;
    border-bottom: 1px solid #F0F0F0;
    padding-left: 20px;
  }

  .dv_top1_1 {
    margin-left: 50%;
  }

  .dv_top1 .dv_bar {
    width: 100px;
    float: left;
    text-decoration: none;

  }
  .dv_top1 .dv_bar .btn-link{
    outline: none;
    text-decoration: none;
    color: black;
    font-size: 13;
  }

  .dv_top1 .dv_bar .fa {
    margin-right: 10px;
    color: #FF6783;
    font-size: 18px;
  }
</style>
<template>
  <div class="dv_top1">
    <div class="dv_top1_1">
      <div v-for="t in top_bars" class="dv_bar">
        <button @click="topage(t.url)" class="btn btn-link"><i :class="t.pt"></i>{{t.name}}</button><span>|</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        top_bars: [{
            "name": "首页",
            "pt": "fa fa-home",
            "url": "main"
          },
          {
            "name": "商城",
            "pt": "fa fa-list-alt",
            "url": ""
          },
          {
            "name": "我的订单",
            "pt": "",
            "url": "orderinfo_topay"
          },
          {
            "name": "关于我们",
            "pt": "",
            "url": ""
          },
          {
            "name": "商家登录",
            "pt": "",
            "url": "supplier_register"
          },
          {
            "name": "添加商品",
            "pt": "",
            "url": "supplier_putgoods"
          }
        ]
      }
    },
    methods:{
      topage(url){
        this.$router.push({
          name:url,
        })
      }
    }
  }
</script>
