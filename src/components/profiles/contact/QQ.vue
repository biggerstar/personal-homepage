<template>
  <el-tooltip
    :content="qqAccount"
    placement="top"
    effect="light"
    :hide-after=20
  >
    <el-link>
      <span
        class="iconfont qq"
        :data-clipboard-text="qqAccount"
        @click = 'clickBtnForQQ'
      >&#xe882;
      </span>
    </el-link>
  </el-tooltip>
</template>

<script setup>
import ClipboardJS from 'clipboard';
import {onMounted} from 'vue'
import {ElMessage} from "element-plus";

const props = defineProps({
  data: {
    type: String,
    required: true
  }
})
const qqAccount = props.data
function clickBtnForQQ() {
  ElMessage({
    message: `复制qq ${qqAccount} 成功啦，快来找我玩吧 ⭐️`,
    type: 'success',
  })
}

onMounted(() => {
  const clipboard = new ClipboardJS('.qq');
  clipboard.on('success', (e) => {
    console.log('复制qq成功');
    e.clearSelection();
  });

  clipboard.on('error', () => {
    console.log('复制qq失败');
  });
})


</script>

<style scoped>
.qq:hover {
  color: #0ca1da;
}
</style>
