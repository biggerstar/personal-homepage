<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
  <div class="project-box">0</div>
</template>

<script setup>
import {inject} from "vue";
import FixedStick from "@/components/common/FixedStick.vue";

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.project
const stickInfo = pageConfig.stick


</script>

<style scoped>
.project-box {
}
</style>
