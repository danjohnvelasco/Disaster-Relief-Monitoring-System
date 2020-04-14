import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },  
  {
    path: '/schools',
    name: 'List of Schools',
    component: () => import('../views/Schools.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
