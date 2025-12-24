<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Configuración del Sistema
      </h2>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Administra las configuraciones generales del sistema como idioma y zona horaria.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Language Selection -->
      <div>
        <label for="language" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Idioma del Sistema
        </label>
        <select
          id="language"
          v-model="formData.language"
          class="py-3 px-4 block w-full md:w-1/2 border-neutral-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Selecciona el idioma principal del sistema
        </p>
      </div>

      <!-- Timezone Selection -->
      <div>
        <label for="timezone" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Zona Horaria
        </label>
        <select
          id="timezone"
          v-model="formData.timezone"
          class="py-3 px-4 block w-full md:w-1/2 border-neutral-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        >
          <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
          <option value="America/New_York">Nueva York (GMT-5)</option>
          <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
          <option value="America/Chicago">Chicago (GMT-6)</option>
          <option value="America/Denver">Denver (GMT-7)</option>
          <option value="Europe/Madrid">Madrid (GMT+1)</option>
          <option value="Europe/London">Londres (GMT+0)</option>
          <option value="Asia/Tokyo">Tokio (GMT+9)</option>
        </select>
        <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Configura la zona horaria para el sistema
        </p>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <button
          type="submit"
          :disabled="saving"
          class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-600 text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg v-if="saving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ saving ? 'Guardando...' : 'Guardar Configuración' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { updateSettings } from '@/API/pushData';

interface Props {
  settings: any;
  saving: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update']);

const formData = ref({
  language: 'es',
  timezone: 'America/Mexico_City'
});

// Watch for settings changes
watch(() => props.settings, (newSettings) => {
  if (newSettings?.system) {
    formData.value.language = newSettings.system.language || 'es';
    formData.value.timezone = newSettings.system.timezone || 'America/Mexico_City';
  }
}, { immediate: true });

const handleSubmit = async () => {
  try {
    const response = await updateSettings({
      system: {
        language: formData.value.language,
        timezone: formData.value.timezone
      }
    });

    if (response.error) {
      emit('update', false, response.error);
    } else {
      emit('update', true);
    }
  } catch (error) {
    console.error('Error updating system settings:', error);
    emit('update', false, 'Error al guardar la configuración del sistema');
  }
};
</script>
