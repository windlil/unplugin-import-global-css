import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autocss from 'unplugin-import-global-css/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), autocss()],
})
