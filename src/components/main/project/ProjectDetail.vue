<template>
  <div class="detail-box">
    <div class="headerName">
      {{ detail.title }}
    </div>
    <div class="base-info">
      <p class="item-info-c" v-for="(item) in baseInfo">
        <span :class="item.icon"> </span>
        <span>{{ item.alias }}</span>
        <span>:</span>
        <span v-if="item.link">
          <el-link :href="item.link" target="_blank" type="primary">
            {{ item.value }}
          </el-link>
        </span>
        <span v-else>{{ item.value }}</span>
      </p>
    </div>
    <div class="item-desc-content" ref="refContent">
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {Marked} from "marked";
import prismjs from 'prismjs'
import 'prismjs/themes/prism.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/autoloader/prism-autoloader.min.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min'
import 'prismjs/plugins/line-highlight/prism-line-highlight.min.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.min.js'
import 'prismjs/plugins/command-line/prism-command-line.min'
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.min.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.min'
import 'prismjs/plugins/show-language/prism-show-language.min.js'
import 'prismjs/plugins/match-braces/prism-match-braces.min.css'
import 'prismjs/plugins/match-braces/prism-match-braces.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'


const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})
const {detail} = props
const {baseInfo, md: mdURL} = detail
const refContent = ref()

const requestMD = fetch(mdURL)
onMounted(async () => {
  let mdContent = await (await requestMD).text()
  if (!refContent.value) throw new Error('[ProjectDetail]未找到md文档挂载节点')
  if (!mdURL) mdContent = '! 未找到当前文章的 markdown 文档'

  const marked = new Marked()
  marked.setOptions({
    gfm: true,
  })
  refContent.value.innerHTML = marked.parse(mdContent)
  prismjs.highlightAll()

})

</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.detail-box {
  width: 100%;
  height: auto;
}

.headerName {
  font-size: 2.4rem;
  font-weight: bolder;
  text-align: center;
}

.base-info {
  display: flex;
  width: 80%;
  justify-content: center;
  font-size: 1.2rem;
  margin: 30px auto;
  flex-wrap: wrap;
}

.item-info-c {
  display: flex;
  min-width: 300px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: iconfont, system-ui;

  span, a {
    font-size: inherit;
    letter-spacing: 3px;
    text-align-last: justify;
    margin: 8px;
    font-weight: 500;
  }
}

.item-desc-content {
  width: 100%;
  //background: #f1f1f1;
  text-align: left;
  font-weight: 400;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 20px;
}


</style>
