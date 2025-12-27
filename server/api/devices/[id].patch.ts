import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)

  const id = Number(event.context.params?.id)
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid device id" })
  }

  const body = await readBody(event)
  const JoiMod = await import("joi")
  const Joi = JoiMod.default

  const schema = Joi.object({
    name: Joi.string().min(2),
    type: Joi.string().min(2),
    size: Joi.string().min(1),
    description: Joi.string().min(5),
    availableFrom: Joi.date()
  }).min(1)

  const { value, error } = schema.validate(body, { abortEarly: false, stripUnknown: true })
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: { issues: error.details.map((d: any) => ({ path: d.path.join("."), message: d.message })) }
    })
  }

  const prisma = getPrisma()
  const exists = await prisma.device.findUnique({ where: { id } })
  if (!exists) throw createError({ statusCode: 404, statusMessage: "Device not found" })

  return prisma.device.update({
    where: { id },
    data: {
      ...value,
      ...(value.availableFrom ? { availableFrom: new Date(value.availableFrom) } : {})
    }
  })
})
