import { useAuth } from "./useAuth"

type FetchOptions = Parameters<typeof $fetch>[1]

export function useApi() {
  const { token } = useAuth()

  const apiFetch = async <T>(url: string, options: FetchOptions = {}) => {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> | undefined)
    }

    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }

    return $fetch<T>(url, {
      ...options,
      headers
    })
  }

  return { apiFetch }
}
