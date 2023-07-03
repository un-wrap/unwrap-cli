export enum FileNamingConvention {
  PascalCase = 'PascalCase',
  KebabCase = 'kebab-case',
  CamelCase = 'camelCase',
  SnakeCase = 'snake_case',
  UpperCase = 'UPPER_CASE',
  DotCase = 'dot.case',
  SyncExport = 'sync-export',
}

export default function formatFileName(
  name: string,
  inputConvention: FileNamingConvention = FileNamingConvention.PascalCase,
  outputConvention: FileNamingConvention = FileNamingConvention.PascalCase
): string {
  // 根据输入的命名规则把字符串拆分为一个数组
  let words: string[] = []
  switch (inputConvention) {
    case FileNamingConvention.PascalCase:
    case FileNamingConvention.CamelCase:
      words = name.match(/([a-z]+|[A-Z][a-z]*)/g) || []
      break
    case FileNamingConvention.KebabCase:
    case FileNamingConvention.SyncExport:
      words = name.split('-')
      break
    case FileNamingConvention.SnakeCase:
    case FileNamingConvention.UpperCase:
      words = name.split('_')
      break
    case FileNamingConvention.DotCase:
      words = name.split('.')
      break
    default:
      throw new Error(`Unknown input convention: ${inputConvention}`)
  }

  // 把数组转换为小写
  words = words.map((word) => word.toLowerCase())

  // 根据输出的命名规则把数组重新组合为一个字符串
  let result: string
  switch (outputConvention) {
    case FileNamingConvention.PascalCase:
      result = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
      break
    case FileNamingConvention.CamelCase:
      result =
        words[0] +
        words
          .slice(1)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')
      break
    case FileNamingConvention.KebabCase:
    case FileNamingConvention.SyncExport:
      result = words.join('-')
      break
    case FileNamingConvention.SnakeCase:
      result = words.join('_')
      break
    case FileNamingConvention.UpperCase:
      result = words.join('_').toUpperCase()
      break
    case FileNamingConvention.DotCase:
      result = words.join('.')
      break
    default:
      throw new Error(`Unknown output convention: ${outputConvention}`)
  }

  return result
}
