<template>
  <div class="main-outer-container">
    <el-scrollbar
      style="overflow-y: clip;"
      :noresize=true
    >
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.main-outer-container {
  min-height: 100%;
  height:100%;
  width: 100%;
  overflow: hidden;
  background-color: #f6f7fa;

  :deep(.el-scrollbar__view) {
    height: 100%;
    width: 100%;
  }
}
</style>
