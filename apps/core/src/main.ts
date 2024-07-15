#!env node
import { name } from '../package.json'
import { register } from './global/index.global'
import '@wahyubucil/nestjs-zod-openapi/boot'

process.title = `${name} - ${process.env.NODE_ENV || 'unknown'}`
async function main() {
  register()
  const { bootstrap } = await import('./bootstrap')
  bootstrap()
}

main()
