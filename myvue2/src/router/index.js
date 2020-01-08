import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main.vue'
import details_page from '@/components/details_page.vue'
import register from '@/components/register.vue'
import register_post from '@/components/register_post.vue'
import cart from '@/components/cart.vue'
import orderinfo from '@/components/orderinfo.vue'
import orderinfo_topay from '@/components/orderinfo_topay.vue'
import supplier_register from '@/components/supplier_register.vue'
import supplier_register_post from '@/components/supplier_register_post.vue'
import supplier_putgoods from '@/components/supplier_putgoods.vue'
import merchant_delivery_note from '@/components/merchant_delivery_note.vue'
import collect from '@/components/collect.vue'


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
      path: '/supplier_register',
      name: 'supplier_register',
      component: supplier_register
    },
    {
      path: '/supplier_register_post',
      name: 'supplier_register_post',
      component: supplier_register_post
    },
    {
      path: '/supplier_putgoods',
      name: 'supplier_putgoods',
      component: supplier_putgoods
    },
    {
      path: '/merchant_delivery_note',
      name: 'merchant_delivery_note',
      component: merchant_delivery_note
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect
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
