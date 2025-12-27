export const useAuth = () => {
  const token = useCookie<string | null>('staff_token', { sameSite: 'lax' })
  const role = useCookie<string | null>('staff_role', { sameSite: 'lax' })

  const isStaff = computed(() => role.value === 'STAFF' && !!token.value)

  const setAuth = (t: string, r: string) => {
    token.value = t
    role.value = r
  }

  const clearAuth = () => {
    token.value = null
    role.value = null
  }

  return { token, role, isStaff, setAuth, clearAuth }
}
