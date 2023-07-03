import { render } from 'ink'
import rootRouter from './routes/rootRouter'
import Home from '~/pages/home/home'

const command = rootRouter.getCommand()

command
  .option('-v, --version', '查看版本号')
  .option('-h, --help', '查看帮助信息')
  .action(() => {
    render(
      <Home args={command.args} command={command} options={command.opts()} />
    )
  })

rootRouter.parse(process.argv)
