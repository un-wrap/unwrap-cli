// 基于 commander 提供路由系统
// 比如 unw new 就是一个路由
// 其下级路由有 unw new react 、unw new vue 等例子
// 用法参考 koa-router

import { Command, createCommand } from 'commander'

class Router {
  protected readonly __self: Command
  private readonly __children: Router[]
  constructor(
    cmd?: string,
    options?: {
      description?: string
    }
  ) {
    this.__self = createCommand(cmd)
    options?.description &&
      this.__self.addHelpText('after', options.description)
    this.__children = []
  }

  onMount(command: Command) {
    command.addCommand(this.__self)
    this.__children.forEach((child) => child.onMount(this.__self))
  }

  use(router: Router) {
    this.__children.push(router)
    router.onMount(this.__self)
    return this
  }

  run(...args: Parameters<Command['action']>) {
    this.__self.action(...args)
    return this
  }

  option(
    ...args: [
      flags: string,
      description?: string,
      defaultValue?: string | boolean | string[]
    ]
  ) {
    this.__self.option(...args)
    return this
  }

  alias(...args: Parameters<Command['alias']>) {
    this.__self.alias(...args)
    return this
  }
}

export default Router

export class RootRouter extends Router {
  constructor() {
    super()
  }

  /**
   * @description 谨慎使用，只有最顶层的 router 才能调用 parse
   */
  parse(...args: Parameters<Command['parse']>) {
    this.__self.parse(...args)
    return this
  }

  getCommand() {
    return this.__self
  }
}

export function createRootRouter() {
  return new RootRouter()
}

export function createRouter(cmd?: string) {
  return new Router(cmd)
}
