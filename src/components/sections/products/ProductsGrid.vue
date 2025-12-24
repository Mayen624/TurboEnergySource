<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
    <!-- Skeleton loading state -->
    <template v-if="loading">
      <template v-for="i in 8" :key="`skeleton-${i}`">
        <!-- Small skeleton -->
        <div
          v-if="i % 4 === 1 || i % 4 === 0"
          class="group relative flex h-48 items-end overflow-hidden rounded-xl shadow-lg md:h-80 animate-pulse"
        >
          <div class="absolute inset-0 h-full w-full bg-gray-200 dark:bg-neutral-700"></div>
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-800 via-transparent to-transparent opacity-50"></div>
          <div class="relative mb-3 ml-4 md:ml-5 w-3/4">
            <div class="h-4 bg-gray-300 dark:bg-neutral-600 rounded md:h-5"></div>
          </div>
        </div>
        <!-- Wide skeleton -->
        <div
          v-else
          class="group relative flex h-48 items-end overflow-hidden rounded-lg shadow-xl md:col-span-2 md:h-80 animate-pulse"
        >
          <div class="absolute inset-0 h-full w-full bg-gray-200 dark:bg-neutral-700"></div>
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-800 via-transparent to-transparent opacity-50"></div>
          <div class="relative mb-3 ml-4 md:ml-5 w-2/3">
            <div class="h-4 bg-gray-300 dark:bg-neutral-600 rounded md:h-5"></div>
          </div>
        </div>
      </template>
    </template>

    <!-- Actual products -->
    <template v-else-if="products && products.length > 0">
      <template v-for="(product, index) in products" :key="product._id">
        <ProductCard :product="product" :isWide="index % 4 === 1 || index % 4 === 2" />
      </template>
    </template>

    <!-- Empty state -->
    <div v-else class="col-span-full text-center py-12">
      <p class="text-neutral-600 dark:text-neutral-400">
        No hay productos disponibles en este momento.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPublicProducts } from '@/API/fetchData';
import ProductCard from './ProductCard.vue';

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await getPublicProducts(1, 100); // Get all public products
    if (response.error) {
      console.error('Error loading products:', response.error);
      products.value = [];
    } else {
      products.value = response.products || response.data || [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
