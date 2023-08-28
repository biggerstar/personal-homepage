<template>
  <div class="fix-tag">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#FFF'
  },
  opacity: {
    type: Number,
    default: 0.7
  },
})
const {color: bgColor, opacity: opacityNum} = props


</script>

<style scoped lang="scss">
@use "sass:math";
// TODO 后面再设计成通用组件，当前可以外部在组件上使用class重定义样式

.fix-tag {
  $w: 300px;
  $h: 50px;
  $offset: 12px; // 偏移左顶角

  width: $w;
  top: 0 + $offset;
  letter-spacing: 0.6rem;
  left: -$w *  math.cos(45) + $h + $offset;
  text-align: center;
  position: absolute;
  display: inline-block;
  font-size: 2rem;
  font-weight: bolder;
  transform: rotate(-45deg);
  text-align-last: center;
  padding: 3px 0;
  opacity: v-bind(opacityNum);
  background: v-bind(bgColor);
  color: rgba(72, 70, 70);
  z-index: 100;
}

</style>
