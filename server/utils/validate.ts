import type Joi from "joi"
import { HttpError } from "./httpError"

export function validateBody<T>(schema: Joi.ObjectSchema<T>, body: unknown): T {
  const { value, error } = schema.validate(body, {
    abortEarly: false,
    stripUnknown: true
  })
  if (error) {
    throw new HttpError(400, "Validation failed", {
      issues: error.details.map((d) => ({ path: d.path.join("."), message: d.message }))
    })
  }
  return value
}
