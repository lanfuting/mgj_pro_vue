<style>
  .container {
    width: 100%;
    height: 500px;
    padding: 0px;
    margin: 0px;
  }

</style>

<template>
  <div class="container" @click="upotherchangenull()">
     <!-- 顶部导航 -->
    <bars_top1></bars_top1>

    <!-- 搜索框以及各类图标-->
    <bars_top2></bars_top2>

    <!-- 轮播图和导航菜单 -->
    <scroll_top3></scroll_top3>

    <!-- 根据数据库，查看商品信息 -->
    <goodsinfos></goodsinfos>



  </div>
</template>

<script>
  import goodsinfos from '@/components/goodsinfos.vue'
  import bars_top1 from '@/components/bars_top1.vue'
  import bars_top2 from '@/components/bars_top2.vue'
  import scroll_top3 from '@/components/scroll_top3.vue'

  export default {
    components: {
      goodsinfos,
      bars_top1,
      bars_top2,
      scroll_top3
    },
    methods:{
      upotherchangenull(){
        this.$children[1].keywordlist=[];
      }
    }

  }
</script>
