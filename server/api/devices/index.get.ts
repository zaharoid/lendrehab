import { getPrisma } from "~/server/db/prisma"

export default defineEventHandler(async () => {
  const prisma = getPrisma()
  return prisma.device.findMany({ orderBy: { id: "asc" } })
})