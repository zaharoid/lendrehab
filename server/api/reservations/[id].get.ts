import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)

  const id = Number(event.context.params?.id)
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid reservation id" })
  }

  const prisma = getPrisma()
  const r = await prisma.reservation.findUnique({ where: { id }, include: { device: true } })
  if (!r) throw createError({ statusCode: 404, statusMessage: "Reservation not found" })

  return {
    id: r.id,
    citizenName: r.citizenName,
    email: r.email,
    phone: r.phone,
    pickupAt: r.pickupAt,
    referralFile: r.referralFile,
    status: r.status,
    deviceId: r.deviceId,
    deviceName: r.device.name
  }
})
