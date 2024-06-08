import process from "node:process";
import {doDeploy} from "./deploy.js";

const options = {
  emptyDir: false, // 如果发布服务端将不清空文件夹而是会直接覆盖
  localPath: process.env.API_LOCAL_UPLOADER_DIR_PATH,
  originPath: process.env.API_RELEASE_DIR_PATH,
  host: process.env.API_RELEASE_HOST !== 'false' ? process.env.API_RELEASE_HOST : void 0,
  username: process.env.API_RELEASE_USERNAME !== 'false' ? process.env.API_RELEASE_USERNAME : void 0
}

await doDeploy(options)
