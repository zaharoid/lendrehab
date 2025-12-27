export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const JoiMod = await import("joi")
  const Joi: any = (JoiMod as any).default ?? JoiMod
  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(4).required()
  })

  const { value, error } = schema.validate(body, { abortEarly: false, stripUnknown: true })
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: {
        issues: error.details.map((d: any) => ({
          path: d.path.join("."),
          message: d.message
        }))
      }
    })
  }

  const staffEmail = process.env.STAFF_EMAIL || "staff@lendrehab.test"
  const staffPassword = process.env.STAFF_PASSWORD || "staff123"
  const staffToken = process.env.STAFF_TOKEN || "dev-staff-token"

  if (value.email !== staffEmail || value.password !== staffPassword) {
    throw createError({ statusCode: 401, statusMessage: "Invalid credentials" })
  }

  return { token: staffToken, role: "STAFF" }
})
