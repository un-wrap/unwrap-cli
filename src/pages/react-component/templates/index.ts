export const indexTemplate = (name: string) =>
  `export { default } from './${name}'`

export const componentTemplate = (name: string) =>
  `interface ${name}Props {}

export default function ${name}(props: ${name}Props) {
  return <div>${name}</div>
}
`
