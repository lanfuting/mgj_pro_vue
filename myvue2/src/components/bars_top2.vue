<template>
  <transition name="slide-fade">
    <div class="dv_top2" :class="{'dv_top2_pos1':posmov}" v-if="showpos">
      <!-- 蘑菇街logo和目录 -->
      <div class="dv_top2_logo">
        <img src="../assets/mgjlogo.png" />
        <span><i class="fa fa-server"></i>目录</span>
      </div>
      <!-- 搜索栏 -->
      <div class="dv_top2_input">
        <input type="text" class="dv_top2_input_text" @keyup.38="chosebykeyup(-1)" @keyup.40="chosebykeyup(1)" @input="getgoodsbykeyword()"
          v-model="keyword" />
        <button class="dv_top2_input_btn"><i class="fa fa-search fa-2x"></i></button>
        <div class="dv_top2_show" v-for="(k,i) in keywordlist" :class="{'dv_top2_movecolor':i==listindex}">{{k.gtkeywords}}</div>
      </div>
      <!-- 购物车、下载app 等 图标 -->
      <div class="dv_top2_buyshop"><br /><br />
        <i style="cursor: pointer;" @click="getcartinfos(b.byurl)" v-for="b in buyshoplist" :class="b.bypt">&nbsp;&nbsp;&nbsp;&nbsp;</i><br />
        <span style="cursor: pointer;" @click="getcartinfos(b.byurl)" v-for="b in buyshoplist">{{b.byname}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div class="dv_top2_upapp">
        <!-- 未登录显示的信息-->
        <label v-if="!online" @click="toregister()" style="cursor: pointer;">
          <img src="../assets/upapp.png" />
          <span>登录</span>
        </label>
        <!-- 登录后显示的信息-->
        <div v-if="online" style="font-size: 20px;line-height: 40px; color: #FF4466;">
          hi，{{users.logname}}{{supplier.slogname}}!<br /> 欢迎登陆
          <button @click="outlogon()" class="btn btn-link" style="width: 62px;height: 25px;font-size: 12px;text-align: center;">退出登录</button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    data: function() {
      return {
        posmov: false,
        showpos: true,
        keyword: "",
        keywordlist: [],
        listindex: -1,
        users: [],
        supplier: [],
        online: false,
        supp_online:false,
        buyshoplist: [{
            "byname": "消息",
            "bypt": "fa fa-commenting-o",
            "byurl": ""
          },
          {
            "byname": "收藏",
            "bypt": "fa fa-star-o",
            "byurl": ""
          },
          {
            "byname": "购物车",
            "bypt": "fa fa-shopping-cart",
            "byurl": "cart"
          },
          {
            "byname": "下载APP",
            "bypt": "fa fa-arrow-down",
            "byurl": ""
          }
        ]
      }
    },
    methods: {
      /* 点击按钮退出登录，并跳转到登录页面*/
      outlogon(){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/outlogin";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            if(result){
              po.$router.push({
                name:"register",
              });
            }
          }
        });
      },
      /* 查看用户是否在线，以及用户信息*/
      cart_putlogon() {
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
      /* 检查是否有用户在线，没有跳转到登录页面，有跳转到购物车页面*/
      getcartinfos(url) {
        var po = this;
        this.cart_putlogon();
        if (!this.online) {
          this.$router.push({
            name: "register"
          })
          return;
        }
        po.tocartpage(url);
      },
      tocartpage(url) {
        this.$router.push({
          name: url,
        })
      },
      /* 跳转到登录页面*/
      toregister() {
        this.$router.push({
          name: "register"
        })
      },
      /* 输入框下来菜单,上下按键移动 */
      chosebykeyup(num) {
        this.listindex += num;
        if (this.listindex < 0) {
          this.listindex = (this.keywordlist.length - 1);
        }
        if (this.listindex > (this.keywordlist.length - 1)) {
          this.listindex = 0;
        }
        this.keyword = this.keywordlist[this.listindex].gtkeywords;
      },
      /* 根据关键字搜索显示在下拉框中 */
      getgoodsbykeyword() {
        var po = this;
        if (po.keyword == "") {
          po.keywordlist = [];
          return;
        }
        var url = "http://127.0.0.1:8082/backstage/goodsinfocontroller/selectbykeyword";
        $.ajax(url, {
          data: {
            "keyword": po.keyword
          },
          success: function(result) {
            po.keywordlist = result;
          }
        });
      }
    },
    mounted() {
      // 滑动鼠标到一定距离后，搜索框页面跟随
      var po = this;
      $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
          po.posmov = true;
        } else {
          po.posmov = false
        }
      });
      // 登录后带着信息，在登录按键上变成用户信息
      $.ajax("http://127.0.0.1:8082/backstage/useronline", {
        xhrFields: {
          withCredentials: true
        },
        success: function(result) {
          if (result.logname != undefined) {
            po.users = result;
            po.online = true;
          }
        }
      });
      // 登录后带着信息，在登录按键上变成商家信息
      $.ajax("http://127.0.0.1:8082/backstage/supplieronline", {
        xhrFields: {
          withCredentials: true
        },
        success: function(result) {
          if (result.slogname != undefined) {
            po.supplier = result;
            po.online = true;
          }
        }
      });
    }
  }
</script>

<style>
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateY(10px);
    opacity: 0;
  }

  .dv_top2 {
    width: 100%;
    height: 100px;
    margin: auto;
    background-color: white;
    position: relative;
    padding-left: 20px;
  }

  .dv_top2_pos1 {
    position: fixed;
    z-index: 20;
    top: 0px;
    box-shadow: 1px 2px 2px #5E5E5E;
    border-left: 0px;
  }

  .dv_top2_upapp {
    width: 170px;
    height: 100%;
    float: left;
    position: relative;
    padding-left: 10px;
  }

  .dv_top2_upapp img {
    width: 30px;
    height: 30px;
    margin-top: 40px;
  }

  .dv_top2_upapp span {
    position: relative;
    top: 20px;
  }

  .dv_top2_buyshop {
    padding-left: 20px;
    width: 210px;
    height: 100%;
    float: left;
  }

  .dv_top2_buyshop span {
    font-size: 12px;
  }

  .dv_top2_buyshop i {
    font-size: 20px;
  }

  .dv_top2_logo {
    width: 250px;
    height: 100%;
    float: left;
    position: relative;
    top: 5px;
    padding-left: 20px;
  }

  .dv_top2_logo img {
    padding-left: 5px;
    width: 120px;
    height: 90px;
  }

  .dv_top2_logo span {
    margin-left: 20px;
    font-size: 20px;
    position: relative;
    top: 3px;
  }


  .dv_top2_input {
    width: 552px;
    height: 48px;
    background-color: #F7F7F7;
    margin-left: 30px;
    float: left;
    margin-top: 30px;
    border-radius: 9px;
  }

  .dv_top2_input_text {
    height: 100%;
    width: 492px;
    border: 0px;
    background-color: transparent;
    outline: none;
    padding-left: 20px;
  }

  .dv_top2_input_btn {
    height: 100%;
    width: 56px;
    border-radius: 0px 9px 9px 0;
    border: 0px;
    outline: none;
    background-color: #8D8D8D;
  }

  .dv_top2_input_btn i {
    color: white;
  }

  .dv_top2_show {
    width: 552px;
    background-color: white;
    opacity: 0.97;
    margin-top: ;
    position: relative;
    z-index: 12;
    padding-left: 20px;
    line-height: 25px;
  }

  .dv_top2_show:last-child {
    padding-bottom: 20px;
  }

  .dv_top2_movecolor {
    background-color: hotpink;
    color: white;
  }
</style>
