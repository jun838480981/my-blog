// @ts-check
import { defineConfig } from 'astro/config'

import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue()],

  // 添加服务器配置
  server: {
    host: '0.0.0.0',
    port: 4321
  }
})
