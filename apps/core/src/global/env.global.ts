export const isDev = process.env.NODE_ENV !== 'production'

export const isTest = !!process.env.TEST || process.env.NODE_ENV == 'test'
