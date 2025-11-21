import { defineStore } from 'pinia'
import type { Product } from './types'

export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const loading = ref<boolean>(false)

    async function fetchProducts() {
        loading.value = true
        const { request } = useApi()

        try {
            const result = await request<Array<{ id: number; name: string; price: number }>>(
                '/api/mock/products',
                { method: 'GET' }
            )

            products.value = result
        } finally {
            loading.value = false
        }
    }

    return {
    products,
    loading,
    fetchProducts
  }
})
