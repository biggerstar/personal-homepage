<template>
  <div class="navigation-card-container">
    <router-link
      v-for="(item,barName) in allBar"
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

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import gsap from 'gsap'
import {HelpFilled} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";

const useConfig = inject('useConfig')
const activeName = ref(location.pathname.replace('/', ''))

const props = defineProps({
  breakPx: {
    type: String,
    default: '769px'
  },
})
const breakPx = props.breakPx
const allBar = useConfig.page
const router = useRouter()

function toRouterName(path) {
  return path.split('/').filter(Boolean)[0]
}

const emits = defineEmits({
  changeRouter: String
})

router.afterEach((to) => {
  const toName = toRouterName(to.path)
  emits('changeRouter', toName)
  if (activeName.value === toName) return
  activeName.value = toName// 改变高亮按钮
})

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
$breakPx: v-bind(breakPx);

.active-card {
  --color: #4e62ee;
  color: var(--color);
  font-weight: bold;
}


.navigation-card-container {
  display: flex;
  height: 100%;
  width: 100%;
  text-align: center;
  align-items: center;
  align-content: space-evenly;
  overflow: hidden;
  border-radius: 20px;
}

// 断点位置，大于某个值切换成竖向排列，可以设置一个不可能到达的值保持横向排列
@media screen and (min-width: 770px) {
  .navigation-card-container {
    flex-direction: column;
  }
}

.navigation-item {
  --line-width: 3px;
  color: white;
  width: 100%;
  height: 100%;
  font-size: 2.2rem;
  justify-content: center;
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
