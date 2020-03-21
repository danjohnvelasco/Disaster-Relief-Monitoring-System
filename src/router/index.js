import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/disaster-event',
    name: 'Disaster Event',
    component: () => import('../components/ReadEvent.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/schools',
    name: 'List of Schools',
    component: () => import('../components/Schools.vue')
  },
  {
    path: '/school-details',
    name: 'School Details',
    component: () => import('../components/SchoolDetails.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
