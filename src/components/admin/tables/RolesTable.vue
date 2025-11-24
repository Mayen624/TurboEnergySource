<template>
    <Table
      :headers="['#','NOMBRE','DESCRIPCION','ESTADO', 'CREADO EN', 'ACTUALIZADO EN', 'ACCIONES']"
      :allowedFields="['_id','name', 'description', 'enabled', 'createdAt', 'updatedAt']"
      :add-button="AddButtonComponent"
      :editButton="EditButtonComponent"
      :data="roles"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="limit"
      :displayData="displayRoles"
      :disabledOrEnabled="disabledAndEnabledRole"
      :button-props="{
        id: 'addRole',
        buttonText: 'Nueva role',
        triggerIdBtn: 'roleModal'
      }"
      @update:currentPage="handlePageUpdate"
      @limit-changed="handleLimitChange"
      @edit-row="handleEditRole"
    />

    <RoleModal id="roleModal" modalTitle="Nuevo role" />
    <RoleEditModal id="roleEditModal" modalTitle="Actualizar role" :roleId="selectedRoleId" />
  </template>
  
  <script>
    import { defineComponent, markRaw } from 'vue';
    import Table from '@components/ui/tables/Table.vue';
    import AddButton from '@components/admin/buttons/AddButton.vue';
    import EditButton from '@components/admin/buttons/EditButton.vue';
    import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
    import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
    import RoleModal from '@components/admin/forms/RoleModal.vue';
    import RoleEditModal from '@components/admin/forms/RoleEditModal.vue';
    import {successToast, errorToast} from '@utils/notify.ts'
    import {enabledOrDisabledRole} from '@/API/pushData.ts'
    import { getCookie } from '@/utils/functions.ts';
    import { getApiUrl } from "@/utils/utils";
    import {getRoles} from "@/API/fetchData.ts";

    export default defineComponent({
      props: {
        titleCard: {type: String, required: true},
      },
      components: {
        AddButton,
        EditButton,
        DisabledButton,
        WarningAlert,
        RoleModal,
        RoleEditModal,
        Table
      },
      data() {
        return {
          roles: [],
          totalPages: 1,
          currentPage: 1,
          limit: 10,
          selectedRoleId: null,
          AddButtonComponent: markRaw(AddButton),
          EditButtonComponent: markRaw(EditButton)
        };
      },
      mounted() {
        this.displayRoles();
      },
      methods: {
        handlePageUpdate(newPage) {
          this.currentPage = newPage; // Actualiza la página en el padre
        },
        handleLimitChange(newLimit) {
          this.limit = newLimit;
          this.displayRoles(this.currentPage, this.limit); // Actualiza los datos con el nuevo límite
        },
        async displayRoles(page = 1, limit = 10) {
          const roles = await getRoles(page, limit);
          if (roles.error) {
            errorToast('¡Error!', roles.error);
          } else {
            this.roles = roles.roles;
            this.currentPage = page;
            this.totalPages = roles.totalPages;
          }
        
        },
        async disabledAndEnabledRole(id, enabled){
          if(!id){
              errorToast('¡Error!', 'Registro no valido')
          }else{
            const res = await enabledOrDisabledRole(id, enabled);

            if(res.error){
              errorToast('¡Error!', res.error);
            }else if(res.success){
              successToast('¡Exito!', res.success);
            }
          }

          setTimeout(() => {
            location.reload();
          }, 4000);
        },
        handleEditRole(roleId) {
          this.selectedRoleId = roleId;
          // Abrir el modal usando HSOverlay
          setTimeout(() => {
            const modalTrigger = document.querySelector('[data-hs-overlay="#roleEditModal"]');
            if (modalTrigger) {
              modalTrigger.click();
            } else {
              window.HSOverlay.open(document.getElementById('roleEditModal'));
            }
          }, 100);
        }
      }
    });
  </script>
  
  