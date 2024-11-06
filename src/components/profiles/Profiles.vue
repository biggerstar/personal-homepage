<template>
  <div class="aside-container">

    <div class="aside-avatar">
      <img
        :src="profilesInfo.avatarUrl"
        alt="biggerstar"
        style="width: 160px;height: 160px;border-radius: 50%; object-fit: cover;"
      />
    </div>

    <div class="aside-username"> {{ profilesInfo.username }}</div>

    <div class="aside-occupation"> {{ profilesInfo.occupation }}</div>


    <div class="aside-contact-me">
      <Email :data='profilesInfo.contactMe.email'/>
      <Github :data='profilesInfo.contactMe.github'/>
      <QQ :data='profilesInfo.contactMe.qq'/>
    </div>
    <div class="beian">
      <a style="color: white" href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2023018015号-1</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import QQ from '@/components/profiles/contact/QQ.vue'
import Github from '@/components/profiles/contact/Github.vue'
import Email from '@/components/profiles/contact/Email.vue'
import {onMounted} from "vue";
import gsap from "gsap";
import useConfig from "@/config.ts";

const profilesInfo = useConfig.profile

onMounted(() => {
  gsap.from('.aside-container div', {
    y: -20,
    duration: 0.5,
    stagger: 0.3,
    ease: 'back.out',
    opacity: 0
  })
})

</script>

<style scoped>
.beian {
  position: absolute;
  width: 100%;
  height: 20px;
  left: 0;
  bottom: 10px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.aside-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  position: relative;
}

.aside-avatar {
  width: 100%;
  height: auto;
  margin: 200px 0 50px 0;
  display: flex;
  justify-content: space-around;
}

.aside-username {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.aside-occupation {
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 4px;
}

.aside-contact-me {
  text-align: center;
}

.aside-contact-me :deep(span) {
  margin: 0 5px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.aside-username,
.aside-occupation,
.aside-descriptions > h3 {
  padding: 10px;
  text-align: center;
  color: white;
}

</style>
