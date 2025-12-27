import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)

  const id = Number(event.context.params?.id)
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid reservation id" })
  }

  const body = await readBody(event)
  const JoiMod = await import("joi")
  const Joi = JoiMod.default

  const schema = Joi.object({
    status: Joi.string().valid("PENDING", "APPROVED", "REJECTED").required()
  })

  const { value, error } = schema.validate(body, { abortEarly: false, stripUnknown: true })
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: { issues: error.details.map((d: any) => ({ path: d.path.join("."), message: d.message })) }
    })
  }

  const prisma = getPrisma()
  const exists = await prisma.reservation.findUnique({ where: { id } })
  if (!exists) throw createError({ statusCode: 404, statusMessage: "Reservation not found" })

  return prisma.reservation.update({ where: { id }, data: { status: value.status } })
})
