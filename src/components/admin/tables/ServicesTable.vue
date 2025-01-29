<template>

    <Table
      :headers="['#','IMAGEN/ES','TITULO','DESCRIPCION','ESTADO', 'CREADO POR', 'ACTUALIZADO POR','CREADO EN', 'ACTUALZADO EN', 'ACCIONES']"
      :allowedFields="['_id','images','title', 'description','enabled', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt']"
      :add-button="AddButtonComponent"
      :data="servcices"
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
    />
    
      <ServicesModal id="serviceModal" modalTitle="Nuevo servicio" />
    </template>
    
    <script>
      import { defineComponent } from 'vue';
      import Table from '@/components/ui/tables/Table.vue';
      import AddButton from '@components/admin/buttons/AddButton.vue';
      import EditButton from '@components/admin/buttons/EditButton.vue';
      import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
      import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
      import ServicesModal from '@components/admin/forms/ServicesModal.vue';
      import UserEditModal from '@components/admin/forms/UserEditModal.vue';
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
          ServicesModal,
          UserEditModal,
          Table
        },
        data() {
          return {
            servcices: [],
            totalPages: 1,
            currentPage: 1,
            limit: 10,
            AddButtonComponent: AddButton
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
            const token = getCookie('authToken');
            
            const servcices = await getServices(token, page, limit);
            // console.log(servcices)
            if (servcices.error) {
              errorToast('¡Error!', servcices.error);
            } else {
              this.servcices = servcices.servcices;
              this.currentPage = page;
              this.totalPages = servcices.totalPages;
            }
          
          },
          async disabledAndEnabledService(id, enabled){
            const token = getCookie('authToken');
    
            if(!id){
              errorToast('¡Error!', 'Registro no valido')
            }else{
              console.log(id, enabled, token)
              const res = await enabledOrDisabledService(id, enabled, token);
                
              if(res.error){
                errorToast('¡Error!', res.error);
              }else if(res.success){
                successToast('¡Exito!', res.success);
                setTimeout(() => {
                  location.reload();  
                }, 4000);
              }
            }
          }
          
        }
      });
    </script>
    
    