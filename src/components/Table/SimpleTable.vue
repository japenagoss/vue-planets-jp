<template>
  <div class="d-flex justify-center align-center loading-box" v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-table v-if="!loading">
    <thead>
      <tr>
        <th
          v-for="header in props.headers"
          :key="header.value"
          @click="props.sortData(header.value)"
        >
          <SortableColumn
            :attributeName="header.value"
            :label="header.text"
            :orderBy="props.orderBy"
            :order="props.order"
            v-if="header.value !== 'detail'"
          />
          <span v-if="header.value === 'detail'">{{ header.text }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" :key="row.id">
        <td v-for="col in row" :key="col">{{ col }}</td>
        <td v-if="detailsLink">
          <router-link :to="{ name: 'planet', params: { id: row.id } }">
            <v-icon :icon="mdiPageNext"></v-icon>
          </router-link>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="mt-10"></div>
  <v-pagination
    v-model="page"
    :length="props.total"
    :total-visible="props.totalVisible"
  ></v-pagination>
</template>

<script lang="ts" setup>
import { type Ref, ref, watch } from 'vue'
import { mdiPageNext } from '@mdi/js'
import { type ITableHeader } from '@/interfaces/ITable'
import SortableColumn from './SortableColumn.vue'

const page: Ref<number> = ref(1)

const props = defineProps({
  headers: {
    type: Array<ITableHeader>,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array<{ id: number }>,
    required: true
  },
  sortData: {
    type: Function,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  totalVisible: {
    type: Number,
    required: true
  },
  getData: {
    type: Function,
    required: true
  },
  orderBy: {
    type: String,
    required: true
  },
  order: {
    type: String,
    required: true
  },
  detailsLink: {
    type: String
  }
})

watch(page, (newPage) => {
  props.getData(newPage)
})
</script>

<style scoped>
.loading-box {
  min-height: 575px;
}
</style>
