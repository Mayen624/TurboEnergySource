<template>
    <div>
      <svg
        v-if="icon"
        :class="icon.class"
        :height="icon.height"
        :viewBox="icon.viewBox"
        :width="icon.width"
        :fill="icon.fill"
        :clip-rule="icon.clipRule"
        :fill-rule="icon.fillRule"
        :stroke="icon.stroke"
        :stroke-width="icon.strokeWidth"
        :stroke-linecap="icon.strokeLinecap"
        :stroke-linejoin="icon.strokeLinejoin"
      >
        <title>{{ icon.title }}</title>
        <path v-for="(path, index) in paths" :key="index" :d="path.d" :class="path.class || ''" />
      </svg>
      <span v-else>Icon not found</span>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Icons } from './icons'; // Asegúrate de que la ruta sea correcta
  
  interface Path {
    d: string;
    class?: string;
  }
  
  export default defineComponent({
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      // Obtener el icono según el nombre proporcionado
      const icon = (Icons as any)[props.name] || {};
      const paths: Path[] = icon.paths || [];
  
      return {
        icon,
        paths,
      };
    },
  });
  </script>
  