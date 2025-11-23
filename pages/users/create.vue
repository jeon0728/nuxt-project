<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 폼 입력값
const name = ref<string>('')
const email = ref<string>('')

// 폼 제출
const submit = async () => {
  const ok = await userStore.createUser({
    name: name.value,
    email: email.value
  })

  if (ok) {
    router.push('/users') // 등록 후 목록으로 이동
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">회원 등록</h1>

    <form @submit.prevent="submit" class="space-y-4 w-80">

      <div>
        <BaseInput
          label="이름"
          v-model="name"
          type="text"
        />
      </div>

      <div>
        <BaseInput
          class="border p-2 w-full"
          label="이메일"
          v-model="email"
          type="email"
        />
      </div>

      <BaseButton
        style="margin-top: 20px; width: 10%;"
        @click="submit"
      >
        등록
      </BaseButton>

    </form>
  </div>
</template>
