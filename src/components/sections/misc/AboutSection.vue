<template>
  <!-- Quiénes Somos Section -->
  <section class="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <!-- Skeleton for title -->
        <div v-if="loading" class="h-9 w-56 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-6"></div>
        <h2 v-else class="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
          {{ pageData.quienesSomos?.title }}
        </h2>

        <!-- Skeleton for text -->
        <div v-if="loading" class="space-y-3">
          <div class="h-5 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div class="h-5 w-11/12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div class="h-5 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div class="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div class="mt-4"></div>
          <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          <div class="h-4 w-10/12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </div>
        <div v-else class="space-y-4 text-neutral-600 dark:text-neutral-400">
          <p class="text-lg leading-relaxed" v-html="formatParagraph(pageData.quienesSomos?.paragraph1)"></p>
          <p class="leading-relaxed">
            {{ pageData.quienesSomos?.paragraph2 }}
          </p>
        </div>

        <!-- Key points skeleton -->
        <div v-if="loading" class="mt-8 grid grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="flex items-center gap-3">
            <div class="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse shrink-0"></div>
            <div class="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
        </div>
        <!-- Key points -->
        <div v-else class="mt-8 grid grid-cols-2 gap-4">
          <div v-for="(highlight, index) in pageData.quienesSomos?.highlights" :key="index" class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/20">
              <svg class="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ highlight.text }}</span>
          </div>
        </div>
      </div>

      <!-- Image placeholder -->
      <div class="relative">
        <!-- Skeleton for image -->
        <div v-if="loading" class="aspect-[4/3] rounded-2xl bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
        <template v-else>
          <div class="aspect-[4/3] rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-neutral-700 dark:to-neutral-600 overflow-hidden shadow-xl">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="h-24 w-24 text-yellow-500/40 dark:text-yellow-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>
          <!-- Decorative badge -->
          <div class="absolute -bottom-4 -right-4 rounded-xl bg-white dark:bg-neutral-800 p-4 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
                <svg class="h-6 w-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">100%</p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">Salvadoreña</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- Misión y Visión Section -->
  <section class="bg-neutral-50 dark:bg-neutral-900/50">
    <div class="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div class="text-center mb-12">
        <!-- Skeleton for section header -->
        <div v-if="loading" class="flex flex-col items-center">
          <div class="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-3"></div>
          <div class="h-5 w-64 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </div>
        <template v-else>
          <h2 class="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {{ pageData.misionVision?.sectionTitle }}
          </h2>
          <p class="mt-3 text-neutral-600 dark:text-neutral-400">
            {{ pageData.misionVision?.sectionSubtitle }}
          </p>
        </template>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Misión Card Skeleton -->
        <div v-if="loading" class="relative rounded-2xl bg-white dark:bg-neutral-800 p-8 shadow-sm">
          <div class="absolute top-0 left-8 -translate-y-1/2">
            <div class="h-14 w-14 rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
          </div>
          <div class="pt-4 space-y-3">
            <div class="h-6 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
        </div>
        <!-- Misión Card -->
        <div v-else class="group relative rounded-2xl bg-white dark:bg-neutral-800 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div class="absolute top-0 left-8 -translate-y-1/2">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg">
              <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div class="pt-4">
            <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              {{ pageData.misionVision?.mision?.title }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ pageData.misionVision?.mision?.content }}
            </p>
          </div>
        </div>

        <!-- Visión Card Skeleton -->
        <div v-if="loading" class="relative rounded-2xl bg-white dark:bg-neutral-800 p-8 shadow-sm">
          <div class="absolute top-0 left-8 -translate-y-1/2">
            <div class="h-14 w-14 rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
          </div>
          <div class="pt-4 space-y-3">
            <div class="h-6 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-4"></div>
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-4 w-10/12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
        </div>
        <!-- Visión Card -->
        <div v-else class="group relative rounded-2xl bg-white dark:bg-neutral-800 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div class="absolute top-0 left-8 -translate-y-1/2">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg">
              <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div class="pt-4">
            <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              {{ pageData.misionVision?.vision?.title }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ pageData.misionVision?.vision?.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Valores y Compromisos Section -->
  <section class="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
    <div class="text-center mb-12">
      <!-- Skeleton for section header -->
      <div v-if="loading" class="flex flex-col items-center">
        <div class="h-8 w-56 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-3"></div>
        <div class="h-5 w-80 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
      </div>
      <template v-else>
        <h2 class="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
          {{ pageData.compromisos?.sectionTitle }}
        </h2>
        <p class="mt-3 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {{ pageData.compromisos?.sectionSubtitle }}
        </p>
      </template>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Skeleton cards -->
      <template v-if="loading">
        <div v-for="i in 4" :key="i" class="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <div class="mb-4 h-12 w-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
          <div class="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-2"></div>
          <div class="space-y-2">
            <div class="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-3 w-11/12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>
        </div>
      </template>

      <!-- Actual cards -->
      <template v-else>
        <div
          v-for="(item, index) in pageData.compromisos?.items"
          :key="index"
          class="group rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors duration-300"
        >
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-colors">
            <component :is="getIcon(item.icon)" class="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            {{ item.title }}
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ item.description }}
          </p>
        </div>
      </template>
    </div>
  </section>

  <!-- Política de Calidad Section -->
  <section class="bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-neutral-900 dark:to-black">
    <div class="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <!-- Skeleton for badge -->
          <div v-if="loading" class="h-7 w-36 bg-white/10 rounded-full animate-pulse mb-4"></div>
          <span v-else class="inline-block rounded-full bg-yellow-400/20 px-4 py-1.5 text-sm font-semibold text-yellow-400 mb-4">
            {{ pageData.politicaCalidad?.badgeText }}
          </span>

          <!-- Skeleton for title -->
          <div v-if="loading" class="h-9 w-72 bg-white/10 rounded animate-pulse mb-6"></div>
          <h2 v-else class="text-3xl font-bold text-white mb-6">
            {{ pageData.politicaCalidad?.title }}
          </h2>

          <!-- Skeleton for paragraph -->
          <div v-if="loading" class="space-y-2 mb-6">
            <div class="h-4 w-full bg-white/10 rounded animate-pulse"></div>
            <div class="h-4 w-11/12 bg-white/10 rounded animate-pulse"></div>
            <div class="h-4 w-full bg-white/10 rounded animate-pulse"></div>
          </div>
          <p v-else class="text-neutral-300 leading-relaxed mb-6">
            {{ pageData.politicaCalidad?.description }}
          </p>

          <!-- Skeleton for list -->
          <div v-if="loading" class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex items-start gap-3">
              <div class="h-6 w-6 bg-white/10 rounded-full animate-pulse shrink-0"></div>
              <div class="h-4 w-64 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
          <ul v-else class="space-y-4">
            <li v-for="(point, index) in pageData.politicaCalidad?.points" :key="index" class="flex items-start gap-3">
              <svg class="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-neutral-300">{{ point.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-6">
          <!-- Skeleton stats -->
          <template v-if="loading">
            <div v-for="i in 4" :key="i" class="rounded-2xl bg-white/5 backdrop-blur-sm p-6 text-center">
              <div class="h-10 w-20 bg-white/10 rounded animate-pulse mx-auto mb-2"></div>
              <div class="h-4 w-24 bg-white/10 rounded animate-pulse mx-auto"></div>
            </div>
          </template>
          <!-- Actual stats -->
          <template v-else>
            <div v-for="(stat, index) in pageData.politicaCalidad?.stats" :key="index" class="rounded-2xl bg-white/5 backdrop-blur-sm p-6 text-center">
              <p class="text-4xl font-bold text-yellow-400">{{ stat.value }}</p>
              <p class="mt-2 text-sm text-neutral-400">{{ stat.label }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>

  <!-- Por qué Elegirnos Section -->
  <section class="mx-auto max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
    <div class="text-center mb-12">
      <!-- Skeleton for section header -->
      <div v-if="loading" class="flex flex-col items-center">
        <div class="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-3"></div>
        <div class="h-5 w-80 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
      </div>
      <template v-else>
        <h2 class="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
          {{ pageData.porQueElegirnos?.sectionTitle }}
        </h2>
        <p class="mt-3 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {{ pageData.porQueElegirnos?.sectionSubtitle }}
        </p>
      </template>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Skeleton cards -->
      <template v-if="loading">
        <div v-for="i in 3" :key="i" class="text-center">
          <div class="mx-auto mb-4 h-16 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
          <div class="h-6 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mx-auto mb-3"></div>
          <div class="space-y-2">
            <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-4 w-10/12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </template>

      <!-- Actual cards -->
      <template v-else>
        <div v-for="(reason, index) in pageData.porQueElegirnos?.reasons" :key="index" class="text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400">
            <component :is="getReasonIcon(reason.icon)" class="h-8 w-8 text-neutral-800" />
          </div>
          <h3 class="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            {{ reason.title }}
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400">
            {{ reason.description }}
          </p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import { getPublicAboutPage } from '@/API/fetchData';

const loading = ref(true);
const pageData = ref<any>({});

// Format paragraph to highlight "100% salvadoreña"
const formatParagraph = (text: string) => {
  if (!text) return '';
  return text.replace(
    /100% salvadoreña/gi,
    '<strong class="text-neutral-800 dark:text-neutral-200">100% salvadoreña</strong>'
  );
};

// Icon components for compromisos
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    shield: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' })
        ]);
      }
    },
    clock: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })
        ]);
      }
    },
    users: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' })
        ]);
      }
    },
    bolt: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' })
        ]);
      }
    }
  };
  return icons[iconName] || icons.shield;
};

// Icon components for reasons
const getReasonIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    tools: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' })
        ]);
      }
    },
    education: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' })
        ]);
      }
    },
    badge: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' })
        ]);
      }
    }
  };
  return icons[iconName] || icons.tools;
};

onMounted(async () => {
  try {
    const data = await getPublicAboutPage();
    if (data && !data.error) {
      pageData.value = data;
    }
  } catch (err) {
    console.error('Error loading about page:', err);
  } finally {
    loading.value = false;
  }
});
</script>
