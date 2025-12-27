export function useAuth() {
    const token = useCookie<string | null>("staff_token", {
      sameSite: "lax",
      path: "/"
    })
  
    const role = useCookie<string | null>("staff_role", {
      sameSite: "lax",
      path: "/"
    })
  
    const isStaff = computed(() => !!token.value)
  
    const setAuth = (newToken: string, newRole = "STAFF") => {
      token.value = newToken
      role.value = newRole
    }
  
    const logout = () => {
      token.value = null
      role.value = null
    }
  
    return { token, role, isStaff, setAuth, logout }
  }
  