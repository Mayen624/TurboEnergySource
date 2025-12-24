<template>
  <div>
    <!-- Skeleton Loading State -->
    <template v-if="loading">
      <div v-for="i in 4" :key="`skeleton-${i}`" class="mx-auto max-w-[85rem] items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 lg:px-8 lg:py-14 xl:gap-16 2xl:max-w-full">
        <template v-if="i % 2 === 0">
          <!-- Image skeleton (left) -->
          <div class="animate-pulse">
            <div class="w-full h-64 bg-gray-200 dark:bg-neutral-700 rounded-xl"></div>
          </div>
          <!-- Text skeleton (right) -->
          <div class="mt-4 md:mt-0 space-y-4 animate-pulse">
            <div class="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-4/5"></div>
          </div>
        </template>
        <template v-else>
          <!-- Text skeleton (left) -->
          <div class="space-y-4 animate-pulse">
            <div class="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-4/5"></div>
          </div>
          <!-- Image skeleton (right) -->
          <div class="mt-8 animate-pulse">
            <div class="w-full h-64 bg-gray-200 dark:bg-neutral-700 rounded-xl"></div>
          </div>
        </template>
      </div>
    </template>

    <!-- Actual Services -->
    <template v-else-if="services && services.length > 0">
      <section
        v-for="(service, index) in services"
        :key="service._id"
        class="mx-auto max-w-[85rem] items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 lg:px-8 lg:py-14 xl:gap-16 2xl:max-w-full"
      >
        <!-- Left Image / Right Text (even index) -->
        <template v-if="index % 2 === 0">
          <!-- Image -->
          <img
            :src="service.images?.[0]?.src || 'https://via.placeholder.com/800x600/333/fff?text=Service+Image'"
            :alt="service.title || service.images?.[0]?.alt"
            class="w-full rounded-xl object-cover"
            loading="lazy"
          />
          <!-- Text Content -->
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-balance text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200">
              {{ service.title }}
            </h2>
            <p class="mb-4 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-lg">
              {{ service.description }}
            </p>
          </div>
        </template>

        <!-- Right Image / Left Text (odd index) -->
        <template v-else>
          <!-- Text Content -->
          <div>
            <h2 class="mb-4 text-balance text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200">
              {{ service.title }}
            </h2>
            <p class="mb-4 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-lg">
              {{ service.description }}
            </p>
          </div>
          <!-- Image -->
          <div class="mt-8">
            <img
              :src="service.images?.[0]?.src || 'https://via.placeholder.com/800x600/333/fff?text=Service+Image'"
              :alt="service.title || service.images?.[0]?.alt"
              class="w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </template>
      </section>
    </template>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <p class="text-neutral-600 dark:text-neutral-400 text-lg">
        No hay servicios disponibles en este momento.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPublicServices } from '@/API/fetchData';

const services = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await getPublicServices(1, 100); // Get all public services
    if (response.error) {
      console.error('Error loading services:', response.error);
      services.value = [];
    } else {
      services.value = response.services || response.data || [];
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    services.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
