<template>

<Table
    :headers="['#','NOMBRE Y CORREO','ESTADO','CREADO EN','ACTUALIZADO EN','ACCIONES']"
    :allowedFields="['_id','fullNameEmail','enabled','createdAt','updatedAt']"
    :addButton="AddButtonComponent"
    :editButton="EditButtonComponent"
    :data="users"
    :currentPage="currentPage"
    :totalPages="totalPages"
    :itemsPerPage="limit"
    :displayData="fetchUsers"
    :disabledOrEnabled="disabledAndEnabledUser"
    :button-props="{
      id: 'addUser',
      buttonText: 'Añadir usuario',
      triggerIdBtn: 'userModal'
    }"
    @update:currentPage="handlePageUpdate"
    @limit-changed="handleLimitChange"
    @edit-row="handleEditUser"
  />

  <UserModal id="userModal" modalTitle="Nuevo usuario" />
  <UserEditModal id="userEditModal" modalTitle="Actualizar usuario" :userId="selectedUserId" />
</template>

<script>
  import { defineComponent, markRaw } from 'vue';
  import Table from '@/components/ui/tables/Table.vue';
  import AddButton from '@components/admin/buttons/AddButton.vue';
  import EditButton from '@components/admin/buttons/EditButton.vue';
  import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
  import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
  import UserModal from '@components/admin/forms/UserModal.vue';
  import UserEditModal from '@components/admin/forms/UserEditModal.vue';
  import {successToast, errorToast} from '@utils/notify.ts'
  import {enabledOrDisabledUser} from '@/API/pushData.ts'
  import { getCookie } from '@/utils/functions.ts';
  import { apiGet } from "@/utils/api";

  export default defineComponent({
    props: {
      titleCard: {type: String, required: true},
    },
    components: {
      AddButton,
      EditButton,
      DisabledButton,
      WarningAlert,
      UserModal,
      UserEditModal,
      Table
    },
    data() {
      return {
        users: [],
        totalPages: 1,
        currentPage: 1,
        limit: 10,
        pollingInterval: null,
        selectedUserId: null,
        AddButtonComponent: markRaw(AddButton),
        EditButtonComponent: markRaw(EditButton)
      };
    },
    mounted() {
      this.initPolling(this.currentPage, this.limit);
    },
    beforeUnmount() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
      }
    },
    methods: {
      handlePageUpdate(newPage) {
        this.currentPage = newPage; 
      },
      handleLimitChange(newLimit) {
        this.limit = newLimit;
        this.fetchUsers(this.currentPage, this.limit);
      },
      async fetchUsers(page = 1, limit = 10) {
        try {
          const response = await apiGet(`/v1/users?page=${page}&limit=${limit}`);
          const data = await response.json();

          if (data.error) {
            errorToast('Error', data.error);
            return;
          }

          if (data.users && Array.isArray(data.users)) {
            this.users = data.users.map(user => ({
              ...user,
              fullNameEmail: `${user.name}/${user.email}`
            }));
            this.currentPage = data.currentPage;
            this.totalPages = data.totalPages;
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          errorToast('Error', 'Error al cargar usuarios');
        }
      },

      initPolling(page = 1, limit = 10) {
        // Cargar datos iniciales
        this.fetchUsers(page, limit);

        // Actualizar cada 5 segundos
        this.pollingInterval = setInterval(() => {
          this.fetchUsers(this.currentPage, this.limit);
        }, 5000);
      },
      async disabledAndEnabledUser(id, enabled){
          if(!id){
            errorToast('¡Error!', 'Registro no valido')
          }else{
            const res = await enabledOrDisabledUser(id, enabled);

            if(res.error){
              errorToast('¡Error!', res.error);
            }else if(res.success){
              successToast('¡Exito!', res.success);
            }
          }
      },
      handleEditUser(userId) {
        this.selectedUserId = userId;
        // Abrir el modal usando HSOverlay
        setTimeout(() => {
          const modalTrigger = document.querySelector('[data-hs-overlay="#userEditModal"]');
          if (modalTrigger) {
            modalTrigger.click();
          } else {
            // Si no hay botón trigger, abrir manualmente
            window.HSOverlay.open(document.getElementById('userEditModal'));
          }
        }, 100);
      }
    }
  });
</script>

