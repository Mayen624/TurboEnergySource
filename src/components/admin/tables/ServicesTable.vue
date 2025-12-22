<template>

    <Table
      :headers="[,'IMAGEN/ES','TITULO','DESCRIPCION','ESTADO', 'CREADO POR', 'ACTUALIZADO POR','CREADO EN', 'ACTUALZADO EN', 'ACCIONES']"
      :allowedFields="['','images','title', 'description','enabled', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt']"
      :add-button="AddButtonComponent"
      :editButton="EditButtonComponent"
      :data="services"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="limit"
      :displayData="displayServices"
      :disabledOrEnabled="disabledAndEnabledService"
      :button-props="{
        id: 'addService',
        buttonText: 'Añadir servicio',
        triggerIdBtn: 'serviceModal'
      }"
      @update:currentPage="handlePageUpdate"
      @limit-changed="handleLimitChange"
      @edit-row="handleEditService"
    />

      <ServiceModal id="serviceModal" modalTitle="Nuevo servicio" />
      <ServiceEditModal id="serviceEditModal" modalTitle="Actualizar servicio" :serviceId="selectedServiceId" />
    </template>

    <script>
      import { defineComponent, markRaw } from 'vue';
      import Table from '@/components/ui/tables/Table.vue';
      import AddButton from '@components/admin/buttons/AddButton.vue';
      import EditButton from '@components/admin/buttons/EditButton.vue';
      import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
      import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
      import ServiceModal from '@components/admin/forms/ServiceModal.vue';
      import ServiceEditModal from '@components/admin/forms/ServiceEditModal.vue';
      import {successToast, errorToast} from '@utils/notify.ts'
      import {enabledOrDisabledService} from '@/API/pushData.ts'
      import { getCookie } from '@/utils/functions.ts';
      import {getServices} from "@/API/fetchData.ts";

      export default defineComponent({
        components: {
          AddButton,
          EditButton,
          DisabledButton,
          WarningAlert,
          ServiceModal,
          ServiceEditModal,
          Table
        },
        data() {
          return {
            services: [],
            totalPages: 1,
            currentPage: 1,
            limit: 10,
            selectedServiceId: null,
            AddButtonComponent: markRaw(AddButton),
            EditButtonComponent: markRaw(EditButton)
          };
        },
        mounted() {
          this.displayServices();
        },
        methods: {
          handlePageUpdate(newPage) {
            this.currentPage = newPage; 
          },
          handleLimitChange(newLimit) {
            this.limit = newLimit;
            this.displayProducts(this.currentPage, this.limit);
          },
          async displayServices(page = 1, limit = 10) {
            const data = await getServices(page, limit);
            // console.log(data)
            if (data.error) {
              errorToast('¡Error!', data.error);
            } else {
              this.services = data.services;
              this.currentPage = page;
              this.totalPages = data.totalPages;
            }

          },
          async disabledAndEnabledService(id, enabled){
            if(!id){
              errorToast('¡Error!', 'Registro no valido')
            }else{
              console.log(id, enabled)
              const res = await enabledOrDisabledService(id, enabled);

              if(res.error){
                errorToast('¡Error!', res.error);
              }else if(res.success){
                successToast('¡Exito!', res.success);
                setTimeout(() => {
                  location.reload();
                }, 4000);
              }
            }
          },
          handleEditService(serviceId) {
            this.selectedServiceId = serviceId;
            // Abrir el modal usando HSOverlay
            setTimeout(() => {
              const modalTrigger = document.querySelector('[data-hs-overlay="#serviceEditModal"]');
              if (modalTrigger) {
                modalTrigger.click();
              } else {
                window.HSOverlay.open(document.getElementById('serviceEditModal'));
              }
            }, 100);
          }

        }
      });
    </script>
    
    