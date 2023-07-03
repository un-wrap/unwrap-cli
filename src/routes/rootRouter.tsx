import type { Command } from 'commander'
import { render } from 'ink'
import Router, { createRootRouter } from '../utils/router'
import { routes } from './config'
import { ActionComponent } from '~/types'

const rootRouter = createRootRouter()

const stack: [Router, Route][] = [...routes].map((route) => [rootRouter, route])

while (stack.length) {
  const [parent, route] = stack.shift()!
  parent.use(route.router)
  route.options?.forEach((option) => {
    route.router.option(
      `${
        option.key[1]
          ? `-${option.key[0]}, --${option.key[1]}`
          : `--${option.key[0]}`
      }${option.path ? ` <${option.path}>` : ''}`,
      option.description,
      option.description ? option.defaultValue : undefined
    )
  })
  route.Component &&
    route.router.run(
      (
        options: {
          [key: string]: string | boolean | string[]
        },
        command: Command
      ) => {
        const Component = route.Component!
        render(
          <Component args={command.args} command={command} options={options} />
        )
      }
    )

  route.children?.forEach((child) => stack.push([route.router, child]))
}
export default rootRouter

export type Route = {
  path: string
  router: Router
  description?: string
  options?: {
    key: [string, string?]
    path?: string
    description: string
    defaultValue?: string | boolean | string[]
  }[]
  Component?: ActionComponent
  children?: Route[]
}
