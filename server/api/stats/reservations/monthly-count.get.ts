import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

type Row = { month: Date; count: bigint }

export default defineEventHandler(async (event) => {
  requireStaff(event)
  const prisma = getPrisma()

  const rows = await prisma.$queryRaw<Row[]>`
    SELECT date_trunc('month', "createdAt") AS month, COUNT(*) AS count
    FROM "Reservation"
    GROUP BY 1
    ORDER BY 1 ASC
  `

  const labels = rows.map(r =>
    new Date(r.month).toISOString().slice(0, 7)
  )
  const values = rows.map(r => Number(r.count))

  return { labels, values }
})
