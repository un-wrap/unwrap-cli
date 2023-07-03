import path from 'path'
import fs from 'fs-extra'
import { Text } from 'ink'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { fileNamingConventionAtom } from '~/pages/react-component/store'
import {
  componentTemplate,
  indexTemplate,
} from '~/pages/react-component/templates'
import { ActionComponentProps } from '~/types'
import formatFileName, { FileNamingConvention } from '~/utils/formatFileName'

export default function ReactComponent(props: ActionComponentProps) {
  const [fileNamingConvention] = useAtom(fileNamingConventionAtom)
  const [status, setStatus] = useState('处理中...')
  // 根据 args[0] 判断添加的文件名
  useEffect(() => {
    const args = props.args
    const compName = args[0]
    if (!compName) return setStatus('文件名不能为空')
    const basePath = process.cwd()
    const fileName = formatFileName(
      compName,
      FileNamingConvention.UpperCase,
      fileNamingConvention
    )
    try {
      // 递归构建目录
      fs.ensureDirSync(path.resolve(basePath, fileName))
      // 创建 Component 文件
      fs.writeFileSync(
        path.resolve(basePath, fileName, `${fileName}.tsx`),
        componentTemplate(compName)
      )
      // 创建 index 文件
      fs.writeFileSync(
        path.resolve(basePath, fileName, 'index.ts'),
        indexTemplate(fileName)
      )
      // TODO: 项目是 git 仓库时，自动添加到 git
    } catch (error) {
      return setStatus(`文件 ${compName} 添加失败`)
    }

    setStatus(
      `文件 ${compName} 添加成功\n查看：${path.resolve(
        basePath,
        fileName,
        `${fileName}.tsx`
      )}`
    )
  }, [fileNamingConvention, props.args])
  return <Text>{status}</Text>
}
