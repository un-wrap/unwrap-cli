import { Text } from 'ink'
import Version from './version'
import Help from '~/components/help'
import { ActionComponentProps } from '~/types'

export default function Home(props: ActionComponentProps) {
  if (props.options.version) return <Version />
  if (props.options.help) return <Help {...props} />
  return <Text></Text>
}
