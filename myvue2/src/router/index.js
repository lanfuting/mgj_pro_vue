import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main.vue'
import details_page from '@/components/details_page.vue'
import register from '@/components/register.vue'
import register_post from '@/components/register_post.vue'
import cart from '@/components/cart.vue'
import orderinfo from '@/components/orderinfo.vue'
import orderinfo_topay from '@/components/orderinfo_topay.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/register_post',
      name: 'register_post',
      component: register_post
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/orderinfo_topay',
      name: 'orderinfo_topay',
      component: orderinfo_topay
    },
    {
      path: '/orderinfo',
      name: 'orderinfo',
      component: orderinfo
    },
    {
      path: '/details_page',
      name: 'details_page',
      component: details_page
    }
  ]
})
