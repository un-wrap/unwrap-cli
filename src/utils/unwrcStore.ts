import fs from 'fs-extra'

const store = null

export const getUnwrcStore = () => {
  if (store) return store

  // 获取用户目录
  const userHome = process.env.HOME || process.env.USERPROFILE
  const storePath = `${userHome}/.unwrc`
  // 确保文件存在
  fs.ensureFileSync(storePath)
  // 读取文件 (json)
  const content = fs.readFileSync(storePath, 'utf-8') || '{}'
  try {
    return JSON.parse(content) as {
      [key: string]: any
    }
  } catch (error) {
    throw new Error('.unwrc 配置文件错误，请勿自行更改')
  }
}

export const setUnwrcStore = (data: { [key: string]: any }) => {
  const userHome = process.env.HOME || process.env.USERPROFILE
  const storePath = `${userHome}/.unwrc`
  try {
    fs.writeFileSync(storePath, JSON.stringify(data))
  } catch (error) {
    throw new Error('.unwrc 配置文件错误，请勿自行更改')
  }
}
