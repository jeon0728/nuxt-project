// composables/useApi.ts
import { useAuthStore } from '~/stores/auth'
import { useRuntimeConfig } from '#app'

type FetchOptions = Parameters<typeof $fetch>[1]

export const useApi = () => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  // 성공적으로 토큰이 갱신되면 실패했던 요청을 다시 시도하기 위한 함수
  const request = async <T = any>(path: string, opts: FetchOptions = {}) : Promise<T> => {
    const url = path.startsWith('http') ? path : `${config.public.apiBase}${path}`
    // attach Authorization if token present
    const headers = {
      ...(opts.headers || {}),
      ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {})
    }

    try {
      return await $fetch<T>(url, { ...opts, headers, credentials: opts.credentials ?? 'include' }) as T
    } catch (err: any) {
      // 네트워크/서버 에러 등 처리
      if (err?.status === 401) {
        // 401이면 토큰 만료 혹은 비인증 상태
        // 1) refresh 시도
        const refreshed = await auth.refreshToken()
        if (refreshed) {
          // 새 토큰으로 다시 요청
          const headers2 = {
            ...(opts.headers || {}),
            ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {})
          }
          return await $fetch<T>(url, { ...opts, headers: headers2, credentials: opts.credentials ?? 'include' }) as T
        }
      }
      throw err
    }
  }

  return { request }
}
