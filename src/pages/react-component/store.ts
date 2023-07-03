import atomWithShell from '~/utils/atomWithShell'
import { FileNamingConvention } from '~/utils/formatFileName'

enum StoreKey {
  FileNamingConvention = 'fileNamingConvention',
}

function getStoreKey(key: StoreKey) {
  return `ReactComponent_${key}`
}

export const fileNamingConventionAtom = atomWithShell(
  getStoreKey(StoreKey.FileNamingConvention),
  FileNamingConvention.KebabCase
)
