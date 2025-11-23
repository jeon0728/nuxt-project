<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const id = Number(route.params.id)

const name = ref<string>('')
const email = ref<string>('')

onMounted(async () => {
  const user = await userStore.getUserById(id)

  if (!user) {
    alert('존재하지 않는 사용자입니다.')
    router.push('/users')
    return
  }

  // 기존 값 폼에 세팅
  name.value = user.name
  email.value = user.email
})

const submit = async () => {
  const ok = await userStore.updateUser(id, {
    name: name.value,
    email: email.value
  })

  if (ok) {
    router.push('/users')
  }
}
</script>

<template>
  <div class="p-6 w-80">
    <h1 class="text-2xl font-bold mb-6">회원 수정</h1>

    <form @submit.prevent="submit" class="space-y-4">

      <div>
        <BaseInput
          class="border p-2 w-full"
          label="이름"
          v-model="name"
          type="text"
          required
        />
      </div>

      <div>
        <BaseInput
          class="border p-2 w-full"
          label="이메일"
          v-model="email"
          type="email"
          required
        />
      </div>

      <BaseButton
        style="margin-top: 20px; width: 10%;"
        @click="submit"
      >
        수정
      </BaseButton>

    </form>
  </div>
</template>
