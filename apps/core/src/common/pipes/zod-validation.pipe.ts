import { createZodValidationPipe } from 'nestjs-zod'
import { UnprocessableEntityException } from '@nestjs/common'
import type { ZodError } from 'zod'

export const ZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    const firstError = error.errors[0]
    if ('expected' in firstError) {
      const formatedErrorMessage: string = `Path \`${firstError.path}\` should be \`${firstError.expected}\`, but got \`${firstError.received}\``
      return new UnprocessableEntityException(formatedErrorMessage)
    }

    return new UnprocessableEntityException(
      `\`${firstError.path}\`: ${firstError.message}`,
    )
  },
})
