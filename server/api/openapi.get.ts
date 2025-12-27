export default defineEventHandler((event) => {
  return sendRedirect(event, "/openapi.yaml", 302)
})
