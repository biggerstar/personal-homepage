<template>
  <el-popconfirm
    width="320"
    hide-icon
    confirm-button-text="发送"
    cancel-button-text="我再想想"
    @confirm="clickConfirm"
    :title="`是否发送邮件给 ${email} `"
  >
    <template #reference>
      <el-link><span class="iconfont email">&#xe856;</span></el-link>
    </template>
  </el-popconfirm>

</template>

<script setup>

import {ElMessage} from "element-plus";

const props = defineProps({
  data: {
    type: String,
    required: true
  }
})

const email = props.data

function sendEmail() {
  if (!email) return ElMessage({
    type: "error",
    message: '未找到邮件地址'
  })
  let subject = "Hello, Biggerstar!";
  let body = "你的个人首页做的不错哦，奖励你一颗小星星 ⭐️";
  let mailtoLink
  mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  window.location = mailtoLink
}

function clickConfirm() {
  sendEmail()
}

</script>

<style scoped>
.email:hover {
  color: #e5d84d;
}
</style>
