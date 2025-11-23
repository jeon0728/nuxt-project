<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <div>
    <h2>회원 목록</h2>

    <BaseCard style="margin-top: 16px;">
      <div v-if="userStore.loading">로딩 중...</div>

      <div v-else-if="userStore.users.length === 0">
        조회된 결과가 없습니다.
      </div>

      <div v-else>
        <table class="common-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in userStore.users" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.common-table {
  width: 100%;
  border-collapse: collapse;
}

.common-table th,
.common-table td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
