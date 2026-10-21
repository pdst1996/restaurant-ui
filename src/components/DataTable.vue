<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Registros que se mostrarán en la tabla. */
    data: readonly unknown[]
    /** Muestra los controles de paginación al pie de la tabla. */
    showPagination?: boolean
    /** Actívalo en false cuando la API entregue una página de resultados. */
    clientSidePagination?: boolean
    /** Total de registros; por defecto usa la longitud de data. */
    total?: number
    currentPage?: number
    pageSize?: number
    pageSizes?: number[]
    paginationLayout?: string
    paginationDisabled?: boolean
    paginationBackground?: boolean
    loading?: boolean
  }>(),
  {
    showPagination: false,
    clientSidePagination: true,
    total: undefined,
    currentPage: undefined,
    pageSize: undefined,
    pageSizes: () => [10, 20, 50, 100],
    paginationLayout: 'sizes, prev, pager, next',
    paginationDisabled: false,
    paginationBackground: true,
    loading: false,
  },
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  'current-change': [page: number]
  'size-change': [size: number]
}>()

const internalCurrentPage = ref(1)
const internalPageSize = ref(props.pageSizes[0] ?? 10)

const currentPage = computed({
  get: () => props.currentPage ?? internalCurrentPage.value,
  set: (page: number) => {
    internalCurrentPage.value = page
    emit('update:currentPage', page)
  },
})

const pageSize = computed({
  get: () => props.pageSize ?? internalPageSize.value,
  set: (size: number) => {
    internalPageSize.value = size
    emit('update:pageSize', size)
  },
})

const total = computed(() => props.total ?? props.data.length)

const rows = computed(() => {
  if (!props.showPagination || !props.clientSidePagination) {
    return props.data
  }

  const firstRow = (currentPage.value - 1) * pageSize.value
  return props.data.slice(firstRow, firstRow + pageSize.value)
})

function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  emit('size-change', size)
}

function handleCurrentChange(page: number) {
  currentPage.value = page
  emit('current-change', page)
}
</script>

<template>
  <div class="data-table">
    <el-table v-bind="$attrs" v-loading="loading" :data="rows">
      <slot />
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </el-table>

    <el-pagination v-if="showPagination" v-model:current-page="currentPage" v-model:page-size="pageSize"
      class="data-table__pagination" :page-sizes="pageSizes" size="small" :layout="paginationLayout" :total="total"
      :disabled="paginationDisabled" :background="paginationBackground" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<style scoped>
.data-table__pagination {
  margin-top: 20px;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .data-table__pagination {
    justify-content: center;
  }
}
</style>
