export function requireStaff(event: any) {
  const auth = event.node.req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : ""
  if (!token || token !== (process.env.STAFF_TOKEN || "dev-staff-token")) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }
}
