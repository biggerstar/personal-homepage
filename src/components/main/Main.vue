<template>
  <el-scrollbar
    class="main-outer-container"
    :noresize=true
  >
    <router-view></router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.main-outer-container {
  height: 100%;
  width: 100%;
  border-radius: 45px;
  overflow: hidden;
  background-color: #f6f7fa;

  :deep(.el-scrollbar__view) {
    height: 100%;
    width: 100%;
  }
}
</style>
