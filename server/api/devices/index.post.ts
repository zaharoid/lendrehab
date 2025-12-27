import { getPrisma } from "~/server/db/prisma"
import { requireStaff } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireStaff(event)

  const body = await readBody(event)
  const JoiMod = await import("joi")
  const Joi = JoiMod.default

  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    type: Joi.string().min(2).required(),
    size: Joi.string().min(1).required(),
    description: Joi.string().min(5).required(),
    availableFrom: Joi.date().required()
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
  const created = await prisma.device.create({
    data: {
      ...value,
      availableFrom: new Date(value.availableFrom)
    }
  })

  setResponseStatus(event, 201)
  return created
})
