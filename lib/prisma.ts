/* eslint-disable no-var */ // Disable ESLint rule for this block

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  // `var` is required for global declarations in TypeScript
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

/* eslint-enable no-var */ // Re-enable ESLint rule after this block

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
