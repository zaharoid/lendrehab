import { getPrisma } from "~/server/db/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const JoiMod = await import("joi")
  const Joi = JoiMod.default

  const schema = Joi.object({
    citizenName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).required(),
    pickupAt: Joi.date().required(),
    referralFile: Joi.string().allow(null, "").optional(),
    deviceId: Joi.number().integer().positive().required()
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

  const device = await prisma.device.findUnique({ where: { id: value.deviceId } })
  if (!device) throw createError({ statusCode: 404, statusMessage: "Device not found" })

  const created = await prisma.reservation.create({
    data: {
      citizenName: value.citizenName,
      email: value.email,
      phone: value.phone,
      pickupAt: new Date(value.pickupAt),
      referralFile: value.referralFile || null,
      deviceId: value.deviceId
    },
    include: { device: true }
  })

  setResponseStatus(event, 201)
  return {
    id: created.id,
    citizenName: created.citizenName,
    email: created.email,
    phone: created.phone,
    pickupAt: created.pickupAt,
    referralFile: created.referralFile,
    status: created.status,
    deviceId: created.deviceId,
    deviceName: created.device.name
  }
})
