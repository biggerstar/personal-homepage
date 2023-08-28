<template>
  <div class="card-box">
    <div v-for="item in items">
      <div class="item-card">
        <div class="item-icon">
          <img :src="item.icon" alt="">
        </div>
        <div class="item-title">{{ item.title }}</div>
        <p class="item-desc shadow-text-line" v-if="item.desc"> {{ item.desc }}</p>
        <div class="progress">
          <el-progress v-if="item.percentage" :percentage="item.percentage"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
/** 以卡片的形式展示技能内容 */

const props = defineProps({
  items: {
    type: Array,
  }
})

const items = props.items
</script>

<style scoped lang="scss">

$card-width: 250px;

.progress .el-progress--line {
  margin-bottom: 15px;
  width: 220px;
}

.card-box {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  min-width: $card-width; // 只有一列时
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.item-card {
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100px;
  width: $card-width;
  min-width: $card-width;
  border-radius: 15px;
  background-color: white;
  /*box-shadow: gray 1px 1px 1px;*/
  margin: 8px;
  transition: .3s;
  box-shadow: 0 0 1px rgba(143, 133, 133, 0.1),
  0 0 3px rgba(143, 133, 133, 0.1),
  0 0 7px rgba(143, 133, 133, 0.1),
  0 0 12px rgba(143, 133, 133, 0.1);
}

.item-card:hover {
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 0 20px rgba(143, 133, 133, 0.36);
}

.item-icon, .item-icon > img {
  height: 3rem;
  width: 3rem;
}

.item-title {
  text-align: start;
  padding-left: 20px;
  font-weight: bolder;
  font-size: 1.5rem;
  letter-spacing: 1px;
  width: 70%;
  font-family: "Songti SC", system-ui;
}

.item-desc {
  display: block;
  margin-top: 15px;
  padding-left: 0.8rem;
  font-size: 1.1rem;
  letter-spacing: 2px;
  border-left: #7dbeef solid 2px;
  vertical-align: middle;
  font-weight: 450;
  color: gray;
}

</style>
