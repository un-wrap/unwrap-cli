import { Text } from 'ink'
import { version } from '../../../package.json'

export default function Version() {
  return <Text>v{version}</Text>
}
