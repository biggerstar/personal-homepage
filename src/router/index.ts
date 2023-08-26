import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: () => import('@/components/main/welcome/Welcome.vue')
  },
  {
    path: '/introduction',
    component: () => import('@/components/main/welcome/Welcome.vue')
  },
  {
    path: '/skill',
    component: () => import('@/components/main/welcome/Welcome.vue')
  },
  {
    path: '/project',
    component: () => import('@/components/main/welcome/Welcome.vue')
  },
  {
    path: '/experience',
    component: () => import('@/components/main/welcome/Welcome.vue')
  },
  {
    path: '/about',
    component: () => import('@/components/main/welcome/Welcome.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
