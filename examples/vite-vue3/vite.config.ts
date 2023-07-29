import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inspect from 'vite-plugin-inspect'
import autocss from 'unplugin-import-global-css/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autocss({
      inputName: 'index',
      include: ["reset.css"]
    }),
    inspect()],
})
