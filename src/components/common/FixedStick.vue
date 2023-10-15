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
    type: [Number, String],
    default: 0.7
  },
  fontSize: {
    type: String,
    default: '2rem'
  }
})
const {color: bgColor, opacity: opacityNum, fontSize} = props


</script>

<style scoped lang="scss">
@use "sass:math";
// TODO 后面再设计成通用组件，当前可以外部在组件上使用class重定义样式

.fix-tag {
  $w: 200px;
  $h: 50px;
  $offset: 42px ; // 偏移左上顶角
  width: $w;
  height: $h;
  top: $offset - $h / 2;
  left: $offset - $w / 2;
  text-align: center;
  position: absolute;
  display: inline-block;
  font-size: v-bind(fontSize);
  font-weight: bolder;
  transform-origin: center center;
  transform: rotate(-45deg);
  text-align-last: center;
  padding: 3px;
  opacity: v-bind(opacityNum);
  background: v-bind(bgColor);
  color: rgba(72, 70, 70);
  z-index: 100;
}

</style>
