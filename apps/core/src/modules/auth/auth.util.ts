import { authConfig } from './auth.config'
import { getSessionBase } from './auth.implement'
import type { FastifyRequest } from 'fastify'

export const getSession = (req: FastifyRequest) =>
  getSessionBase(req, authConfig)
