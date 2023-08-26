<template>
  <el-link :href="githubUrl"  target="_blank">
    <span class="iconfont github">&#xe718;</span>
  </el-link>
</template>

<script setup>
const props = defineProps({
  data: {
    type: String,
    required: true
  }
})
const githubUrl = props.data
</script>

<style scoped>
.github:hover {
  color: black;
}

</style>
