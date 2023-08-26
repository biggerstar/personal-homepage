<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
</template>

<script setup>
import {inject} from "vue";

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.about
const stickInfo = pageConfig.stick
</script>

<style scoped>

</style>
