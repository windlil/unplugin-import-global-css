import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from '../types'
import path from 'path'
import { normailzeOptions } from './options'
import { normalizePath, forEachStyles, formatStylesFiles } from './format'

const FILTER_INCLUDE = [/src\/main\.ts$/,/src\/main\.js$/]
const FILTER_EXCLUDE = [/[\\/]node_modules[\\/]/]

export default createUnplugin((options?: Options): any => {
  const filter = createFilter(
    FILTER_INCLUDE,
    FILTER_EXCLUDE
  )
  let srcPath: string
  const { relativeStylesPath } = normailzeOptions(options)
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