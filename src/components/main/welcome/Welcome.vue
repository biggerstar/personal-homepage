<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
  <div class="welcome-box background-img">
    <p class="welcome">
      <span>{{ pageConfig.title }}</span>
    </p>

    <p class="welcome-desc">
      <span>{{ pageConfig.desc }}</span>
    </p>
  </div>
  <div class="waves"></div>
</template>

<script setup>
import gsap from "gsap";
import {inject, onMounted} from "vue";
import FixedStick from "@/components/common/FixedStick.vue";

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.welcome || {}
const stickInfo = pageConfig.stick

onMounted(() => {
  gsap.timeline()
    .from('.welcome', {
      opacity: 0,
      x: '-10%',
      duration: 1,
      delay: 0.2,
    })
    .from('.welcome-desc', {
      opacity: 0,
      x: '10%',
      duration: 1,
    }, '>-0.5')

  document.getElementById('el-main').style.height = '100%'
})

</script>

<style scoped lang="scss">
p {
  margin: 0;
  padding: 0;
}

.welcome-box {
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.welcome {
  letter-spacing: 15px;
  font-size: 4rem;
  text-align: center;
  font-weight: 500;
}

.welcome-desc {
  width: 100%;
  margin-top: 12px;
  letter-spacing: 9px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;

  span {
    padding: 10px 0;
    border-bottom: #47abfa solid 3px;
  }
}

.waves {
  height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
