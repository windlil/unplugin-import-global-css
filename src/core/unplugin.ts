import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from '../types'
import path from 'path'
import { normailzeOptions } from './options'
import { normalizePath, forEachStyles, formatStylesFiles } from './format'

function initInclude(inputName: string):any[] {
  const reg1 = new RegExp(`src\/${inputName}\.ts$`)
  const reg2 = new RegExp(`src\/${inputName}\.js$`)
  console.log([reg1, reg2])
  return [reg1, reg2]
}

export default createUnplugin((options?: Options): any => {
  const { relativeStylesPath, inputName } = normailzeOptions(options)
  const FILTER_INCLUDE = initInclude(inputName)
  const FILTER_EXCLUDE = [/[\\/]node_modules[\\/]/]
  const filter = createFilter(
    FILTER_INCLUDE,
    FILTER_EXCLUDE
  )
  let srcPath: string
  let stylesPath: string
  const stylesFile: string[] = []
  
  return {
    name: 'unplugin-import-global-css',
    enforce: "post",
    transformInclude(id) {
      const result = filter(id)
      if (result && !srcPath) {
        srcPath = normalizePath(path.resolve(id, '../'))
        stylesPath = normalizePath(path.resolve(srcPath, relativeStylesPath))
        forEachStyles(stylesPath, stylesFile, stylesPath)
        formatStylesFiles(stylesFile, relativeStylesPath)
      }
      return result
    },
    transform(code) {
      const importList = createImport(stylesFile)
      return code + importList
    },
  }
})



export function createImport(arr: string[]) {
  let importList = ''
  arr.forEach((item) => {
    importList += `import '${item}';\n`
  })
  return importList
}