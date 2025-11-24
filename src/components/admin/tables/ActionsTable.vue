<template>
  <Table
    :headers="['#','NOMBRE','DESCRIPCION','ESTADO', 'CREADO EN', 'ACTUALIZADO EN', 'ACCIONES']"
    :allowedFields="['_id','name', 'description', 'enabled', 'createdAt', 'updatedAt']"
    :add-button="AddButtonComponent"
    :editButton="EditButtonComponent"
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
    @edit-row="handleEditAction"
  />

  <ActionsModal id="actionModal" modalTitle="Nueva acción" />
  <ActionEditModal id="actionEditModal" modalTitle="Actualizar acción" :actionId="selectedActionId" />
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import Table from '@/components/ui/tables/Table.vue';
import AddButton from '@components/admin/buttons/AddButton.vue';
import EditButton from '@components/admin/buttons/EditButton.vue';
import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
import ActionsModal from '@components/admin/forms/ActionsModal.vue';
import ActionEditModal from '@components/admin/forms/ActionEditModal.vue';
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
    ActionEditModal,
    Table
  },
  data() {
    return {
      actions: [],
      totalPages: 1,
      currentPage: 1,
      limit: 10,
      selectedActionId: null,
      AddButtonComponent: markRaw(AddButton),
      EditButtonComponent: markRaw(EditButton)
    };
  },
  mounted() {
    this.displayActions();
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
      const actions = await getActions(page, limit);
  
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

      if(!id){
        return errorToast('¡Error!', 'Registro no valido')
      }else{
        const res = await enabledOrDisabledAction(id, enabled);

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
    handleEditAction(actionId) {
      this.selectedActionId = actionId;
      // Abrir el modal usando HSOverlay
      setTimeout(() => {
        const modalTrigger = document.querySelector('[data-hs-overlay="#actionEditModal"]');
        if (modalTrigger) {
          modalTrigger.click();
        } else {
          window.HSOverlay.open(document.getElementById('actionEditModal'));
        }
      }, 100);
    }
  }
});
</script>