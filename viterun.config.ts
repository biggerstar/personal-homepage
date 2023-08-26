import vue from '@vitejs/plugin-vue'
import {resolve} from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import {defineViteRunConfig, viteRunLogPlugin} from 'vite-run'


export default defineViteRunConfig({
  packages: [
    './'
  ],
  targets: {
    'personal-homepage': {
      dev: ['10000'],
      build: ['build'],
      size: [
        ['build', 'bundleAnalyzer']
      ]
    }
  },
  server: {
    10000: {
      port: 10000
    }
  },
  build: {
    build: {}
  },
  baseConfig() {
    return {
      plugins: [
        vue(),
        viteRunLogPlugin({
          build:{
            viteLog:{
              transforming:true
            },
          },
          server:{
            viteLog:{
              transforming:true
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
})
