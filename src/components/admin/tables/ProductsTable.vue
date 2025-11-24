<template>

  <Table
    :headers="['#','IMAGEN','TITULO','DESCRIPCION','ESTADO', 'CREADO POR', 'ACTUALIZADO POR','CREADO EN', 'ACTUALZADO EN', 'ACCIONES']"
    :allowedFields="['_id','mainContent','title', 'description','enabled', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt']"
    :add-button="AddButtonComponent"
    :edit-button="EditButtonComponent"
    :data="products"
    :currentPage="currentPage"
    :totalPages="totalPages"
    :itemsPerPage="limit"
    :displayData="displayProducts"
    :disabledOrEnabled="disabledAndEnabledProduct"
    :button-props="{
      id: 'addProduct',
      buttonText: 'Nuevo product',
      triggerIdBtn: 'productModal'
    }"
    @update:currentPage="handlePageUpdate"
    @limit-changed="handleLimitChange"
    @edit-row="handleEditProduct"
  />

    <ProductModal id="productModal" modalTitle="Nuevo producto" />
    <ProductEditModal id="productEditModal" modalTitle="Editar producto" :productId="selectedProductId" />
  </template>
  
  <script>
    import { defineComponent, markRaw } from 'vue';
    import Table from '@/components/ui/tables/Table.vue';
    import AddButton from '@components/admin/buttons/AddButton.vue';
    import EditButton from '@components/admin/buttons/EditButton.vue';
    import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
    import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
    import ProductModal from '@components/admin/forms/ProductModal.vue';
    import ProductEditModal from '@components/admin/forms/ProductEditModal.vue';
    import {successToast, errorToast} from '@utils/notify.ts'
    import {enabledOrDisabledProduct} from '@/API/pushData.ts'
    import { getCookie } from '@/utils/functions.ts';
    import { getApiUrl } from "@/utils/utils";
    import {getProducts} from "@/API/fetchData.ts";

    export default defineComponent({
      props: {
        titleCard: {type: String, required: true},
      },
      components: {
        AddButton,
        EditButton,
        DisabledButton,
        WarningAlert,
        ProductModal,
        ProductEditModal,
        Table
      },
      data() {
        return {
          products: [],
          totalPages: 1,
          currentPage: 1,
          limit: 10,
          AddButtonComponent: markRaw(AddButton),
          EditButtonComponent: markRaw(EditButton),
          selectedProductId: null
        };
      },
      mounted() {
        this.displayProducts();
      },
      methods: {
        handlePageUpdate(newPage) {
          this.currentPage = newPage; 
        },
        handleLimitChange(newLimit) {
          this.limit = newLimit;
          this.displayProducts(this.currentPage, this.limit);
        },
        async displayProducts(page = 1, limit = 10) {
          const products = await getProducts(page, limit);
          if (products.error) {
            errorToast('¡Error!', actions.error);
          } else {
            this.products = products.products;
            this.currentPage = page;
            this.totalPages = products.totalPages;
          }
        
        },
        async disabledAndEnabledProduct(id, enabled){
          if(!id){
            errorToast('¡Error!', 'Registro no valido')
          }else{
            console.log(id, enabled)
            const res = await enabledOrDisabledProduct(id, enabled);

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
        handleEditProduct(productId) {
          this.selectedProductId = productId;
          setTimeout(() => {
            window.HSOverlay.open(document.getElementById('productEditModal'));
          }, 100);
        }

      }
    });
  </script>
  
  