<style>
  /* 返回顶页面 */
  .box-wrapper .btn-link{
    width: 50px;
    height: 50px;
    line-height: 40px;
    margin: auto;
    position: fixed;
    right: 10px;
    bottom: 50px;
    z-index: 12;
    border-radius: 6px;
    opacity: 0.8;
    background-color: hotpink;
    color: white;
    border:2px white solid;
  }
  .dv_img {
    width: 220px;
    height: 330px;
    margin: 6px;
    float: left;
    border-radius: 8px;
    box-shadow: 0px 4px 5px #555555;
    transition: all 0.2s;
    background-size: 100%;
  }

  .dv_img:hover {
    transform: translateY(-5px);
  }

  /* 瀑布流*/

  .box {
    height: 250px;
    margin: 9px;
    break-inside: avoid;
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 6px;
    margin-top: 12px;
    position: relative;
    overflow: hidden;
  }

  .box .goods_detail {
    width: 100%;
    height: 100%;
    position: absolute;
    box-shadow: 0px 0px 166px 4px black inset;
    opacity: 0;
    transition: all 0.3s;
    color: #FFFFFF;
  }

  .box:hover .goods_detail {
    opacity: 1;

  }

  .goods_detail button {

    background-color: #FFFFFF;
    color: gray;
    width: 40px;
    height: 40px;
    border-radius: 90px;
    border: 0px;
    font-size: 23px;
    float: right;
    margin-right: 20px;


  }

  .goods_detail button:first-child {
    margin-top: 20px;
  }

  .box:first-child {
    margin-top: 0px;
  }

  .spe {
    height: 300px;

  }

  .box-wrapper {
    column-count: 5;
    column-gap: 1px;
    width: 1200px;
    margin: auto;
    margin-top: 20px;
    position: relative;
  }
  .dv_btn_status{
    background-color: gold;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 90px;
    margin-left:-4px ;
  }
  .dv_btn_coll_2{
    width: 40px;
    height: 40px;
    border-radius: 90px;
    border: 0px;
    font-size: 23px;
    position: relative;
    left: 160px;
    background-color: #FFFFFF;
    color: gray;
    opacity: 0.5;
  }
  .dv_btn_coll_2 i{
    line-height: 40px;
    margin-left: 10px;
  }

</style>
<template>
  <div class="box-wrapper">
    <div @click="getgdid(g.gdid)" class="dv_img box" v-for="(g,i) in goodsinfos" :class="{'spe':((i%3==0)||(i%7==0))}" :style="g.gimgurl">
      <div class="goods_detail">
        <button class="dv_btn_nice">
          <i class="fa fa-thumbs-o-up"></i>
        </button>
        <br /><br /><br /><br />
        <button class="dv_btn_coll" @click.stop="putcollect(g.gdid)" v-for="c in collect_goods" v-if="g.gdid==c.gdid">
          <div :class="{'dv_btn_status':g.gdid==c.gdid}"><i class="fa fa-star-o"></i></div>
        </button>
        <div class="dv_btn_coll_2" @click.stop="putcollect(g.gdid)" >
          <i class="fa fa-star-o"></i>
        </div>
        <div></div>
        <br /><br /><br /><br /><br />
        <div class="text-center">
          <hr />
          {{g.gdname}}
        </div>
      </div>
    </div>
    <button  class="btn btn-link" @click="totop()"><i class="fa fa-arrow-up fa-2x"></i></button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        goodsinfos: [],
        pagecooke: false,
        gdid:0,
        online:false,
        collect_goods:[],
        showcolor:false,
      };
    },
    methods: {
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
              po.online=true;
            }
          }
        });
      },
      putcollect(id){
        this.putlogon();
        if (!this.online) {
          this.$router.push({
            name: "register"
          })
          return;
        }
        var po = this;
        po.gdid=id;
        console.log(po.gdid);
        var url = "http://127.0.0.1:8082/backstage/collect/favorites";
        $.ajax(url, {
          data: {
            gdid:po.gdid,
          },
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            if(result==true){
              console.log(result);
            }
          }
        });
      },
      // 为跳转页面添加点击事件
      getgdid(gdid){
        this.$router.push({
          name:"details_page",
          query:{
            gdid:gdid
          }
        })
      },
      // 滑动一定距离返回顶部
      totop(){
        $(document).scrollTop(0);
      },
      // 根据页面获取商品信息
      getgoodsinfo() {
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/goodsinfocontroller/selectbypage";
        $.ajax(url, {
          data: {
            page: this.page
          },
          success: function(result) {
            var gooslist = result;
            for (var i in gooslist) {
              gooslist[i].gimgurl = "background-image: url('http://127.0.0.1:8082/backstage/imgs/tp/" + gooslist[
                i].gimgurl + "')";
              po.goodsinfos.push(gooslist[i]);
            }
            po.pagecooke = false;
          }
        });
      },
      getcollectInfoes(){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/collect/favoriteinformations";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            po.collect_goods=result;
          }
        });
      }
    },
    mounted() {
      this.getcollectInfoes();
      this.getgoodsinfo();
      // 页面加载完，鼠标滑动到一定距离页面自加并调用方法，产生新页面
      var po = this;
      $(window).scroll(function() {
        var windowScrollTop = $(document).scrollTop();
        var lastGoods = $(".dv_img:last");
        if ($(lastGoods).offset().top - windowScrollTop < 500) {
          if (po.pagecooke == false) {
            po.pagecooke = true;
            po.page++;
            po.getgoodsinfo();
          }

        }
      });
    }

  }
</script>
