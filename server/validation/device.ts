import Joi from "joi"

export const deviceCreateSchema = Joi.object({
  name: Joi.string().min(2).required(),
  type: Joi.string().min(2).required(),
  size: Joi.string().min(1).required(),
  description: Joi.string().min(5).required(),
  availableFrom: Joi.date().required()
})

export const deviceUpdateSchema = Joi.object({
  name: Joi.string().min(2),
  type: Joi.string().min(2),
  size: Joi.string().min(1),
  description: Joi.string().min(5),
  availableFrom: Joi.date()
}).min(1)
