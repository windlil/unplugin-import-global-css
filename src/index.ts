import { resolve } from 'path'
import fs from 'fs'
import { createUnplugin } from 'unplugin'
import type { ResolvedConfig } from 'vite'

export interface Options {
  stylesPath?: string     //相对于input目录
}

export default createUnplugin((options?: Options): any => {
  let mainPath: string
  let stylesPath: string
  let styles: string
  return {
    name: 'unplugin-import-global-css',
    enforce: "post",
    configResolved(config: ResolvedConfig) {
      const root = config.root
      const path = resolve(root, './src/main.ts')
      mainPath = normalizePath(path)
      stylesPath = resolve(root, './src/styles')
      styles = getStylesStr(stylesPath)
    },
    transform(code, id) {
      if (mainPath == id) {
        console.log(styles)
        return code + styles
      }
    }
    
  }
})

function normalizePath(path: string):string {
  path = path.replaceAll('\\','/')
  return path
}

function readStylesFile(path): string[] {
  return fs.readdirSync(path)
}

function getStylesStr(path: string): string {
  const stylesArr = readStylesFile(path)
  let styles = ''
  stylesArr.forEach((style) => {
    styles += `import './styles/${style}';`
  })
  return styles
}