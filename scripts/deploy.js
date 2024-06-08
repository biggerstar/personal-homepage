/*
 * 用于简单将本地构建产物部署到服务器
 * 未支持ssh密钥登录，只简单做密码方式登录
 * */
import {createInterface} from "readline";
import process from "node:process";
import chalk from "chalk";
import {config} from "dotenv";
import {Client} from 'node-scp'
import path from "node:path";
import fs from "node:fs";

config({path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)})

/**
 * @param opt
 * @param opt.localPath
 * @param opt.originPath
 * @param opt.host
 * @param opt.username
 * @param opt.emptyDir
 * */
export async function doDeploy(opt) {
  if (!opt.localPath) return console.log(chalk.red('您需要指定本地要发布的文件夹')) && process.exit(-1)
  if (!opt.originPath) return console.log(chalk.red('您需要指定本地发布到服务器的路径')) && process.exit(-1)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const serverConfig = {
    host: opt.host,  // 如果在.env指定了发布地址，则直接使用，否则后面手动输入
    username: opt.username,  // 除非私有项目，否则不建议将敏感信息使用env定义
    password: void 0,
    localPath: path.resolve(process.cwd(), opt.localPath),
    originPath: opt.originPath,
  }
  if (!fs.existsSync(serverConfig.localPath)) return console.log(chalk.red('本地目录不存在')) && process.exit(-1)

  function customInput(prompt) {
    return new Promise(resolve => rl.question(prompt, (val) => resolve(val)))
  }

  await Promise.resolve()
    .then(() => !serverConfig.host && customInput(`${chalk.green('➜ 请输入您的服务器: ')}`).then((val) => serverConfig.host = val))
    .then(() => !serverConfig.username && customInput(`${chalk.green('➜ 请输入您的登录名: ')}`).then((val) => serverConfig.username = val))
    .then(() => customInput(`${chalk.green('➜ 请输入您服务器的密码: ')}`).then((val) => serverConfig.password = val))

  const client = await Client({
    host: serverConfig.host,
    port: 22,
    username: serverConfig.username,
    password: serverConfig.password,
  }).catch(err => {
    console.log(chalk.red('连接服务器失败'), '错误消息为:', err.message)
    process.exit(0)
  })

  await Promise.resolve().then(async () => {
    console.log(serverConfig)
    const listenInput = () => {
      return customInput(`${chalk.yellow('➜ 将本地目录', chalk.blue(serverConfig.localPath), '\n  发布到服务器', chalk.blue(serverConfig.host), '的', chalk.blue(serverConfig.originPath), '路径下，请确认(yes/no): ')}`)
        .then((val) => {
          if (val.trim() === 'no') {
            console.log(chalk.red('您停止了发布,本次部署流程停止'))
            process.exit(0)
          } else if (val.trim() === 'yes') {
            console.log(chalk.grey('  您确认了发布'))
          } else {
            console.log(chalk.yellow('输入不符合要求,请输入 yes 或 no'))
            return listenInput()
          }
        })
    }
    return listenInput()
  })

  const result = await client.exists(serverConfig.originPath)
  if (result && opt.emptyDir !== false) {   // 是否清空远程文件夹
    await Promise.resolve().then(() => {
      const listenInput = () => {
        return customInput(`${chalk.yellow('➜ 服务器已经存在目录，若覆盖将不可恢复, 是否覆盖? (yes/no): ')}`)
          .then((val) => {
            if (val.trim() === 'no') {
              console.log(chalk.red('您取消了发布,本次部署流程停止'))
              process.exit(0)
            } else if (val.trim() === 'yes') {
              console.log(chalk.grey('  您确认了覆盖,您需要保证服务器文件未被占用且权限足够！'))
              return client.emptyDir(serverConfig.originPath).then(() => {
                console.log('  清空文件夹成功', serverConfig.originPath)
              }).catch((err) => {
                console.log('  清空文件夹失败，错误信息为:', err.message)
              })
            } else {
              console.log(chalk.yellow('输入不符合要求,请输入 yes 或 no'))
              return listenInput()
            }
          })
      }
      return listenInput()
    })
  }
  await client.uploadDir(
    serverConfig.localPath,
    serverConfig.originPath,
  )
    .then(_ => {
      console.log(chalk.green('➜ 发布成功'))
    })
    .catch(err => {
      console.log(chalk.green('➜ 发布失败,错误消息为'), err.message)
    })
  rl.close()
  client.close()
}
