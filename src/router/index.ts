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
  history: createWebHistory()
})

export default router
