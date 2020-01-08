<style>
  .dv_scrtop {
    width: 100%;
    height: 420px;
    position: relative;
    padding-left: 15px;
  }

  .dv_scrtop_lists {
    width: 76%;
    height: 420px;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
  }

  .dv_scrtop_left {
    widows: 100%;
    height: 100%;
    position: relative;
  }

  .dv_scrtop_btns {
    width: 100%;
    height: 30px;
    position: relative;
    top: -40px;
    text-align: right;
    padding-right: 30px;
  }

  .dv_scrtop_btn {
    margin-left: 20px;
    width: 30px;
    height: 10px;
    border-radius: 4px;
    background-color: hotpink;
    border: 0px;
    box-shadow: 0px 0px 4px 3px white;
  }

  .dv_scrtop_btn_color {
    background-color: #F8EFC0;
  }

  .dv_scrtop_bars {
    width: 135px;
    height: 100%;
    position: relative;
    left: 77%;
    top: -432px
  }

  .dv_scrtop_bar {
    width: 100%;
    height: 31%;
    margin-top: 10%;
    margin-left: 3%;
    background-size: 100%;
    border-radius: 9px;
  }

  .dv_scrtop_bars2 {
    width: 135px;
    height: 100%;
    position: relative;
    left: 88.2%;
    top: -865px
  }

  .dv_scrtop_bar:hover {
    transform: translateY(-4px);
    box-shadow: 0px 0px 3px #FFFAE8;
  }
</style>
<template>
  <div class="dv_scrtop">
    <!-- 轮播图 -->
    <div class="dv_scrtop_lists" @mouseover="scroll_stop()" @mouseout="scroll_start()">
      <div v-for="(s,i) in scroll_ph" :style="s.simgurl" class="dv_scrtop_left" v-if="i==scroll_index"></div>
      <div class="dv_scrtop_btns">
        <button :class="{'dv_scrtop_btn_color':i==scroll_index}" @mouseover="change_pt(i)" class="dv_scrtop_btn" v-for="(l,i) in scroll_ph.length"></button>
      </div>
    </div>
    <!-- 导航菜单 -->
    <div class="dv_scrtop_bars">
      <div v-for="(b,i) in bars_pts" :style="b" class="dv_scrtop_bar"></div>
    </div>
    <!-- 导航菜单 -->
    <div class="dv_scrtop_bars2">
      <div v-for="p in bar_ptssed" :style="p" class="dv_scrtop_bar"></div>
    </div>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        scroll_index: 0,
        scroll_pt: "",
        btn_color: false,
        bars_pts: [
          "background-image: url('http://127.0.0.1:8082/backstage/imgs/bars/ggzt (1).jpg')",
          "background-image: url('http://127.0.0.1:8082/backstage/imgs/bars/ggzt (2).jpg')",
          "background-image: url('http://127.0.0.1:8082/backstage/imgs/bars/ggzt (3).jpg')",
        ],
        bar_ptssed: [
          "background-image: url('http://127.0.0.1:8082/backstage/imgs/bars/ggzt (4).jpg')",
          "background-image: url('http://127.0.0.1:8082/backstage/imgs/bars/ggzt (1).gif')",
          "background-image: url('http://127.0.0.1:8082/backstage/imgs/bars/hifan (3).jpg')"
        ],
        scroll_ph: [],

      };
    },
    methods: {
      /* 从数据库获取轮播图路径，每隔两小时后台更新新的内容*/
      getscrollimg() {
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/changescrollimgs";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            po.scroll_ph = result;
            for (var i in po.scroll_ph) {
              po.scroll_ph[i].simgurl = "background-image: url('http://127.0.0.1:8082/backstage/imgs/rolladv/" + po.scroll_ph[
                i].simgurl + "')";
            }
          }
        });
      },
      // 点击小按钮，通过索引对应的id控制轮播的图片
      change_pt(i) {
        this.scroll_index = i;
      },
      // 鼠标移入轮播效果停止
      scroll_stop() {
        window.clearInterval(this.scroll_pt);
      },
      // 鼠标移出重新执行轮播方法
      scroll_start() {
        this.scrollpt();
      },
      // 轮播图每2.5s变化一次
      scrollpt() {
        var po = this;
        po.scroll_pt = window.setInterval(function() {
          po.scroll_index++;
          if (po.scroll_index == po.scroll_ph.length) {
            po.scroll_index = 0;
          }
        }, 2500);
      }
    },
    mounted() {
      this.scrollpt();
      this.getscrollimg();
    }
  }
</script>
