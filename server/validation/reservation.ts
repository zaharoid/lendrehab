import Joi from "joi"

export const reservationCreateSchema = Joi.object({
  citizenName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).required(),
  pickupAt: Joi.date().required(),
  referralFile: Joi.string().allow(null, "").optional(),
  deviceId: Joi.number().integer().positive().required()
})

export const reservationStatusSchema = Joi.object({
  status: Joi.string().valid("PENDING", "APPROVED", "REJECTED").required()
})
