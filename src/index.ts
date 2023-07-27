import { resolve } from 'path'
import fs from 'fs'
import { createUnplugin } from 'unplugin'
import type { ResolvedConfig } from 'vite'
import type { Options } from './types'


function normalizeOptions(options: Options | undefined) {
  return {
    RelativeStylesPath: options?.stylesPath ?? './styles'
  }
}

export default createUnplugin((options?: Options): any => {
  let inputPath: string
  let mainPath: string[] = []
  let stylesPath: string
  let styles: string
  let { RelativeStylesPath } = normalizeOptions(options)
  return {
    name: 'unplugin-import-global-css',
    enforce: "post",
    transform(code, id) {
      if (mainPath.includes(id)) {
        console.log(styles)
        return code + styles
      }
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        const root = config.root
        inputPath = resolve(root, './src')
        const MainTsPath = resolve(inputPath, './main.ts')
        const MainJsPath = resolve(inputPath, './main.js')
        mainPath.push(normalizePath(MainTsPath))
        mainPath.push(normalizePath(MainJsPath))
        stylesPath = resolve(inputPath, RelativeStylesPath)
        styles = getStylesStr(stylesPath)
      },
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