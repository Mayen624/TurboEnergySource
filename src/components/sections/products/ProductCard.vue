<template>
  <a
    :href="`/products/${product.slug || product._id}`"
    :class="cardClass"
    class="group relative flex h-48 items-end overflow-hidden shadow-lg outline-none ring-zinc-500 focus-visible:ring dark:ring-zinc-200 dark:focus:outline-none md:h-80"
  >
    <!-- Product image -->
    <img
      :src="productImage"
      :alt="product.title || 'Product image'"
      class="absolute inset-0 h-full w-full object-cover object-center transition duration-[600ms] ease-[cubic-bezier(0.45,0,0.55,1)] group-hover:scale-110"
      loading="lazy"
    />

    <!-- Gradient overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-800 via-transparent to-transparent opacity-50"
    ></div>

    <!-- Product description -->
    <span
      class="relative mb-3 ml-4 inline-block text-sm font-bold text-neutral-50 transition duration-[600ms] ease-[cubic-bezier(0.45,0,0.55,1)] group-hover:scale-110 md:ml-5 md:text-lg"
    >
      {{ product.title || product.description }}
      <!-- Icon: openInNew -->
      <svg
        class="inline-block ml-1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  product: any;
  isWide?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isWide: false
});

// Compute card class based on isWide prop
const cardClass = computed(() => {
  return props.isWide
    ? 'rounded-lg shadow-xl md:col-span-2' // CardWide style
    : 'rounded-xl'; // CardSmall style
});

// Get product image - fallback to placeholder if not available
const productImage = computed(() => {
  // API returns mainContent.img.src for products
  if (props.product.mainContent?.img?.src) {
    return props.product.mainContent.img.src;
  }
  if (props.product.image) {
    return props.product.image;
  }
  if (props.product.images && props.product.images.length > 0) {
    return props.product.images[0];
  }
  // Fallback placeholder
  return 'https://via.placeholder.com/800x600/333/fff?text=Product+Image';
});
</script>
