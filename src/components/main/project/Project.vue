<template>
  <FixedStick v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
  <div class="project-box background-img">
    <div>
      <el-dialog
        v-model="dialogTableVisible"
        :modal="false"
        :show-close="false"
        destroy-on-close
        append-to-body
        ref="dialogRef"
      >
        <el-scrollbar style="height: 70vh; ">
          <ProjectDetail :detail="curShowDetail"/>
        </el-scrollbar>
      </el-dialog>
    </div>
    <div class="project-presentation">
      <Title underlineBottom font-size="1.5rem">
        {{pageConfig.projectItemsTitle}}
      </Title>
      <div class="project-container">
        <a class="project-item" @click='itemClick(item)' v-for="(item,index) in projectItems" :key="index">
          <RichCard :icon="Promotion" :item="item"></RichCard>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import gsap from "gsap";
import FixedStick from "@/components/common/FixedStick.vue";
import Title from "@/components/common/Title.vue";
import RichCard from "@/components/common/RichCard.vue";
import {Promotion} from "@element-plus/icons-vue";
import ProjectDetail from "@/components/main/project/ProjectDetail.vue";

const useConfig = inject('useConfig') as Record<any, any>
const pageConfig: Record<any, any> = useConfig.page?.project || {}
const stickInfo = pageConfig.stick
const {projectItems} = pageConfig
const dialogTableVisible = ref(pageConfig.editingMode)
const dialogRef = ref()
let curShowDetail = ref(projectItems[pageConfig.editingIndex].detail)

function itemClick(item: Record<any, any>) {
  curShowDetail.value = item.detail
  dialogTableVisible.value = !dialogTableVisible.value
}

onMounted(() => {
  gsap.from('.project-item', {
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.08
  })
})

</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.project-box {
  width: 100%;
  height: auto;
  padding: 13% 6% 0 10%;
  margin: auto;
}

.project-presentation {
  width: 100%;
  min-height: 300px;
}

.project-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 100px;

  .project-item {
    margin-top: 3rem;
    min-width: 320px;
    color: #2d2d2d;
    flex-basis: 46%;
  }
}


</style>
