<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
</template>

<script setup>
import {inject, onMounted} from "vue";
import FixedStick from "@/components/common/FixedStick.vue";

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.experience
const stickInfo = pageConfig.stick

onMounted(()=>{
  document.body.style.setProperty('--el-main-height','90%')
})

</script>

<style scoped>
</style>
