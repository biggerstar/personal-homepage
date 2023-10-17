<template>
  <div class="home-layout">
    <div>
      <div class="profiles-fixed-btn" v-if="!showAside" @click="showDrawer = !showDrawer">
        <el-icon>
          <CaretRight/>
        </el-icon>
      </div>
      <el-drawer
        v-model="showDrawer"
        :show-close="false"
        size="60%"
        direction="ltr"
        style="backdrop-filter: blur(3px);background: rgba(56,207,241,0.2);"
      >
        <Profiles/>
      </el-drawer>
    </div>
    <el-container class="el-main-container">
      <el-aside v-if="showAside" class="el-aside" width="20%" style="min-width: 180px">
        <Profiles/>
      </el-aside>
      <div class="background-name">{{ username }}</div>

      <div class="el-main" id="el-main">
        <Main></Main>
      </div>
    </el-container>

    <div class="navigation-card">
      <NavigationCard @change-router="updateLayout"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Profiles from "@/components/profiles/Profiles.vue";
import Main from "@/components/main/Main.vue";
import NavigationCard from "@/components/navigation-card/NavigationCard.vue";
import gsap from 'gsap'
import {inject, onMounted, onUnmounted, ref} from "vue";
import {CaretRight} from '@element-plus/icons-vue'
import {choiceAnimation, execAnimation} from "@/utils/common";

const showDrawer = ref(false)
const showAside = ref(false)
const useConfig = inject('useConfig')
const username = useConfig.profile.username
let resizeOb = new ResizeObserver(() => {
  showAside.value = window.innerWidth >= 769
})

let animation
let animationRunning = false
const mainContainerClass = '#el-main'
const mainCloneContainerClass = '.el-main-clone-box'

const updateLayout = (pathName?) => {
  const elMain = document.getElementById('el-main')
  const btn = document.querySelector<HTMLElement>('.profiles-fixed-btn')
  if (!pathName) pathName = location.pathname.split('/').filter(Boolean)[0]
  // console.log(pathName)
  elMain.scrollTo(0, 0)
  if (pathName === 'welcome') {
    elMain.style.height = '100%'
    if (btn) {
      btn.style.backgroundColor = 'transparent'
      btn.style.color = 'transparent'
    }
  } else {
    elMain.style.height = 'calc(100% - 60px)'
    if (btn) {
      btn.style.backgroundColor = '#56D0C4'
      btn.style.color = '#000'
    }
  }

  /*-----------------------------执行动画逻辑--------------------------------*/
  if (animationRunning) return;  // 正在动画中或者已经在某个标签，阻止继续其创建动画
  animationRunning = true
  animation = choiceAnimation()
  execAnimation(animation, mainContainerClass, mainCloneContainerClass).then(() => {
    animationRunning = false
  })
}


onMounted(() => {
  gsap.from('#el-main', {
    y: -50,
    duration: 0.6,
    ease: 'back.out'
  })
  resizeOb.observe(window.document.body)
  updateLayout()
})

onUnmounted(() => {
  resizeOb.disconnect()
})

</script>

<style scoped>
.navigation-card {
  position: fixed;
  text-align: center;
  height: var(--navigation-card);
  width: 100%;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: hidden;
}

.el-aside {
  position: fixed;
}

#el-main {
  width: 100%;
  height: var(--el-main-height);
  position: relative;
  min-width: 375px;
  z-index: 10;
}

/* 大屏*/
@media screen and (min-width: 769px) {
  .el-aside {
    position: unset;
  }

  #el-main {
    margin: 3% 8% 3% 0;
    width: 100%;
    height: 100% !important;
    position: relative;
    min-width: 375px;
    border-radius: 45px;
    z-index: 10;
  }

  .navigation-card {
    --height: 50%;
    width: 5%;
    height: var(--height);
    right: 0;
    top: calc(50% - var(--height) / 2);
    z-index: 1000;
  }
}

.home-layout {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(60deg, #57d3c0, #47abfa, #acd4ff);
  overflow: hidden;
}

.background-name {
  position: absolute;
  z-index: 0;
  color: white;
  filter: blur(2px) drop-shadow(16px 16px 20px white) opacity(0.6);
  left: calc(50% - 100px);
  top: calc(50% - 80px);
  display: block;
  font-size: 4rem;
  text-align: center;
  vertical-align: center;
  transform: rotate(-30deg);
}


.el-main-container {
  height: 100vh;
  position: relative;
}

.profiles-fixed-btn {
  position: fixed;
  width: 32px;
  height: 50px;
  line-height: 50px;
  bottom: 70px;
  color: transparent;
  left: 0;
  z-index: 100;
  font-size: 2rem;
  text-align: center;
  border-radius: 0 10px 10px 0;
}

</style>
