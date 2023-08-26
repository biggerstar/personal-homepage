<template>
  <div class="navigation-card-container">
    <router-link
      v-for="(item,barName) in allBar"
      @click="routerLinkClick(barName)"
      class="navigation-item"
      :to="barName"
      :class="{'active-card':activeName === barName}"
      :key='barName'>
      <el-icon>
        <Component
          class="prevent-svg-hover-space-bug"
          :is='item.icon ? item.icon : HelpFilled'
        ></Component>
      </el-icon>
    </router-link>

  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import gsap from 'gsap'
import {choiceAnimation, execAnimation} from "@/utils/common";
import {HelpFilled} from '@element-plus/icons-vue'

const useConfig = inject('useConfig')
const activeName = ref(location.pathname.replace('/', ''))


const allBar = useConfig.page
let animationRunning = false
const mainContainerClass = '#el-main'
const mainCloneContainerClass = '.el-main-clone-box'

function routerLinkClick(barName) {
  if (animationRunning) return;  // 正在动画中或者已经在某个标签，阻止继续其创建动画
  if (activeName.value === barName) return;
  activeName.value = barName
  animationRunning = true
  //-----------------------------------------------------------------
  let animation
  animation = choiceAnimation()
  execAnimation(animation, mainContainerClass, mainCloneContainerClass).then(() => {
    animationRunning = false
  })
}

onMounted(() => {
  gsap.from('.navigation-item', {
    x: 100,
    duration: 0.5,
    ease: 'back.inOut',
    stagger: 0.13
  })
})

</script>

<style scoped lang="scss">
.active-card {
  --color: #4e62ee;
  color: var(--color);
  font-weight: bold;
}

.navigation-card-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  text-align: center;
  align-content: space-evenly;
  overflow: hidden;
  border-radius: 20px;
}

.navigation-item {
  --line-width: 3px;
  flex: 1;
  display: flex;
  color: white;
  width: 100%;
  height: 100%;
  font-size: 2.2rem;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  position: relative;

  .el-icon svg {
    font-size: 2.2rem;
  }

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    height: 0;
    width: var(--line-width);
    background: #4e62ee;
    transition: all .3s ease;
  }

  :hover {
    opacity: 0.5;
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.36);
    transform-origin: center;
    border-radius: 20px;

    :not(.active-card) {
      color: rgba(103, 116, 250, 0.71);
    }

    &::before {
      top: 25%;
      right: 5px;
      height: 50%;
    }
  }

  :active {
    transform: scale(1.05);
  }

  .el-icon {
    height: 100%;
    width: 100%;
  }
}

.prevent-svg-hover-space-bug {
  pointer-events: none;
}
</style>
