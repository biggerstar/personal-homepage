import vue from '@vitejs/plugin-vue'
import {resolve} from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import {defineViteRunConfig, viteRunLogPlugin} from 'vite-run'

export default defineViteRunConfig(() => {
  return {
    packages: [
      './'
    ],
    targets: {
      'personal-homepage': {
        dev: ['10000'],
        build: [
          ['build']
        ],
        buildGit: [
          ['build', 'page']   // 编译部署到git的产物
        ],
        preview: ['p10000'],   // 部署到git page 在本地无法预览
        size: [
          ['build', 'bundleAnalyzer']
        ]
      }
    },
    plugins: {
      bundleAnalyzer: [
        bundleAnalyzer({})
      ]
    },
    server: {
      10000: {
        port: 10000,
        host: true
      }
    },
    build: {
      build: {}
    },
    preview: {
      p10000: {
        port: 10000,
        host: true
      }
    },
    base: {
      page: '/personal-homepage/'
    },
    baseConfig() {
      return {
        plugins: [
          vue(),
          viteRunLogPlugin({
            build: {
              viteLog: {
                transforming: true
              },
            },
            server: {
              viteLog: {
                transforming: true
              },
            }
          }),
          ElementPlus(),
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ],
        resolve: {
          extensions: ['.vue', '.css', '.js', '.ts'],
          alias: {
            '@': resolve(__dirname, 'src'),
          }
        }
      }
    }
  }
})
