<style>
.truncate-id {
    max-width: 100px; /* Ajusta según lo necesario */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

<template>
    <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
            <div class="inline-block min-w-full p-1.5 align-middle">
                <div
                    class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                    <!-- Header -->
                    <div
                        class="grid gap-3 border-b border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
                        <div class="flex justify-between gap-2">
                            <ComboBoxNumber v-model="selectedLimit" @change="onChange" :options="limit"
                                style="width: 65px;" />
                            <input v-model="filterText" type="text" placeholder="Filtrar..."
                                class="px-3 py-2 border rounded-md text-sm text-gray-800 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700" />
                        </div>
                        <div v-if="addButton">
                            <div class="inline-flex gap-x-2">
                                <!-- Renderizar el botón dinámico -->
                                <component :is="addButton" v-bind="buttonProps" />
                            </div>
                        </div>
                    </div>
                    <!-- End Header -->

                    <!-- Table -->
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead class="bg-gray-50 dark:bg-neutral-800">
                            <tr>
                                <!-- <th scope="col" class="py-3 ps-6 text-start dark:text-neutral-200">#</th> -->
                                <th v-for="(header, index) in headers" :key="index" class="px-6 py-3 text-start">
                                    <div class="flex items-center gap-x-2">
                                        <span
                                            class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            {{ header }}
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                            <tr v-if="data.length === 0">
                                <td :colspan="headers.length + 1" class="px-6 py-3 text-center">
                                    <WarningAlert title="Error al obtener registros:" subTitle="No hay datos disponibles" />
                                </td>
                            </tr>
                            <tr v-for="(row, index) in filteredData" :key="index">
                                <td v-for="(key, index) in allowedFields" :key="index" class="px-6 py-3 text-sm text-gray-500">
                                    <span v-if="key === '_id'">
                                        <p class="truncate-id dark:text-neutral-200">{{ row['_id'] }}</p>
                                    </span>
                                    <span v-else-if="key === 'mainContent'">
                                        <div class="flex items-center gap-x-3">
                                            <img :src="row.mainContent.img.src" alt="img" style="height: 55px;">
                                        </div>
                                    </span>
                                    <span v-else-if="key === 'enabled'">
                                        <span
                                            :class="['py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full', row[key] ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500' : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500']">
                                            <svg v-if="row[key]" class="size-2.5" xmlns="http://www.w3.org/2000/svg"
                                                width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg>
                                            <svg v-else class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16"
                                                height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>
                                            {{ row[key] ? 'Activo' : 'Inactivo' }}
                                        </span>
                                    </span>
                                    <span v-else-if="key === 'createdBy'">
                                        {{ row.createdBy['name'] }}
                                    </span>
                                    <span v-else-if="key === 'updatedBy'">
                                        {{ row.updatedBy === null ? 'N/A' :  row.updatedBy['name']}}
                                    </span> 
                                    <span v-else-if="key === 'createdAt' || key === 'updatedAt'">
                                        {{ new Date(row[key]).toLocaleDateString() }}
                                    </span>
                                    <span v-else>
                                        {{ row[key] }}
                                    </span>
                                </td>
                                <!-- Columna de acciones -->
                                <td class="px-6 py-3 text-sm text-gray-500">
                                    <button :title="row.enabled ? 'Desactivar' : 'Activar'" type="button"
                                        @click="disabledOrEnabled(row._id, !row.enabled)" :class="['m-1 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                                            row.enabled ? 'bg-red-500 hover:bg-red-600 focus:bg-red-600' : 'bg-green-500 hover:bg-green-600 focus:bg-green-600'
                                        ]">
                                        <svg v-if="row.enabled" xmlns="http://www.w3.org/2000/svg" width="12"
                                            height="12" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" stroke-width="2"
                                                d="M18 12H6M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z">
                                            </path>
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                            viewBox="0 0 20 20">
                                            <path fill="currentColor"
                                                d="M1.818 1.364a.455.455 0 0 0-.454.454v16.364c0 .25.203.454.454.454h16.364a.455.455 0 0 0 .454-.454V1.818a.455.455 0 0 0-.454-.454zM18.182 0C19.186 0 20 .814 20 1.818v16.364A1.82 1.82 0 0 1 18.182 20H1.818A1.82 1.82 0 0 1 0 18.182V1.818C0 .814.814 0 1.818 0zm-7.884 4.91a.68.68 0 0 0-.682.682L9.615 9.3H5.909a.68.68 0 0 0-.674.581l-.008.1c0 .378.306.683.682.683l3.706-.001v3.707c0 .343.253.626.582.675l.1.007a.68.68 0 0 0 .682-.682v-3.707h3.707a.68.68 0 0 0 .675-.58l.007-.101a.68.68 0 0 0-.682-.682H10.98V5.592a.68.68 0 0 0-.58-.674Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- End Table -->

                    <!-- Footer -->
                    <div
                        class="grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
                        <div>
                            <p class="text-sm text-gray-600 dark:text-neutral-400">
                                Mostrando página {{ currentPage }} de <span class="font-semibold text-gray-800 dark:text-neutral-200">{{ totalPages }}</span>
                            </p>
                        </div>
                        <div>
                            <div class="inline-flex gap-x-2">
                                <button :disabled="currentPage === 1"
                                    @click="displayData(currentPage - 1, itemsPerPage)" type="button"
                                    class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m15 18-6-6 6-6"></path>
                                    </svg>
                                    Prev
                                </button>
                                <button @click="displayData(currentPage + 1, itemsPerPage)" type="button"
                                    class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                    Next
                                    <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Footer -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
import ComboBoxNumber from '@components/ui/forms/input/ComboBoxNumber.vue';
export default {
    props: {
        headers: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        displayData: Function,
        disabledOrEnabled: Function,
        currentPage: {
            type: Number,
            default: 1,
        },
        totalPages: {
            type: Number,
            default: 1,
        },
        itemsPerPage: {
            type: Number
        },
        allowedFields: {
            type: Array,
            default: () => [],
        },
        addButton: {
            type: Object,
            default: null,
        },
        buttonProps: {
            type: Object,
            required: false,
            default: () => ({
                id: "",
                buttonText: "",
                triggerIdBtn: "",
            }),
        },
        actions: {
            type: ''
        }
    },
    components: {
        WarningAlert,
        ComboBoxNumber
    },
    mounted() {
    },
    data() {
        return {
            filterText: "",
            limit: [10, 30, 50, 60],
            selectedLimit: 10
        };
    },
    computed: {
        filteredData() {
            return this.data
                .filter(row => {
                    return Object.values(row).some(value =>
                        String(value).toLowerCase().includes(this.filterText.toLowerCase())
                    );
                })
                .map(row =>
                    Object.fromEntries(
                        Object.entries(row).filter(([key]) => this.allowedFields.includes(key))
                    )
                );
        },
    },
    methods: {
        handlePageUpdate(newPage) {
            this.currentPage = newPage;
            this.displayData(newPage, this.itemsPerPage); // Actualizar los datos
        },
        onChange() {
            this.$emit('limit-changed', this.selectedLimit);
        }
    },
};
</script>
