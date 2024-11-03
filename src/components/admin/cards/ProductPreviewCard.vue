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
          <h1 class="block text-4xl font-bold tracking-tighter text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl lg:text-7xl">
            {{ data.title }}
          </h1>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ data.description }}
          </p>
        </div>
        <div>
          <img  id="fadeInMoveRight" :src="mainContent.img" class="w-[250px]" alt="img" loading="eager" />
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-[85rem] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <nav class="mx-auto grid max-w-6xl gap-y-px sm:flex sm:gap-x-4 sm:gap-y-0" aria-label="Tabs" role="tablist">
        <ProductTabBtn v-for="(tab, index) in tabs"
          :key="tab.id" 
          :title="tab.title" 
          :id="tab.id" 
          :dataTab="tab.dataTab"
          :first="index === 0" />
      </nav>

      <div class="mt-12 md:mt-16">
        <div id="tabs-with-card-1" role="tabpanel">
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
                  <PrimaryCTA :title="data.longDescription.btnTitle" :url="data.longDescription.btnURL" />
                </p>
              </div>

              <div class="space-y-6 lg:space-y-10">
                <div v-for="list in descriptionList" :key="list.title" class="flex">
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

        <div id="tabs-with-card-2" class="hidden" role="tabpanel">
          <div class="mx-auto max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
            <div class="grid w-full grid-cols-1 gap-x-16 md:grid-cols-2">
              <div class="max-w-md space-y-6">
                <div v-for="spec in specificationsLeft" :key="spec.title">
                  <h3 class="block font-bold text-neutral-800 dark:text-neutral-200">
                    {{ spec.title }}
                  </h3>
                  <p class="text-neutral-600 dark:text-neutral-400">
                    {{ spec.subTitle }}
                  </p>
                </div>
              </div>
              <div class="mt-6 max-w-md space-y-6 md:ml-auto md:mt-0">
                <template v-if="specificationsRight">
                  <div v-for="spec in specificationsRight" :key="spec.title">
                    <h3 class="block font-bold text-neutral-800 dark:text-neutral-200">
                      {{ spec.title }}
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400">
                      {{ spec.subTitle }}
                    </p>
                  </div>
                </template>
                <template v-else-if="tableData">
                  <div class="mt-6 space-y-6 md:ml-auto md:mt-0">
                    <div class="flex flex-col">
                      <div class="-m-1.5 overflow-x-auto">
                        <div class="inline-block min-w-full p-1.5 align-middle">
                          <div class="overflow-hidden">
                            <table class="min-w-full divide-y divide-neutral-300 dark:divide-neutral-700">
                              <thead>
                                <tr>
                                  <th v-for="header in tableData[0].feature" :key="header" scope="col"
                                    class="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-500 dark:text-neutral-500">
                                    {{ header }}
                                  </th>
                                </tr>
                              </thead>
                              <tbody class="divide-y divide-neutral-300 dark:divide-neutral-700">
                                <tr v-for="row in tableData" :key="row.description">
                                  <td v-for="cellValue in row.description" :key="cellValue"
                                    class="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
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
      </div>
    </div>

    <!-- <div id="tabs-with-card-3" class="hidden" role="tabpanel">
      <div class="mx-auto mb-20 flex w-full md:mb-28 2xl:w-4/5">
        <div
          class="relative left-12 top-12 z-10 overflow-hidden rounded-xl shadow-lg md:left-12 md:top-16 md:-ml-12 lg:ml-0">
          <template v-if="blueprints.first">
            <Image :src="blueprints.first" class="h-full w-full object-cover object-center" alt="Blueprint Illustration"
              format="avif" />
          </template>
        </div>

        <div class="relative right-12 overflow-hidden rounded-xl shadow-xl">
          <template v-if="blueprints.second">
            <Image :src="blueprints.second" class="h-full w-full object-cover object-center"
              alt="Blueprint Illustration" format="avif" />
          </template>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

  import ProductTabBtn from '@/components/ui/buttons/ProductTabBtn.vue';
  import PrimaryCTA from '@/components/ui/buttons/PrimaryCTA.vue';

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
      console.log()
    },
    data() {
      return {
        title: "",
        description: "",
        mainContent: {
          id: "",
          introduction: "",
          img: "",
          imgAlt: ""
        },
        haveSpecification: false,
        haveluePrints: false,
        tabs: [
          // {
          //   id: "tabs-with-card-item-1",
          //   dataTab: "#tabs-with-card-1",
          //   title: "Descripcion"
          // },
          // {
          //   id: "tabs-with-card-item-2",
          //   dataTab: "#tabs-with-card-2",
          //   title: "Specifications"
          // }
        ],
        longDescription: {
          longDescriptionTitle: "",
          longDescriptionSubTitle: ""
        },
        descriptionList: [
          // {
          //   title: "descTitle",
          //   subTitle: "descSubTitle"
          // },
          // {
          //   title: "descTitle",
          //   subTitle: "descSubTitle"
          // }
        ],
        specificationsLeft: [
          // {
          //   title: "",
          //   subTitle: ""
          // },
          // {
          //   title: "",
          //   subTitle: ""
          // }
        ],
        specificationTableData: [
          {
            feature: ["Specification", "Value"],
            description: [
              ["Length (mm)", "Various"],
              ["Weight (g)", "N/A"],
              ["Material", "Stainless Steel"],
              ["Finish", "Assorted"],
              ["Package Contents", "Various screws in a set"]
            ]
          }
        ],
        blueprints: {
          first: "@/images/blueprint-1.avif",
          second: "@/images/blueprint-2.avif"
        },
        slug: "sf-ab-a765",
      };
    },
    methods: {
      setActiveTab(tabId) {
      this.activeTab = tabId;
    }
    }
  };
</script>
