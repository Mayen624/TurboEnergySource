<template>
  <Table
    :headers="['#','NOMBRE','DESCRIPCION','ESTADO', 'CREADO EN', 'ACTUALIZADO EN', 'ACCIONES']"
    :allowedFields="['_id','name', 'description', 'enabled', 'createdAt', 'updatedAt']"
    :add-button="AddButtonComponent"
    :data="actions"
    :currentPage="currentPage" 
    :totalPages="totalPages"   
    :itemsPerPage="limit"  
    :displayData="displayActions"
    :disabledOrEnabled="disabledAndEnabledAction"
    :button-props="{
      id: 'addAction',
      buttonText: 'Nueva acción',
      triggerIdBtn: 'actionModal'
    }"
    @update:currentPage="handlePageUpdate"
    @limit-changed="handleLimitChange"
  />
  
  <ActionsModal id="actionModal" modalTitle="Nueva acción" />
</template>

<script>
import { defineComponent } from 'vue';
import Table from '@/components/ui/tables/Table.vue';
import AddButton from '@components/admin/buttons/AddButton.vue';
import EditButton from '@components/admin/buttons/EditButton.vue';
import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
import ActionsModal from '@components/admin/forms/ActionsModal.vue';
import UserEditModal from '@components/admin/forms/UserEditModal.vue';
import {successToast, errorToast} from '@utils/notify.ts';
import {enabledOrDisabledAction} from '@/API/pushData.ts';
import { getCookie } from '@/utils/functions.ts';
import {getActions} from "@/API/fetchData.ts";

export default defineComponent({
  props: {
    titleCard: {type: String, required: true},
  },
  components: {
    AddButton,
    EditButton,
    DisabledButton,
    WarningAlert,
    ActionsModal,
    UserEditModal,
    Table
  },
  data() {
    return {
      actions: [],
      totalPages: 1,
      currentPage: 1,
      limit: 10,
      AddButtonComponent: AddButton
    };
  },
  mounted() {
    this.displayActions();
    console.log()
  },
  methods: {

    handlePageUpdate(newPage) {
      this.currentPage = newPage; // Actualiza la página en el padre
    },
    handleLimitChange(newLimit) {
      this.limit = newLimit;
      this.displayActions(this.currentPage, this.limit); // Actualiza los datos con el nuevo límite
    },

    async displayActions(page = 1, limit = 10) {
      const token = getCookie('authToken');
      
      const actions = await getActions(token, page, limit);
  
      if (actions.error) {
        errorToast('¡Error!', actions.error);
      } else {
        this.actions = actions.actions;
        this.currentPage = page;
        this.totalPages = actions.totalPages;
      }
    },
    
    async disabledAndEnabledAction(id, enabled){
      console.log(id,enabled)
      const token = getCookie('authToken');

      if(!id){
        return errorToast('¡Error!', 'Registro no valido')
      }else{
        const res = await enabledOrDisabledAction(id, enabled, token);
          
        if(res.error){
          errorToast('¡Error!', res.error);
        }else if(res.success){
          successToast('¡Exito!', res.success);
        }
      }

      setTimeout(() => {
        location.reload();  
      }, 4000);
    }
  }
});
</script>