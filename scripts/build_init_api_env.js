/**
 * 编译后端工程时进行文件复制到产物文件夹用于后端执行环境支持
 * 因为开源。为了不暴露服务器敏感信息，发布过程将手动输入服务器信息，
 * 您可以将.env中的 DB_RESET_INFO 设置成 false，此时将使用 .env中配置的用户密码
 * */
import process from "node:process";
import fs from 'node:fs'
import {config} from "dotenv";
import path from "node:path";
import {createInterface} from "readline";
import chalk from "chalk";
import {Sequelize} from "sequelize";

config({path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)})
const localPath = process.env.API_LOCAL_UPLOADER_DIR_PATH

const localPackageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')).toString())
localPackageJson.type = 'commonjs'

const apiEnvFilePath = path.join(localPath, `/.env.prod`)
fs.writeFileSync(path.join(localPath, `/package.json`), JSON.stringify(localPackageJson, null, 4))
// fs.cpSync(path.join(process.cwd(), './pnpm-lock.yaml'), path.join(localPath, `/pnpm-lock.yaml`))
fs.cpSync(path.join(process.cwd(), './.env.prod'), apiEnvFilePath)


const db_info = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  originHost: new URL(process.env.API_BASE_URL).host,
  dialect: process.env.DB_DIALECT,
  db_name: process.env.DB_NAME,
}

if (process.env.DB_RESET_INFO === 'true') {
  const dotEnvContentList = fs.readFileSync(apiEnvFilePath).toString().split('\n')
  const db_username_index = dotEnvContentList.findIndex(line => line.includes('DB_USERNAME='))
  const db_password_index = dotEnvContentList.findIndex(line => line.includes('DB_PASSWORD='))
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  function customInput(prompt) {
    return new Promise(resolve => rl.question(prompt, (val) => resolve(val)))
  }

  await customInput(chalk.green('➜ [打包中] 请输入您的远程数据库用户名: ')).then(val => {
    dotEnvContentList[db_username_index] = `DB_USERNAME=${val}`
    db_info.username = val
  })
  await customInput(chalk.green('➜ [打包中] 请输入您的远程数据库密码: ')).then(val => {
    dotEnvContentList[db_password_index] = `DB_PASSWORD=${val}`
    db_info.password = val
  })

  fs.writeFileSync(apiEnvFilePath, dotEnvContentList.join('\n'))
  console.log(chalk.green('➜ 写入成功! '), ' 路径为:', apiEnvFilePath)
  rl.close()
}
console.log(chalk.blue('➜ 最终信息: '), db_info)

const sequelize = new Sequelize(db_info.db_name, db_info.username, db_info.password, {
  host: db_info.originHost,
  dialect: db_info.dialect,
})

await sequelize.authenticate()
  .then(() => {
    console.log(chalk.green('➜ 数据库链接成功，您的账号密码是正确的哦'))
    sequelize.close().then()
  })
  .catch((error) => {
    throw new Error(chalk.red('! 哦吼，您的远程数据库连通性测试失败了, 检查检查账号密码啥的, 您的错误信息为:' + error))
  })
