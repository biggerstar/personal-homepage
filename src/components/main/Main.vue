<template>
  <div class="main-outer-container">
    <el-scrollbar
      ref="scrollBarRef"
      style="overflow-y: clip;"
      :noresize=true
    >
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {ElScrollbar} from 'element-plus'
import {useRouter} from 'vue-router'
const scrollBarRef = ref<InstanceType<typeof ElScrollbar>>()

const router  = useRouter()
router.afterEach(()=>{   // 每次切换路由都滚动到路由卡片最顶部
  scrollBarRef.value?.setScrollTop(0)
})

onMounted(() => {
})

</script>

<style scoped lang="scss">
.main-outer-container {
  min-height: 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f6f7fa;

  :deep(.el-scrollbar__view) {
    height: 100%;
    width: 100%;
  }
}
</style>
