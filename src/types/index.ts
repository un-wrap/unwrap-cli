import { Command } from 'commander'
import { ReactElement } from 'react'

export type ActionComponent = (props: ActionComponentProps) => ReactElement

export type ActionComponentProps = {
  args: string[]
  options: Record<string, string | boolean | string[]>
  command: Command
}
