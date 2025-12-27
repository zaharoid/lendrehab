import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)
  const prisma = getPrisma()

  const items = await prisma.reservation.findMany({
    orderBy: { id: "desc" },
    include: { device: true }
  })

  return items.map((r: any) => ({
    id: r.id,
    citizenName: r.citizenName,
    email: r.email,
    phone: r.phone,
    pickupAt: r.pickupAt,
    referralFile: r.referralFile,
    status: r.status,
    deviceId: r.deviceId,
    deviceName: r.device.name
  }))
})
