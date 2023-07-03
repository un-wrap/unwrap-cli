import { Route } from './rootRouter'
import Home from '~/pages/home/home'
import New from '~/pages/new'
import ReactComponent from '~/pages/react-component'
import { createRouter } from '~/utils/router'

export const routes: Route[] = [
  {
    path: 'new',
    router: createRouter('new'),
    description: '创建新项目',
    options: [
      {
        key: ['n', 'name'],
        path: 'name',
        description: '项目名称',
      },
      {
        key: ['w', 'watch'],
        description: '监听文件变化',
      },
    ],
    Component: New,
    children: [
      {
        path: 'react',
        router: createRouter('react'),
        description: '创建react项目',
        options: [
          {
            key: ['n', 'name'],
            path: 'name',
            description: '项目名称',
          },
        ],
        Component: Home,
      },
    ],
  },
  {
    path: 'rc',
    router: createRouter('rc'),
    description: '创建react组件',
    Component: ReactComponent,
  },
]
