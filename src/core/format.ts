import fs from 'fs'
import path from 'path'

export function normalizePath(path: string): string {
  return path.replaceAll('\\','/')
}

export function forEachStyles(stylesPath, arr: string[], root:string) {
  const styles = fs.readdirSync(stylesPath)
  styles.forEach((name) => {
    const p = stylesPath + `/${name}`
    const isDir = fs.statSync(p).isDirectory()
    if (isDir) {
      forEachStyles(p, arr, root)
    } else {
      const relativePath = normalizePath(path.relative(root, p))
      arr.push(relativePath)
    }
  })
}

export function formatStylesFiles(arr: string[], relativeStylesPath: string) {
  arr.forEach((item, index) => {
    arr[index] = relativeStylesPath + `/${item}`
  })
}

