import { resolve } from 'path'
import { createUnplugin } from 'unplugin'
import type { ResolvedConfig } from 'vite'


export default createUnplugin((): any => {
  let inputPath: any
  return {
    name: 'unplugin-import-global-css',
    enforce: "post",
    configResolved(config: ResolvedConfig) {
      const root = config.root
      const path = resolve(root, './src/main.ts')
      inputPath = normalizePath(path)
      console.log('----',inputPath)
    },
    transform(code, id) {
      if (inputPath == id) {
        console.log('id', id)
      }
    }
    
  }
})

function normalizePath(path: string):string {
  path = path.replaceAll('\\','/')
  return path
}
