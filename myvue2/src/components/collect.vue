<style>
  .dv_collectgoods{
    width: 220px;
    height: 330px;
    margin: 10px;
    background-size: 100%;
    border-radius: 6px;
    margin-left: 20px;
    float: left;
  }

</style>

<template>
  <div class="container">

    <bars_top1></bars_top1>

    <bars_top2></bars_top2>

    <div v-for="(g,i) in goodsinfoes"  class="dv_collectgoods" :class="{'spe':((i%3==0)||(i%7==0))}"  :style="g.gimgurl" >
      <button class="btn btn-link" style="color: red;" @click="deletecollect(g.gdid)">delete</button>
      <div class="text-center" style="margin-top: 250px;">
        <hr />
        {{g.gdname}}
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
    data(){
      return{
        goodsinfoes:[],
        pagenum:1,
        locked:false,
      }
    },
    mounted(){
      this.getInfoes();
      $(window).unbind("scroll");
    },
    methods:{
      /* 根据商品的id删除当前收藏夹的商品*/
      deletecollect(gdid){
        console.log(gdid);
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/collect/deletemerchandise";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          data:{
            gdid:gdid,
          },
          success: function(result) {
           alert("已从收藏夹内移除");
          }
        });
      },
      getInfoes(){
        var po = this;
        var url = "http://127.0.0.1:8082/backstage/collect/favoriteinformations";
        $.ajax(url, {
          xhrFields: {
            withCredentials: true
          },
          success: function(result) {
            var gooslist = result;
            for (var i in gooslist) {
              gooslist[i].gimgurl = "background-image: url('http://127.0.0.1:8082/backstage/imgs/tp/" + gooslist[
                i].gimgurl + "')";
              po.goodsinfoes.push(gooslist[i]);
            }
          }
        });
      }
    }
  }
</script>
