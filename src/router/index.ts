import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
    component: () => import('@/components/main/introduction/Introduction.vue')
  },
  {
    path: '/skill',
    component: () => import('@/components/main/skill/Skill.vue')
  },
  {
    path: '/project',
    component: () => import('@/components/main/project/Project.vue')
  },
  {
    path: '/experience',
    component: () => import('@/components/main/experience/Experience.vue')
  },
  {
    path: '/contact-me',
    component: () => import('@/components/main/contact-me/ContactMe.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

NProgress.configure({
  showSpinner: true,
  easing: 'ease',
  parent: '#el-main',
  speed: 500
})

router.beforeEach((to, from, next: Function) => {  // 支持过程加载动画
  NProgress.start()
  NProgress.set(0.20)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
