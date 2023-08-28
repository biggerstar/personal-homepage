<template>
  <div class="main-outer-container">
    <el-scrollbar
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
