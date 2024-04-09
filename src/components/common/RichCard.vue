<template>
  <div class="project__item box-shadow">
    <div class="item-img-box">
      <div class="item-img" :style='{ "background-image":`url(${item.image})`   }'></div>
      <span class="item-img-overlay">
        <el-icon>
          <Component :is="icon"></Component>
        </el-icon>
      </span>
    </div>

    <div class="item-desc-box">
      <span class="item-type-text"> {{ item.type }} </span>
      <div class="item-project-desc-box">
        <p class="item-project-title"> {{ item.title }} </p>
        <span class="item-project-desc-text shadow-text-line">{{ item.desc }}  </span>
      </div>
    </div>
  </div>
</template>

<script setup>
/** 显示图文卡片 */
const props = defineProps({
  /** type，title，desc，image */
  item: {
    type: Object,
    required: true
  },
  /** 图标组件 */
  icon: {
    type: Object,
    required: true
  }
})
const {item, icon} = props
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.project__item {
  display: inline-block;
  width: 100%;
  height: auto;
  background-color: #FFF;
  border-radius: 20px;
  overflow: hidden;
  font-weight: bolder;
  transition: all .6s;
  flex: 1;

  .item-img-box:hover .item-img {
    transform: scaleX(1.05) scaleY(1.05) perspective(0);
    filter: brightness(0.7);
  }

  .item-img-box {
    $height: 220px;
    $width: 100%;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    .item-img {
      position: relative;
      height: $height;
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transition: all .6s;
      filter: brightness(0.98);
    }

    .item-img-overlay {
      display: none;
      position: absolute;
      height: $height;
      width: 100%;
      left: 0;
      top: 0;
      line-height: $height;
      text-align: center;
      font-size: 4rem;
      font-weight: 900;
      color: white;
    }

    &:hover .item-img-overlay {
      display: block;
    }
  }

  .item-desc-box {
    position: relative;
    width: 100%;
    height: auto;
    padding: 0 25px;

    .item-type-text {
      $item-height: 2.2rem;
      position: absolute;
      height: $item-height;
      min-width: 100px;
      max-width: 75%;
      top: -$item-height;
      left: 0;
      border-radius: 0 10px 0 0;
      line-height: $item-height;
      filter: none;
      letter-spacing: 1px;
      text-align: center;
      background: white;
      border-top: solid 1px 1px 5px;
      padding: 0 10px;
    }

    .item-project-desc-box {
      word-break: break-word;
      display: block;
      height: auto;
      width: 100%;
      z-index: 5;
      padding: 1rem 0;

      .item-project-title {
        font-size: 1.8rem;
      }

      .item-project-desc-text {
        display: block;
        min-height: 60px;
        margin-top: 10px;
        font-size: 1rem;
        padding-left: 12px;
        border-left: #47abfa solid 3px;
      }
    }
  }

  //img {
  //  // object-fit 兼容性不好，改用background
  //  height: 250px;
  //  width: 100%;
  //  object-fit: cover;
  //}
}
</style>
