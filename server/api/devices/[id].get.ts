import { getPrisma } from "~/server/db/prisma"

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid device id" })
  }

  const prisma = getPrisma()
  const device = await prisma.device.findUnique({ where: { id } })

  if (!device) {
    throw createError({ statusCode: 404, statusMessage: "Device not found" })
  }

  return device
})
