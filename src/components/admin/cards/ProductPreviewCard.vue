<template>
  <div>
    <section class="mx-auto flex max-w-[85rem] flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full">
      <div>
        <p id="fadeText"
          class="mb-8 max-w-prose text-pretty font-light text-neutral-700 dark:text-neutral-300 sm:text-xl">
          {{ data.mainContent.introduction }}
        </p>
      </div>
      <div class="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div id="fadeInUp">
          <h1
            class="block text-4xl font-bold tracking-tighter text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl lg:text-7xl">
            {{ data.title }}
          </h1>
         
        </div>
        <div>
          <img id="fadeInMoveRight" :src="imagenSrc" class="w-[250px]" alt="img" loading="eager" />
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-[85rem] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <nav class="mx-auto grid max-w-6xl gap-y-px sm:flex sm:gap-x-4 sm:gap-y-0" aria-label="Tabs" role="tablist">
        <ProductTabBtn v-for="(tab, index) in tabs" :key="tab.id" :title="tab.title" :id="tab.id" :dataTab="tab.dataTab"
          :first="index === 0" :active="activeTab === tab.dataTab" @click="setActiveTab(tab.dataTab)" />
      </nav>

      <div class="mt-12 md:mt-16">
        <!-- Tab 1: Description -->
        <div id="tabs-with-card-1" role="tabpanel" :class="{ 'hidden': activeTab !== '#tabs-with-card-1' }">
          <div class="mx-auto max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
            <div class="grid gap-12 md:grid-cols-2">
              <div class="lg:w-3/4">
                <h2
                  class="text-balance text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:leading-tight lg:text-4xl">
                  {{ data.longDescription.longDescriptionTitle }}
                </h2>
                <p class="mt-3 text-pretty text-neutral-600 dark:text-neutral-400">
                  {{ data.longDescription.longDescriptionSubTitle }}
                </p>
                <p class="mt-5">
                  <PrimaryCTA :title="data.longDescription.btnTitle" url="/contact" />
                </p>
              </div>

              <div class="space-y-6 lg:space-y-10">
                <div v-for="list in data.descriptionList" class="flex">
                  <div>
                    <h3 class="text-base font-bold text-neutral-800 dark:text-neutral-200 sm:text-lg">
                      {{ list.title }}
                    </h3>
                    <p class="mt-1 text-neutral-600 dark:text-neutral-400">
                      {{ list.subTitle }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Specifications -->
        <div id="tabs-with-card-2" role="tabpanel" :class="{ 'hidden': activeTab !== '#tabs-with-card-2' }">
          <div class="mx-auto max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
            <div class="grid w-full grid-cols-1 gap-x-16 md:grid-cols-2">
              <div class="max-w-md space-y-6">
                <div v-for="spec in data.specificationsLeft">
                  <h3 class="block font-bold text-neutral-800 dark:text-neutral-200">
                    {{ spec.title }}
                  </h3>
                  <p class="text-neutral-600 dark:text-neutral-400">
                    {{ spec.subTitle }}
                  </p>
                </div>
              </div>
              <div class="mt-6 max-w-md space-y-6 md:ml-auto md:mt-0">
                <template v-if="data.specificationTableData">
                  <div class="mt-6 space-y-6 md:ml-auto md:mt-0">
                    <div class="flex flex-col">
                      <div class="-m-1.5 overflow-x-auto">
                        <div class="inline-block min-w-full p-1.5 align-middle">
                          <div class="overflow-hidden">
                            <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-700">
                              <thead>
                                <tr>
                                  <th v-for="header in data.specificationTableData[0].feature" scope="col"
                                    class="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-500 dark:text-neutral-500">
                                    {{ header }}
                                  </th>
                                </tr>
                              </thead>
                              <tbody class="divide-y divide-neutral-300 dark:divide-neutral-700">
                                <tr v-for="(row, rowIndex) in data.specificationTableData[0].description" :key="rowIndex">
                                  <td v-for="(cellValue, cellIndex) in row" :key="cellIndex" class="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    {{ cellValue }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: Blueprints -->
        <div id="tabs-with-card-3" role="tabpanel" :class="{ 'hidden': activeTab !== '#tabs-with-card-3' }">
          <div class="mx-auto mb-20 flex w-full md:mb-28 2xl:w-4/5">
            <div
              class="relative left-12 top-12 z-10 overflow-hidden rounded-xl shadow-lg md:left-12 md:top-16 md:-ml-12 lg:ml-0">
              <template v-if="data.blueprints?.first">
                <img :src="data.blueprints.first" class="h-full w-full object-cover object-center"
                  alt="Blueprint Illustration" />
              </template>
            </div>

            <div class="relative right-12 overflow-hidden rounded-xl shadow-xl">
              <template v-if="data.blueprints?.second">
                <img :src="data.blueprints.second" class="h-full w-full object-cover object-center"
                  alt="Blueprint Illustration" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductTabBtn from '@/components/ui/buttons/ProductTabBtn.vue';
import PrimaryCTA from '@/components/ui/buttons/PrimaryCTA.vue';
import productImageMask from '@images/product-mask-image.jpg';

export default {
  name: 'PreviewComponent',
  components: {
    ProductTabBtn,
    PrimaryCTA
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.tabs.push({ id: "tabs-with-card-item-1", title: 'Descripcion', dataTab: '#tabs-with-card-1' });
  },
  data() {
    return {
      activeTab: "",
      title: "",
      mainContent: {
        id: "",
        introduction: "",
        img: "",
        imgAlt: ""
      },
      haveSpecification: false,
      haveluePrints: false,
      tabs: [
        
      ],
      longDescription: {
        longDescriptionTitle: "",
        longDescriptionSubTitle: "",
        btnTitle: ""
      },
      descriptionList: [],
      specificationsLeft: [],
      specificationTableData: [],
      blueprints: {
        first: "@/images/blueprint-1.avif",
        second: "@/images/blueprint-2.avif"
      },
      slug: "sf-ab-a765",
    };
  },
  computed: {
    imagenSrc() {
      // Retorna la URL de la imagen seleccionada o una imagen predeterminada si no hay imagen seleccionada
      return this.data?.mainContent?.img ? this.data.mainContent.img : productImageMask.src;
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
    addTab(title, id, dataTab) {
      if (!this.tabs.some(tab => tab.id === id)) {
        this.tabs.push({ title, id, dataTab });
      }
    },
    removeTab(id) {
      this.tabs = this.tabs.filter(tab => tab.id !== id);
    }
  },
  watch: {
    data: {
      handler(newData) {
        // añade o eliminar tabs según el valor de haveSpecification y haveluePrints
        if (newData.haveSpecification) {
          this.addTab('Especificaciones', 'tabs-with-card-item-2', '#tabs-with-card-2');
        } else {
          this.removeTab('tabs-with-card-item-2');
        }
        
        if (newData.haveluePrints) {
          this.addTab('Planos', 'tabs-with-card-item-3', '#tabs-with-card-3');
        } else {
          this.removeTab('tabs-with-card-item-3');
        }
      },
      deep: true
    }
  },
};
</script>
