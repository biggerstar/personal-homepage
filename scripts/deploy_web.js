import {doDeploy} from "./deploy.js";
import process from "node:process";

const options = {
  localPath:  process.env.WEB_LOCAL_UPLOADER_DIR_PATH,
  originPath: process.env.WEB_RELEASE_DIR_PATH,
  host: process.env.WEB_RELEASE_HOST !== 'false' ? process.env.WEB_RELEASE_HOST : void 0,
  username: process.env.WEB_RELEASE_USERNAME !== 'false' ? process.env.WEB_RELEASE_USERNAME : void 0
}
await doDeploy(options)

