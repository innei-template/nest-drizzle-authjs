import { createLogger } from 'nestjs-pretty-logger'

import { LOG_DIR } from '@core/constants/path.constant'

const logger = createLogger({
  writeToFile: {
    loggerDir: LOG_DIR,
  },
})

export { logger as consola, logger }
