<template>
  <p class="detail" :class="{
        underlineBottom: underlineBottom,
        underlineTop: underlineTop,
      }">
      <span class="detail-title">
      <slot class="title-text"> </slot>
      </span>
  </p>
</template>

<script setup lang="ts">
const props = defineProps({
  /** 字体大小 */
  fontSize: {
    type: String,
    default: '1rem'
  },
  /** 是否包含下划线 */
  underlineBottom: {
    type: [String, Boolean],
    default: false
  },
  /** 是否包含上划线 */
  underlineTop: {
    type: [String, Boolean],
    default: false
  },
  /** 线段粗细 */
  lineSize: {
    type: String,
    default: '3px'
  },
  rotate: {
    type: String,
    default: '0deg'
  },
  letterSpace: {
    type: String,
    default: '2px'
  }
})

let {underlineBottom, underlineTop, lineSize, rotate: rotateDeg, letterSpace} = props

const defaultColor = '#3498db'
const specialMatch: any[] = [true, '']
if (specialMatch.includes(underlineBottom)) underlineBottom = defaultColor
if (specialMatch.includes(underlineTop)) underlineTop = defaultColor


</script>

<style scoped>
.detail {
  display: inline-block;
  transform: rotate(v-bind(rotateDeg));
  text-align: center;
  letter-spacing: v-bind(letterSpace);
  vertical-align: center;
}

.detail-title {
  color: black;
  font-weight: bolder;
  font-size: v-bind(props ['fontSize']);
  padding: 10px 0;
}

.underlineBottom {
  border-bottom: v-bind(underlineBottom) solid v-bind(lineSize);
}

.underlineTop {
  border-top: v-bind(underlineTop) solid v-bind(lineSize);
}

</style>
