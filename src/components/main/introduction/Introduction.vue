<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
  <div class="description background-img">

    <div class="person-desc ">
      <Title font-size="1.3rem" underline-bottom='#3498db'>
        {{pageConfig.personDescTitle}}
      </Title>
      <ul>
        <li v-for="line in pageConfig.desc"> {{ line }}</li>
      </ul>
    </div>

    <div class="person-base-info-box ">
      <Title font-size="1.3rem" underline-bottom='#3498db'>
        {{pageConfig.personInfoTitle}}
      </Title>
      <div class="description-item" v-for="item in pageConfig.personInfo">
        <span>{{ item.type }}</span>
        <span>:</span>
        <span>{{ item.desc }}</span>
      </div>
    </div>
    <div class="person-tags-info">
      <Title font-size="1.3rem" underline-bottom='#3498db' class="shadow-text-line">
        {{pageConfig.personTagsTitle}}
      </Title>
      <div style="display: flex;  flex-wrap: wrap">
        <el-tag
          v-for="tag in  tags"
          :type="choice(enumType)"
          :effect="choice(enumEffect)"
          size="large"
        >
          <div>{{ tag }}</div>
        </el-tag>
      </div>
    </div>

  </div>
</template>


<script setup>
import Title from "@/components/common/Title.vue";
import {inject, onMounted} from 'vue'
import {choice} from "@/utils/common";
import FixedStick from "@/components/common/FixedStick.vue";
import gasp from 'gsap'

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.introduction
const stickInfo = pageConfig.stick
const tags = pageConfig.tags.sort(() => choice([-1, 0, 1]))

const enumEffect = ['light', 'plain']
const enumType = ['success', 'info', 'warning', 'danger', '']

onMounted(() => {
  gasp.timeline()
    .from('.person-desc', {
      y: -50,
    })
    .from('.person-base-info-box', {
      x: -50,
    }, '<')
    .from('.person-tags-info', {
      x: 50,
    }, '<')
})

</script>

<style scoped lang="scss">

.description {
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10% 10%;
  width: 80%;
  height: 80%;
}

.person-desc {
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 2px;

  li {
    margin-top: 12px;
  }
}

.person-base-info-box {
  min-width: 40%;
  overflow: hidden;
}

.person-tags-info {
  width: 40%;
  flex: 1;
  max-width: 360px;

  .el-tag {
    margin: 8px;
    font-size: 1.1rem;
    padding: 0.8rem;
    border-radius: 6px;
    font-weight: 500;
  }
}

.description-item {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.3rem;
  font-weight: bolder;
  padding: 8px 2px;
  letter-spacing: 2px;
  min-width: 320px;

  span {
    padding: 0 5px;
  }

  span:nth-child(1) {
    text-align-last: justify;
    display: inline-block;
    width: 4rem;
    color: #47abfa;
  }

  span:nth-child(2) {
    vertical-align: middle;
  }

  span:nth-child(3) {
    min-width: 200px;
    margin-left: 2rem;
  }
}
</style>
