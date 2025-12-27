export const useApi = () => {
  const { token } = useAuth()

  const apiFetch = <T>(url: string, opts: any = {}) => {
    const headers: Record<string, string> = { ...(opts.headers || {}) }
    if (token.value) headers.Authorization = `Bearer ${token.value}`

    return $fetch<T>(url, { ...opts, headers })
  }

  return { apiFetch }
}
