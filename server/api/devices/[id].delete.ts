import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)

  const id = Number(event.context.params?.id)
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid device id" })
  }

  const prisma = getPrisma()
  const exists = await prisma.device.findUnique({ where: { id } })
  if (!exists) throw createError({ statusCode: 404, statusMessage: "Device not found" })

  await prisma.device.delete({ where: { id } })
  setResponseStatus(event, 204)
  return null
})
