import { getPrisma } from "~/server/db/prisma"
import { readMultipartFormData } from "h3"
import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: "Invalid form data" })
  }

  const getField = (name: string) =>
    formData.find((f) => f.name === name)?.data?.toString()

  const citizenName = getField("citizenName")
  const email = getField("email")
  const phone = getField("phone")
  const pickupAt = getField("pickupAt")
  const deviceId = Number(getField("deviceId"))

  if (!citizenName || !email || !phone || !pickupAt || !deviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed"
    })
  }

  // ---- FILE HANDLING ----
  let referralFilePath: string | null = null

  const file = formData.find((f) => f.name === "referralFile" && f.filename)

  if (file && file.filename) {
    const uploadsDir = path.join(process.cwd(), "public/uploads")
    fs.mkdirSync(uploadsDir, { recursive: true })

    const safeName = `${Date.now()}-${file.filename}`
    const fullPath = path.join(uploadsDir, safeName)

    fs.writeFileSync(fullPath, file.data)

    referralFilePath = `/uploads/${safeName}`
  }

  const prisma = getPrisma()

  const device = await prisma.device.findUnique({ where: { id: deviceId } })
  if (!device) {
    throw createError({ statusCode: 404, statusMessage: "Device not found" })
  }

  const created = await prisma.reservation.create({
    data: {
      citizenName,
      email,
      phone,
      pickupAt: new Date(pickupAt),
      referralFile: referralFilePath,
      deviceId
    },
    include: { device: true }
  })

  setResponseStatus(event, 201)
  return {
    id: created.id,
    status: created.status,
    deviceName: created.device.name,
    referralFile: created.referralFile
  }
})
