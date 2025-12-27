import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.reservation.deleteMany()
  await prisma.device.deleteMany()

  await prisma.device.createMany({
    data: [
      {
        name: "Wheelchair Basic",
        type: "Wheelchair",
        size: "M",
        description: "Lightweight wheelchair for everyday use.",
        availableFrom: new Date(Date.now() + 24 * 3600 * 1000)
      },
      {
        name: "Crutches Pair",
        type: "Crutches",
        size: "L",
        description: "Adjustable crutches, good condition.",
        availableFrom: new Date(Date.now() + 2 * 24 * 3600 * 1000)
      },
      {
        name: "Walker",
        type: "Walker",
        size: "S",
        description: "Stable walker with rubber tips.",
        availableFrom: new Date()
      }
    ]
  })

  const device = await prisma.device.findFirst()
  if (device) {
    await prisma.reservation.create({
      data: {
        citizenName: "John Doe",
        email: "ivan@example.com",
        phone: "+431234567",
        pickupAt: new Date(Date.now() + 3 * 24 * 3600 * 1000),
        status: "PENDING",
        deviceId: device.id
      }
    })
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
