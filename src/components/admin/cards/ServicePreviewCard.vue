<template>
  <div>
    <section class="mx-auto flex max-w-[85rem] flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full">
      <div :class="['flex items-center justify-between gap-8', data.isRightSection ? 'flex-row' : 'flex-row-reverse']">
        <div class="flex-1">
          <h1
            class="block text-4xl font-bold tracking-tighter text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl lg:text-7xl">
            {{ data.title }}
          </h1>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ data.description }}
          </p>
          <div v-if="data.btnExists" class="mt-5">
            <PrimaryCTA :title="data.btnTitle || 'Contactar'" :url="data.btnURL || '/contact'" />
          </div>
        </div>
        <!-- Mostrar imágenes del servicio -->
        <div v-if="images.length > 0" class="flex gap-3 flex-shrink-0">
          <img v-for="(image, idx) in images" :key="idx" :src="image" class="w-[200px] rounded-lg" :alt="`Imagen ${idx + 1}`" loading="eager" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PrimaryCTA from "@/components/ui/buttons/PrimaryCTA.vue";

export default {
  name: "ServicePreviewCard",
  components: {
    PrimaryCTA,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    images() {
      // Retorna el array de imágenes o array vacío
      return Array.isArray(this.data?.images) ? this.data.images : [];
    }
  }
};
</script>
