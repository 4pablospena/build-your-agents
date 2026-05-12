/// <reference types="nuxt" />

declare module '*.md?raw' {
  const content: string
  export default content
}
