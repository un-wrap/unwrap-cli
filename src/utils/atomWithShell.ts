import { Atom, atom } from 'jotai'
import { getUnwrcStore, setUnwrcStore } from '~/utils/unwrcStore'
export default function atomWithShell<T>(key: string, value: T) {
  // 从用户的配置文件中读取（如果没有则创建文件）
  const _atom = atom(getUnwrcStore()[key] ?? value)
  return atom(
    (get) => get(_atom),
    (get, set, newPrice) => {
      const store = getUnwrcStore()
      store[key] = newPrice
      setUnwrcStore(store)
      set(_atom, newPrice)
    }
  ) as Atom<T>
}
