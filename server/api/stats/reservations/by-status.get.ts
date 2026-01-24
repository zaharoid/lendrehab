import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)
  const prisma = getPrisma()

  const rows = await prisma.reservation.groupBy({
    by: ["status"],
    _count: { status: true },
    orderBy: { status: "asc" }
  })

  const labels = rows.map(r => r.status)
  const values = rows.map(r => r._count.status)

  return { labels, values }
})
