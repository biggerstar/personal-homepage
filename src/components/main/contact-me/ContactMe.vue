<template>
  <FixedStick font-size="1.8rem" v-if="stickInfo" :color="stickInfo.color">
    {{ stickInfo.desc }}
  </FixedStick>
  <div id="map-container" v-if="aMapConfig"></div>
  <div class="contact-me-box ">
    <div class="contact-me-desc background-img">
      <div class="title">{{ contactMeDesc.title }}</div>
      <div class="desc">{{ contactMeDesc.desc }}</div>
    </div>
    <div class="contact-me-send-mail">
      <!--      <Title font-size="1.3rem" underline-bottom='#3498db'>-->
      <!--        {{pageConfig.contactMeFormTitle}}-->
      <!--      </Title>-->
      <div>
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          :model="formData"
          class="contact-me-send-mail-form"
        >
          <el-form-item prop="mailUserName" class="mail-username">
            <el-input
              v-model="formData.mailUserName"
              :placeholder="username.placeholder"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="mailSubject" class="mail-subject">
            <el-input
              v-model="formData.mailSubject"

              :placeholder="subject.placeholder"
              :prefix-icon="Postcard"
            />
          </el-form-item>
          <el-form-item prop="mailContent" class="mail-content">
            <el-input
              v-model="formData.mailContent"
              maxlength="500"
              :placeholder="content.placeholder"
              show-word-limit
              rows="8"
              type="textarea"

              :validate-event="true"
            />
          </el-form-item>
          <div class="submit-form-btn-box">
            <el-button class="submit-form-btn" type="primary" plain @click="submitForm">
              <el-icon>
                <Promotion/>
              </el-icon>
              <span>
              {{ contactMeFormBtn }}
            </span>
            </el-button>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, onUnmounted, reactive, ref} from 'vue'
import FixedStick from "@/components/common/FixedStick.vue";
import {Postcard, Promotion, User} from '@element-plus/icons-vue'
import {ElMessage, FormInstance} from "element-plus";
import "@amap/amap-jsapi-types";

const useConfig = inject('useConfig')
const pageConfig = useConfig.page?.['contact-me']
const stickInfo = pageConfig.stick
const {contactMeForm, contactMeFormBtn, aMap: aMapConfig, contactMeDesc, administratorEmail} = pageConfig
const {username, subject, content} = contactMeForm
const ruleFormRef = ref<FormInstance>()
const formData = reactive({
  mailUserName: '',
  mailSubject: '',
  mailContent: ''
})

const isSpaceContent = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error())
  }
}

const rules = reactive({
  mailUserName: [
    {
      required: true,
      message: '请输入您的名字',
      validator: isSpaceContent,
      trigger: 'blur'
    },
  ],
  mailSubject: [
    {
      required: true,
      message: '请输入您的标题',
      validator: isSpaceContent,
      trigger: 'blur',
    },
  ],
  mailContent: [
    {
      required: true,
      message: '请输入您要发送的内容',
      validator: isSpaceContent,
      trigger: 'blur',
    },
  ],
})

const submitForm = () => {
  const formEl = ruleFormRef.value
  if (!formEl) return
  // formEl.validate((valid) => {
  //   console.log(valid)
  //   return
  // })
  const isSuccess = Object.values(formData).every(Boolean)
  if (isSuccess) sendEmail()
}

function sendEmail() {
  console.log('发送邮件，内容为', formData)
  if (!administratorEmail) return ElMessage({
    type: "error",
    message: '未找到邮件地址'
  })
  let subject = formData.mailSubject;
  let body = formData.mailContent;
  let mailtoLink
  mailtoLink = "mailto:" + administratorEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  window.location = mailtoLink
}

onMounted(() => {
  if (aMapConfig) {
    hookCreateCanvas()
    createMapLoader()
  }
})
/** amap创建地图发出警告，使用函数拦截开启willReadFrequently可以获得更好性能 */
const hookCreateCanvas = () => {
  const rowGetContext = HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = function (type: any, options: any): any {
    if (type === '2d' && options !== null && typeof options === 'object') {
      if (!options.hasOwnProperty('willReadFrequently')) options.willReadFrequently = true
    }
    return rowGetContext.call(this, type, options)
  }
}

let map

function loadPosToMap(pos?: [number, number]) {
  pos = pos || aMapConfig.defaultLocation  // 如果没有传入坐标默认加载本地坐标
  const {Marker, LngLat} = AMap
  map.setZoomAndCenter(20, pos);
  const marker = new Marker({
    position: new LngLat(...pos),
    title: '别看了，我就在这附近...'
  })
  map.add(marker)
}

async function createMapWindow(AMap) {
  const {Map, PlaceSearch,} = AMap
  const keywords = aMapConfig.address
  const autoOptions = {
    city: aMapConfig.city
  }
  map = new Map('map-container');
  console.log(map)
  if (aMapConfig.localPos) loadPosToMap()  // 指定了使用本地坐标则直接加载
  else {
    // 否则网络搜索坐标
    const placeSearch = new PlaceSearch(autoOptions);
    placeSearch.search(keywords, function (status, result) {
      if (!result) return
      // @ts-ignore
      const pois = result?.poiList?.pois
      if (!pois) return loadPosToMap()  // 网络搜索坐标错误加载默认坐标，错误可能有限额(高德限额100次)，key失效，请求网络错误等等...
      const address = pois[0]
      if (typeof address === 'object') {
        const {lng, lat} = address.location
        const locs = [lng, lat]
        loadPosToMap(locs)
        if (aMapConfig.style) map.setMapStyle(`amap://styles/${aMapConfig.style}`);
      }
    })
  }

}

function createMapLoader() {
  window['_AMapSecurityConfig'] = {
    securityJsCode: aMapConfig.securityKey,
  }
  window['AMapLoader'].load({
    key: aMapConfig.key, // 申请好的Web端开发者Key，首次调用 load 时必填
    // version: "2.0",
    plugins: ['AMap.PlaceSearch'],
    AMapUI: {             // 是否加载 AMapUI，缺省不加载
      version: '1.1',   // AMapUI 版本
      plugins: ['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
    },
  })
    .then(createMapWindow)
    .catch((e) => {
      console.error(e);
    });
}

onUnmounted(()=>{
  map.destroy()
})

</script>

<style scoped lang="scss">
#map-container {
  height: 600px;
  width: 100%;
}

.contact-me-box {
  width: 100%;
  min-height: 500px;
  height: auto;
  overflow: hidden;
  margin: auto;
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: white;
  padding-top: 10%;

  .contact-me-desc {
    min-width: 320px;
    width: 40%;
    letter-spacing: 3px;

    .title {
      font-size: 2.2rem;
      color: #1ca5f8;
      font-weight: bolder;
      margin: 2rem 0;
    }

    .desc {
      font-weight: 500;
      font-size: 1.2rem;
      text-indent: 2.5rem;
    }
  }

  .contact-me-send-mail {
    min-width: 320px;
    width: 40%;
  }

  .contact-me-send-mail-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-input {
      height: 45px;
      font-size: 1rem;
      overflow: hidden;
      margin: 2rem 0;
    }

    .mail-username, .mail-subject {
      width: 48%;
      overflow: hidden;

      :deep(.el-input__wrapper) {
        border-radius: 20px;
        background-color: #F8FAFB;
      }
    }

    .mail-content {
      overflow: hidden;
      width: 100%;

      :deep(.el-textarea__inner) {
        border-radius: 10px;
      }

      :deep(textarea) {
        padding: 20px;
        background-color: #F8FAFB;
      }
    }

    .submit-form-btn-box {
      margin-top: 20px;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      perspective: 500;

      .submit-form-btn {
        border-radius: 30px;
        min-width: 160px;
        height: 40px;
        letter-spacing: 5px;
        font-size: 1.1rem;
        font-weight: bolder;
        white-space: nowrap;
        transform-style: preserve-3d;
        font-family: "Microsoft YaHei", system-ui;
        color: white;
        background: linear-gradient(to right, #0966bd 0%, #5ca4ee 50%, #134cf3 100%);
        background-size: 200% auto;
        opacity: .7;

        .el-icon {
          font-size: 1.4rem;
          margin: 0 6px;
        }
      }

      :hover {
        background-position: right;
        opacity: 1;
        animation: bgAnimation .3s;
      }

      > :active {
        transform: translateY(2px) translateZ(-10px);
      }

      @keyframes bgAnimation {
        0% {
          background-position: left;
        }
        100% {
          background-position: 0 -200% 0 0;
        }
      }
    }
  }
}
</style>
