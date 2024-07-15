import 'dotenv-expand/config'
import { argv } from 'zx-cjs'

const env = process.env

// argv first
// mergeArgv(argv, env, 'database_url')
//
//
// for env: env['DATABASE_URL']
// for argv: argv.database_url
export const mergeArgv = (key: string) => {
  return argv[key] ?? env[toUpperCase(key)]
}

// i_ia => I_Ia
const toUpperCase = (key: string) => key.toUpperCase()
