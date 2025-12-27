import { useAuth } from "~/composables/useAuth"

export const useApi = () => {
  const { token } = useAuth()

  const apiFetch = async <T>(url: string, opts: any = {}) => {
    const headers: Record<string, string> = { ...(opts.headers || {}) }

    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }

    return await $fetch<T>(url, { ...opts, headers })
  }

  return { apiFetch }
}
