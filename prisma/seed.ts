import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@prisma/client/extension"



const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: "file:dev.db" })
})

async function main() {
    
  await prisma.device.createMany({
    data: [
      {
        name: "Standard Wheelchair",
        type: "Wheelchair",
        size: "18 inch",
        description: "A standard folding wheelchair suitable for indoor and outdoor use.",
        availableFrom: new Date("2025-03-02")
      },
      {
        name: "Lightweight Wheelchair",
        type: "Wheelchair",
        size: "16 inch",
        description: "Light aluminum frame, easy to transport.",
        availableFrom: new Date("2025-03-05")
      },
      {
        name: "Forearm Crutches",
        type: "Crutches",
        size: "Medium",
        description: "Height-adjustable forearm crutches with ergonomic handles.",
        availableFrom: new Date("2025-03-01")
      }
    ]
  })

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
