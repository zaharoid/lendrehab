import { useAuth } from "~/composables/useAuth"

export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return
  
    const { isStaff } = useAuth()
    if (!isStaff.value && to.path.startsWith("/staff") && to.path !== "/staff/login") {
      return navigateTo("/staff/login")
    }
  })
  