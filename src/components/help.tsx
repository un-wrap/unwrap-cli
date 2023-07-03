import { Text } from 'ink'
import { ActionComponentProps } from '~/types'

export default function Help(props: ActionComponentProps) {
  // 获取原本的 -h 或 --help 命令对应的输出信息
  const help = props.command.helpInformation()

  return <Text>{help}</Text>
}
