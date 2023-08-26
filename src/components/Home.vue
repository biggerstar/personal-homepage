<template>
  <div class="home-layout">
    <el-container class="el-main-container">
      <el-aside width="20%" style="min-width: 180px">
        <Profiles/>
      </el-aside>
      <div class="background-name">{{ username }}</div>
      <div class="el-main" id="el-main">
        <Main></Main>
      </div>
    </el-container>

    <div class="navigation-card">
      <NavigationCard/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Profiles from "@/components/profiles/Profiles.vue";
import Main from "@/components/main/Main.vue";
import NavigationCard from "@/components/navigation-card/NavigationCard.vue";
import gsap from 'gsap'
import {inject, onMounted} from "vue";

const useConfig = inject('useConfig')
const username = useConfig.profile.username

onMounted(() => {
  gsap.from('#el-main', {
    y: -50,
    duration: 0.6,
    ease: 'back.out'
  })
})
</script>

<style scoped>
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

.navigation-card {
  --height: 50%;
  width: 6%;
  text-align: center;
  height: var(--height);
  position: fixed;
  right: 0;
  top: calc(50% - var(--height) / 2);
}

.el-main-container {
  height: 100vh;
  position: relative;
}

#el-main {
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 375px;
  z-index: 10;
}

.el-main {
  margin: 3% 8% 3% 0;
}
</style>
