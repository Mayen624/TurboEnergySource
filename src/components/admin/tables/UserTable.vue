<template>

<Table
    :headers="['#','NOMBRE Y CORREO','ESTADO','CREADO EN','ACTUALIZADO EN','ACCIONES']"
    :allowedFields="['_id','fullNameEmail','enabled','createdAt','updatedAt']"
    :add-button="AddButtonComponent"
    :data="users"
    :currentPage="currentPage" 
    :totalPages="totalPages"   
    :itemsPerPage="limit"  
    :displayData="initEventSource"
    :disabledOrEnabled="disabledAndEnabledUser"
    :button-props="{
      id: 'addUser',
      buttonText: 'Añadir usuario',
      triggerIdBtn: 'userModal'
    }"
    @update:currentPage="handlePageUpdate"
    @limit-changed="handleLimitChange"
  />

  <UserModal id="userModal" modalTitle="Nuevo usuario" />
  <!-- <UserEditModal id="userEditModal" modalTitle="Actualizar usuario" /> -->
</template>

<script>
  import { defineComponent } from 'vue';
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
  import { getApiUrl } from "@/utils/utils";

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
        AddButtonComponent: AddButton
      };
    },
    mounted() {
      this.initEventSource();
    },
    methods: {
      handlePageUpdate(newPage) {
        this.currentPage = newPage; 
      },
      handleLimitChange(newLimit) {
        this.limit = newLimit;
        this.displayProducts(this.currentPage, this.limit);
      },
      initEventSource(page = 1, limit = 10) {
        const token = getCookie('authToken');
        const eventSource = new EventSource(`${getApiUrl()}/v1/users/realtime_users?token=${encodeURIComponent(token)}&page=${page}&limit=${limit}`);

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);

          this.users = data.data.map(user => ({
            ...user,
            fullNameEmail: `${user.name}/${user.email}` // Combina nombre y correo
          }));
          this.currentPage = data.page;
          this.totalPages = data.totalPages;
        };
      },
      async disabledAndEnabledUser(id, enabled){
        const token = getCookie('authToken');

          if(!id){
            errorToast('¡Error!', 'Registro no valido')
          }else{
            const res = await enabledOrDisabledUser(id, enabled, token);
            
            if(res.error){
              errorToast('¡Error!', res.error);
            }else if(res.success){
              successToast('¡Exito!', res.success);
            }
          }
      }
    }
  });
</script>

