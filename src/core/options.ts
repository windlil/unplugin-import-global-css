import type { Options } from '../types'

export function normailzeOptions(options: Options | undefined) {
  const relativeStylesPath = options?.globStylesPath ?? './styles'
  const inputName = options?.inputName ?? 'main'
  const include = options?.include ?? []
  return {
    relativeStylesPath,
    inputName,
    include
  }
}