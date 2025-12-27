import spec from "~/docs/openapi.yaml"

export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/yaml; charset=utf-8")
  return spec
})
