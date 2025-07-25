import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 配置跨域代理
  server: {
    proxy: {
      '/api': {
        target: 'http://hadoop-bishe:8085',
        changeOrigin: true
      }
    }
  }
})
