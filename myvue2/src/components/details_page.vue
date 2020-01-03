<style>
  .container {
    width: 100%;
    height: 500px;
    padding: 0px;
    margin: 0px;
  }
  .dv_det{
    width: 77%;
    height: 600px;
    margin-left: 40px;
    margin-top: 30px;
    float: left;
  }
  .dv_det_img{
    width: 400px;
    height: 600px;
    overflow: hidden;
    background-size: 100%;
    float: left;
  }
  .dv_det_message{
    width: 550px;
    height: 600px;
    float: left;
    margin-left: 10px;
  }
  .dv_det_mes_text,.dv_det_mes_price{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left:10px ;
    margin-top: 15px;
  }
  .dv_det_mes_price{
    width: 80%;
    margin-left: 3%;
    background-color: #F6F6F6;
  }
  .dv_det_mes_price font{
    padding-left: 5px;
    color: #EF2F23;
    line-height: 50px;
  }
   .dv_det_mes_price span{
    color:#EF2F23 ;
    font-size: 28px;
    margin-left: 20px;
   }
   .dv_det_mes_size,.dv_det_mes_num,.dv_det_mes_service,.dv_det_mes_buy,.dv_det_mes_pay{
     width: 100%;
     height: 50px;
     padding-left:10px ;
     margin-top: 20px;
     padding-top: 10px;
     float: left;
   }
   .dv_det_mes_buy{
     position: relative;
   }
   .dv_det_mes_size font,.dv_det_mes_num font{
     color: #9999B2;
     letter-spacing: 12px;
   }
   .dv_det_mes_size .btn-default{
     background-color: white;
     margin-left: 4px;
     margin-top: 9px;
   }
   .dv_det_mes_size_btn{
     border: 3px blue solid;
   }
   .dv_det_mes_buy_1,.dv_det_mes_buy_2{
     background-color: #EF2F23;
     width: 150px;
     height: 50px;
     float: left;
     font-size: 18px;
     text-align: center;
     line-height: 50px;
     margin-left:80px ;
     border-radius: 5px;
     color: white;
     cursor: pointer;
   }
   .dv_det_mes_buy_2{
     background-color: orange;
     margin-left: 30px;
   }
   .dv_det_mes_service{
     margin-top: 50px;
     float: left;
   }
   .dv_det_mes_service div{
     float: left;
   }
   .dv_det_mes_pay{
      margin-top: 50px;
     float: left;
   }
   .dv_det_mes_pay font{
     color: #9999B2;
   }
   .dv_new_shopps{
     width: 190px;
     float: left;
     padding-left: 10px;
     margin-top: 20px;
     border-left: 1px solid #9999B2;
   }
   .navbar-collapse{
     width: 100%;
     height: 40px;
     padding-left: 120px;
     background-color: #4D4D4D;
   }
   .navbar-collapse a{
     color: white;
   }
   .navbar-collapse a:hover{
     color: black;
   }
   /* 可以设置不同的进入和离开动画 */
   /* 设置持续时间和动画函数 */
   .slide-fade-enter-active {
     transition: all .3s ease;
   }
   .slide-fade-leave-active {
     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }
   .slide-fade-enter, .slide-fade-leave-to
   /* .slide-fade-leave-active for below version 2.1.8 */ {
     transform: translateY(-40px);
     opacity: 0;
   }
</style>
<template>
  <div class="container" @click="upotherchangenull()">
    <!-- 顶部导航 -->
    <bars_top1></bars_top1>
    <!-- 搜索框以及各类图标-->
    <bars_top2></bars_top2>
    <br />
    <div>
      <!-- 导航栏，下拉菜单 -->
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li class="active" v-for="s in dv_select"><a href="#">{{s.name}}</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">查看更多
              <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">鞋子</a></li>
              <li><a href="#">帽子</a></li>
              <li><a href="#">手套</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">精品衣装</li>
              <li><a href="#">内衣系列</a></li>
              <li><a href="#">内裤系列</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>


    <div class="dv_det">
      <!-- 左侧当前商品大图 -->
      <div class="dv_det_img" :style="goodsinfo.gimgurl"></div>
      <!-- 商品详细信息 -->
      <div class="dv_det_message">
        <div class="dv_det_mes_text">
          <h3 style="font-weight: bold;">{{goodsinfo.gdname}}</h3>
        </div>
        <div class="dv_det_mes_price">
          <font>价格:</font>
          <span>¥{{goodsinfo.price}}.00</span>
        </div>
        <div class="dv_det_mes_size">
          <font>尺码:</font>
          <button @click="changesize(g.gsid)" v-for="g in goodssize" class="btn btn-default" :class="{'dv_det_mes_size_btn':g.gsid==gsid}">{{g.gstext}}</button>
        </div>
        <div class="dv_det_mes_num">
          <font>数量:</font>
          <input type="number" min="1" max="10" v-model="goodcount" />
          <span style="font-size: 10px;">库存：100 &nbsp;&nbsp;/&nbsp;&nbsp;限购10件</span>
        </div>
        <div class="dv_det_mes_buy">
          <div class="dv_det_mes_buy_1">立即抢购</div>
          <transition name="slide-fade">
          <div v-if="show_putcart" style="width: 50px;height: 30px;position: absolute;left: 300px;top:-20px;font-size: 26px;color: #FF4466;">
            +{{goodcount}}
          </div>
          </transition>
          <div class="dv_det_mes_buy_2" @click="putcart()">加入购物车</div>
        </div>
        <div class="dv_det_mes_service">
          <div>
            <font style="color: #9999B2;">服务说明：</font>
          </div>
          <div v-for="d in dv_service"><img src="../assets/ok.png" style="width: 20px;" />{{d}}&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div class="dv_det_mes_pay">
          <font>支付方式：</font>
          <img src="../assets/z.jpg" style="width: 20px; cursor: pointer;" />
          <img src="../assets/w.jpg" style="width: 20px; cursor: pointer;" />
        </div>
      </div>
    </div>
    <div class="dv_new_shopps">
      <font style="color: #9999B2; margin-left:40px;font-size: 16px;">--&nbsp;&nbsp;新品上市&nbsp;&nbsp;--</font>
      <br /><br />
      <div v-for="s in dv_new_shop">
        <img :src="s.pt_url" style="width: 100%; cursor: pointer;" />
        <h5>{{s.new_price}}</h5>
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
        gdid: 0,
        goodssize: [],
        goodsinfo: {},
        dv_service: ['72小时发货', '7天无理由退货', '延误必赔', '退货补运费', '全国包邮'],
        dv_new_shop: [{
            new_price: "¥39.9",
            pt_url: "http://127.0.0.1:8082/backstage/imgs/h1.jpg"
          },
          {
            new_price: "¥69.9",
            pt_url: "http://127.0.0.1:8082/backstage/imgs/h2.jpg"
          },
          {
            new_price: "¥49.9",
            pt_url: "http://127.0.0.1:8082/backstage/imgs/h3.jpg"
          }
        ],
        dv_select: [{
            name: "欢迎小主驾临",
            url: ""
          },
          {
            name: "关于我们",
            url: ""
          },
          {
            name: "联系我们",
            url: ""
          },
          {
            name: "新品上市",
            url: ""
          },
          {
            name: "上衣套装",
            url: ""
          },
          {
            name: "裙装",
            url: ""
          },
          {
            name: "春季套装",
            url: ""
          },
          {
            name: "登录领券",
            url: ""
          },
          {
            name: "满减套餐",
            url: ""
          },
        ],
        gsid: 1,
        goodcount: 1,
        online: false,
        show_putcart:false

      };
    },
    methods: {
      /* 根据用户选择按钮改变衣服大小*/
      changesize(size) {
        this.gsid = size;
      },
      /* 查看用户是否在线，以及用户信息*/
      putlogon() {
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/useronline";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          async: false,
          success: function(result) {
            if (result.logname != undefined) {
              po.online = true;
            }
          }
        });
      },
      /* 加入购物车，需要商品的id，商品的大小，数量，在后台session中获取同一个session中的userid*/
      putcart() {
        this.putlogon();
        if (!this.online) {
          this.$router.push({
            name: "register"
          })
          return;
        }
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/getshopputusercart";
        $.ajax(url, {
          data: {
            gdid: po.gdid,
            gsid: po.gsid,
            gdcount: po.goodcount,
          },
          xhrFields: {
            withCredentials: true
          },
          async: false,
          success: function(result) {
            if (result==true) {
              po.show_putcart=true;
              window.setTimeout(function(){
                po.show_putcart=false;
              },700);
            }
          }
        });

      },
      // 搜索框下拉时，点击其他地方消失
      upotherchangenull() {
        this.$children[1].keywordlist = [];
      },
      // 获取当前商品的id，名字，价格，图片url
      getonlygoodsinfo() {
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/goodsinfocontroller/selectonlygoodsinfo";
        $.ajax(url, {
          data: {
            gdid: po.gdid
          },
          success: function(result) {
            po.goodsinfo = result.onlyGoodsinfo;
            po.goodssize = result.goodssize;
            po.goodsinfo.gimgurl = "background-image: url('http://127.0.0.1:8082/backstage/imgs/tp/" + po.goodsinfo
              .gimgurl + "')";
          }
        });
      }
    },
    mounted() {
      // 去除页面加载完找不到滚动事件的情况
      $(window).unbind("scroll");
      // 根据主页面点击获取id，从而根据id获取相对应的信息
      this.gdid = this.$route.query.gdid;
      this.getonlygoodsinfo();
    }
  }
</script>
