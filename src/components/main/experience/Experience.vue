<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
</template>

<script setup>
import {inject} from "vue";
import FixedStick from "@/components/common/FixedStick.vue";

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.experience
const stickInfo = pageConfig.stick
</script>

<style scoped>
</style>
