<script setup lang="ts">
import {inject, onMounted, onUnmounted, ref} from "vue";
import {use} from "echarts/core";
import throttle from 'lodash/throttle'
import FixedStick from "@/components/common/FixedStick.vue";
import VChart from "vue-echarts";
import {CanvasRenderer} from "echarts/renderers";
import {BarChart} from "echarts/charts";
import {DatasetComponent, GridComponent, LegendComponent, TitleComponent, VisualMapComponent} from "echarts/components";
import Title from "@/components/common/Title.vue";
import ShowCartList from "@/components/common/ShowCartList.vue";
//------------------------------------------------
const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.skill
const stickInfo = pageConfig.stick
const ComponentMapping = pageConfig.componentMapping
const SkillLearning = pageConfig.skillLearning
//-------------------前端技能分布----------------------------
use([
  CanvasRenderer,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  BarChart,
]);
const vEchartsRef = ref()

const skillBarChart = pageConfig.skillBarChart

const option = {
  title: skillBarChart.title,
  grid: {containLabel: true},
  yAxis: {
    type: 'category',
    data: skillBarChart.y.data.map(item => item.skill),
    inverse: true,
    axisLabel: {
      fontWeight: 'bolder',
      fontSize: '1rem',
      margin: 20,
      fontFamily: 'iconfont',
      align: 'right',
      formatter: function (value) {
        return `${value}`
      },
    },
  },
  xAxis: {
    type: 'value',
    max: 100,
    min: 0,
    axisLabel: {
      interval: 0, // 强制显示所有标签
      fontSize: '1rem',
      fontWeight: 'bolder',
      formatter: function (value, index) {
        return skillBarChart.x.category[index]
      },
    },
    // inverse: true,
    minorSplitLine: {
      show: true
    },
    axisPointer: {
      show: true
    },
    axisTick: {
      alignWithLabel: true, // 刻度与标签对齐
    },
  },
  visualMap: Object.assign({
    orient: 'horizontal',
    left: 'center',
    min: 10,
    max: 100,
    textStyle: {
      fontWeight: 'bolder'
    },
    dimension: 0,  // 使用哪个维度的数据
  }, (skillBarChart.visualMap || {})),
  series: [
    {
      type: 'bar',
      animationDelay: 500,
      realtimeSort: true,
      labelLine: {
        show: true
      },
      label: {
        show: true,
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#FFF'
      },
      // emphasis: {  // echarts 有bug
      //   focus: 'self',
      // },
      data: skillBarChart.y.data.map(item => item.value),
    }
  ]
};

const resizeThrottle: Function = throttle(() => {
  vEchartsRef.value.resize?.()
}, 100)

window.addEventListener('resize', resizeThrottle)

onUnmounted(() => {
  window.removeEventListener("resize", resizeThrottle)
})

//-------------------其他技能----------------------------

const otherActiveName = ref(pageConfig.otherSkillActiveTagName || Object.keys(ComponentMapping)[0])


//-------------------其他技能----------------------------

const learnActiveName = ref(pageConfig.skillLearningActiveTagName || Object.keys(SkillLearning)[0])

</script>

<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
  <div class="skill-box">
    <div class="frontend-skill-charts">
      <VChart class="v-echarts" :option="option" ref="vEchartsRef"/>
    </div>

    <div class="other-skill-card">
      <Title underlineBottom font-size="1.2rem">
        {{pageConfig.otherSkillCardTitle}}
      </Title>
      <el-tabs v-model="otherActiveName" class="other-skill-tabs" tab-position='left' stretch>
        <el-tab-pane class="el-tab-pane" :label="item.label" :name="name" v-for="(item,name) in ComponentMapping">
          <!--          <Component :is="item.component ? item.component : void 0" :items="item.items"/>-->
          <ShowCartList :items="item.items"/>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="skill-learning" v-if="SkillLearning">
      <Title underlineBottom font-size="1.2rem">
        {{pageConfig.skillLearningTitle}}
      </Title>
      <el-tabs v-model="learnActiveName" class="other-skill-tabs" tab-position='left' stretch>
        <el-tab-pane class="el-tab-pane" :label="item.label" :name="name"
                     v-for="(item,name) in SkillLearning">
          <ShowCartList :items="item.items"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<style scoped lang="scss">

.skill-box {
  width: 96%;
  height: auto;
  padding: 10% 2%;
  margin: auto;
  :deep(.el-tabs__item){
    padding: 6px;
  }
}

@media screen and (min-width: 769px) {
  .skill-box {
    width: 88%;
    padding: 10% 4%;
    :deep(.el-tabs__item){
      padding: 20px;
    }
  }
}

.frontend-skill-charts {
  margin: auto;
  height: 50%;
  width: 100%;
}

.v-echarts, .v-echarts:deep(div) {
  min-height: 360px;
  max-height: 600px;
  height: 100%;
  width: 100%;
}

.other-skill-card {
  min-height: 200px;
  height: auto;
  margin-top: 5rem;
}

.other-skill-tabs {
  margin-top: 20px;
}

.el-tab-pane {
  margin-left: 1.2rem;
  min-width: 320px;
}

.skill-box:deep(.el-tabs__item) {
  margin: 3rem 0;
  font-weight: bolder;
  justify-content: center;
  transition: .3s;
  &:hover {
    transform: scale(1.13);
  }
}


</style>
