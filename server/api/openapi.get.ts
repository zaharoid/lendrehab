import { readFileSync } from "node:fs"
import { resolve } from "node:path"

export default defineEventHandler((event) => {
  const p = resolve(process.cwd(), "docs", "openapi.yaml")
  const yaml = readFileSync(p, "utf-8")
  setHeader(event, "Content-Type", "text/yaml; charset=utf-8")
  return yaml
})
