export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/staff/login') return
  const { isStaff } = useAuth()
  if (!isStaff.value) return navigateTo('/staff/login')
})
