<script setup lang="ts">
import { useProductStore } from '~/stores/products';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div>
    <h2>Products</h2>

    <BaseCard style="margin-top: 16px;">
      <div v-if="productStore.loading">Loading...</div>

      <div v-else-if="productStore.products.length === 0">
        No products found.
      </div>

      <div v-else>
        <table class="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>상품명</th>
              <th>가격</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in productStore.products" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price.toLocaleString() }}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
