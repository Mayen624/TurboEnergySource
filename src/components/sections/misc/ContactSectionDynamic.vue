<template>
  <section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <div class="mx-auto max-w-2xl lg:max-w-5xl">
      <!-- Title and Subtitle -->
      <div class="text-center">
        <!-- Skeleton for Title -->
        <div v-if="loading" class="flex justify-center">
          <div class="h-10 w-64 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </div>
        <h1
          v-else
          class="text-balance text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight"
        >
          {{ pageData.title }}
        </h1>

        <!-- Skeleton for Subtitle -->
        <div v-if="loading" class="mt-3 flex justify-center">
          <div class="h-5 w-full max-w-xl bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        </div>
        <p v-else class="mt-1 text-pretty text-neutral-600 dark:text-neutral-400">
          {{ pageData.subTitle }}
        </p>
      </div>

      <div class="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <!-- Left Side - Form -->
        <div class="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8">
          <!-- Skeleton for Form -->
          <div v-if="loading" class="space-y-4">
            <div class="h-7 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-8"></div>
            <div class="grid grid-cols-2 gap-4">
              <div class="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <div class="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>
            <div class="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-16 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div class="h-12 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
          </div>

          <!-- Actual Form -->
          <template v-else>
            <h2 class="mb-8 text-xl font-bold text-neutral-700 dark:text-neutral-300">
              Rellene el siguiente formulario:
            </h2>
            <form id="contactForm" method="POST">
              <div class="grid gap-4">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label for="firstName" class="sr-only">Primer nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                      placeholder="Primer nombre"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="sr-only">Segundo nombre</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                      placeholder="Segundo nombre"
                    />
                  </div>
                </div>
                <div>
                  <label for="email" class="sr-only">Correo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autocomplete="email"
                    class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    placeholder="Correo"
                  />
                </div>
                <div>
                  <label for="phone" class="sr-only">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    placeholder="+0 0000000"
                  />
                </div>
                <div>
                  <label for="details" class="sr-only">Detalles</label>
                  <textarea
                    id="details"
                    name="details"
                    rows="4"
                    class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    placeholder="Detalles..."
                  ></textarea>
                </div>
              </div>

              <div class="mt-4 grid">
                <div class="g-recaptcha" :data-sitekey="reCaptchaKey" data-action="submit_contact_form"></div>
              </div>

              <div class="mt-4 grid">
                <button
                  type="button"
                  id="authBtn"
                  @click="submitForm"
                  class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-yellow-400 px-4 py-3 text-sm font-bold text-neutral-700 outline-none ring-zinc-500 transition duration-300 hover:bg-yellow-500 focus-visible:ring dark:ring-zinc-200 dark:focus:outline-none"
                >
                  Enviar
                </button>
              </div>

              <div class="mt-3 text-center">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Lo contactaremos en 1-2 días hábiles.
                </p>
              </div>
            </form>
          </template>
        </div>

        <!-- Right Side - Contact Blocks -->
        <div class="divide-y divide-neutral-300 dark:divide-neutral-700">
          <!-- Skeleton for Contact Blocks -->
          <template v-if="loading">
            <div v-for="i in 4" :key="i" class="flex gap-x-7 py-6">
              <div class="h-6 w-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse shrink-0"></div>
              <div class="grow space-y-2">
                <div class="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div class="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
            </div>
          </template>

          <!-- Actual Contact Blocks -->
          <template v-else>
            <!-- Knowledge Base -->
            <div class="flex gap-x-7 py-6">
              <svg class="mt-1.5 size-6 shrink-0 text-neutral-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <div class="grow">
                <h3 class="font-bold text-neutral-800 dark:text-neutral-200">
                  {{ pageData.knowledgeBase?.heading }}
                </h3>
                <p class="mt-1 text-sm text-neutral-500">
                  {{ pageData.knowledgeBase?.content }}
                </p>
                <a
                  class="group mt-2 inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-zinc-600 outline-none ring-zinc-500 transition duration-300 hover:text-zinc-800 focus-visible:ring dark:text-zinc-400 dark:ring-zinc-200 dark:hover:text-zinc-200 dark:focus:outline-none dark:focus:ring-1"
                  href="#"
                >
                  {{ pageData.knowledgeBase?.linkTitle }}
                  <svg class="size-4 transition duration-300 ease-in-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- FAQ -->
            <div class="flex gap-x-7 py-6">
              <svg class="mt-1.5 size-6 shrink-0 text-neutral-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
              <div class="grow">
                <h3 class="font-bold text-neutral-800 dark:text-neutral-200">
                  {{ pageData.faq?.heading }}
                </h3>
                <p class="mt-1 text-sm text-neutral-500">
                  {{ pageData.faq?.content }}
                </p>
                <a
                  class="group mt-2 inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-zinc-600 outline-none ring-zinc-500 transition duration-300 hover:text-zinc-800 focus-visible:ring dark:text-zinc-400 dark:ring-zinc-200 dark:hover:text-zinc-200 dark:focus:outline-none dark:focus:ring-1"
                  href="#"
                >
                  {{ pageData.faq?.linkTitle }}
                  <svg class="size-4 transition duration-300 ease-in-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Office -->
            <div class="flex gap-x-7 py-6">
              <svg class="mt-1.5 size-6 shrink-0 text-neutral-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div class="grow">
                <h3 class="font-bold text-neutral-800 dark:text-neutral-200">
                  {{ pageData.office?.heading }}
                </h3>
                <p class="mt-1 text-sm text-neutral-500">
                  {{ pageData.office?.content }}
                </p>
                <address class="mt-1 text-sm not-italic text-neutral-500">
                  {{ pageData.office?.address }}
                </address>
              </div>
            </div>

            <!-- Email -->
            <div class="flex gap-x-7 py-6">
              <svg class="mt-1.5 size-6 shrink-0 text-neutral-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"></path>
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path>
              </svg>
              <div class="grow">
                <h3 class="font-bold text-neutral-800 dark:text-neutral-200">
                  {{ pageData.email?.heading }}
                </h3>
                <p class="mt-1 text-sm text-neutral-500">
                  {{ pageData.email?.content }}
                </p>
                <a
                  class="group mt-2 inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-zinc-600 outline-none ring-zinc-500 transition duration-300 hover:text-zinc-800 focus-visible:ring dark:text-zinc-400 dark:ring-zinc-200 dark:hover:text-zinc-200 dark:focus:outline-none dark:focus:ring-1"
                  :href="`mailto:${pageData.email?.emailAddress}`"
                >
                  {{ pageData.email?.emailAddress }}
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { getPublicContactPage } from '@/API/fetchData';
import { sendContactForm } from '@/API/pushData';
import { errorToast, successToast } from '@/utils/notify';
import { isFormDataEmpty, checkContactFormData } from '@/utils/functions';

const props = defineProps<{
  reCaptchaKey: string;
}>();

const loading = ref(true);
const pageData = ref({
  title: '',
  subTitle: '',
  knowledgeBase: {
    heading: '',
    content: '',
    linkTitle: ''
  },
  faq: {
    heading: '',
    content: '',
    linkTitle: ''
  },
  office: {
    heading: '',
    content: '',
    address: ''
  },
  email: {
    heading: '',
    content: '',
    emailAddress: ''
  }
});

declare const grecaptcha: any;

// Render reCAPTCHA explicitly after form is visible
const initRecaptcha = () => {
  const recaptchaDiv = document.querySelector('.g-recaptcha');
  if (recaptchaDiv && typeof grecaptcha !== 'undefined' && grecaptcha.render) {
    // Check if already rendered
    if (recaptchaDiv.childElementCount === 0) {
      try {
        grecaptcha.render(recaptchaDiv, {
          sitekey: props.reCaptchaKey
        });
      } catch (e) {
        // Already rendered
      }
    }
  }
};

// Watch for loading to complete and init reCAPTCHA
watch(loading, async (newVal) => {
  if (!newVal) {
    await nextTick();
    // Wait for grecaptcha to be available
    const waitForRecaptcha = setInterval(() => {
      if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
        clearInterval(waitForRecaptcha);
        initRecaptcha();
      }
    }, 100);
    // Clear interval after 10 seconds to prevent infinite loop
    setTimeout(() => clearInterval(waitForRecaptcha), 10000);
  }
});

onMounted(async () => {
  try {
    const data = await getPublicContactPage();
    if (data && !data.error) {
      pageData.value = data;
    }
  } catch (err) {
    console.error('Error loading contact page:', err);
  } finally {
    loading.value = false;
  }
});

const submitForm = async () => {
  const form = document.getElementById('contactForm') as HTMLFormElement;

  if (!form) {
    return errorToast("Error!", "Ha ocurrido un error inesperado.");
  }

  const formData = new FormData(form);
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const details = formData.get('details') as string;

  // Check reCAPTCHA
  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse) {
    return errorToast("Error", "Por favor, complete el reCAPTCHA.", undefined, true, false);
  }

  // Check empty fields
  if (isFormDataEmpty(formData)) {
    grecaptcha.reset();
    return errorToast("Error", "Todos los campos son requeridos.", undefined, true, false);
  }

  // Full validation
  const validation = checkContactFormData(firstName, lastName, email, phone, details);

  if (!validation.isValid) {
    grecaptcha.reset();
    const errorList = validation.errors.join('\n• ');
    return errorToast("Corrija lo siguiente:", `• ${errorList}`, undefined, true, false);
  }

  // Send form
  const data = {
    firstName,
    lastName,
    email,
    phone,
    details,
    captchaResponse
  };

  try {
    const res = await sendContactForm(data);

    if (res.success) {
      grecaptcha.reset();
      form.reset();
      return successToast("Solicitud enviada!", res.success);
    } else if (res.error) {
      grecaptcha.reset();
      return errorToast("Ha ocurrido un error inesperado!", res.error);
    }
  } catch (e) {
    const errorMessage = (e as Error).message;
    grecaptcha.reset();
    return errorToast("Ha ocurrido un error inesperado!", errorMessage);
  }
};
</script>
