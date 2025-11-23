import { defineStore } from 'pinia'

export const useUserStore = defineStore('products', () => {
    const users = ref<User[]>([])
    const loading = ref<boolean>(false)
    const errorMsg = ref<string>("")

    async function fetchUsers() {
        loading.value = true
        const { request } = useApi()

        try {
            const result = await request<Array<{ id: number; name: string; email: string }>>(
                '/api/mock/users',
                { method: 'GET' }
            )
            users.value = result
        } catch (err: any) {
            errorMsg.value = err?.data?.message || '회원 조회 중 오류가 발생했습니다.'
        }finally {
            loading.value = false
        }
    }

    async function createUser(payload: { name: string; email: string }) {
      try {
        const newUser: User = await $fetch('/api/mock/users', {
          method: 'POST',
          body: payload
        })

        users.value.push(newUser) // 목록 상태 갱신
        return true
      } catch (err: any) {
        errorMsg.value = err?.data?.message || '등록 중 오류가 발생했습니다.'
        return false
      } finally {
        loading.value = false
      }
    }

    async function updateUser(id: number, payload: { name: string; email: string }) {
      try {
        const updatedUser: User = await $fetch(`/api/mock/users/${id}`, {
        method: 'PUT',
        body: payload
      })

      // store.users 배열에서 해당 ID 업데이트
      const idx = users.value.findIndex(u => u.id === id)
      if (idx !== -1) {
        users.value[idx] = updatedUser
      }

      return true
        
      } catch (err: any) {
        errorMsg.value = err?.data?.message || '수정 중 오류가 발생했습니다.'
        return false
      } finally {
        loading.value = false
      }
    }

    async function getUserById(id: number) {
      await fetchUsers()
      return users.value.find(u => u.id === id)
    }

    return {
    users,
    loading,
    errorMsg,
    fetchUsers,
    createUser,
    updateUser,
    getUserById
  }
})
