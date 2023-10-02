<template>
  <div class="d-flex justify-center align-center loading-box" v-if="loading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-table>
    <thead>
      <tr>
        <th
          v-for="header in props.headers"
          :key="header.value"
          @click="props.sortData(header.value)"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" :key="row.id">
        <td v-for="col in row" :key="col">{{ col }}</td>
        <td v-if="detailsLink">
          <router-link :to="{ name: 'planet', params: { id: row.id } }">
            See Detail
          </router-link>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination
    v-model="page"
    :length="props.total"
    :total-visible="props.totalVisible"
  ></v-pagination>
</template>

<script lang="ts" setup>
import { type Ref, ref, watch } from 'vue'
import { type ITableHeader } from '@/interfaces/ITable'

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
  detailsLink: {
    type: String
  }
})

watch(page, (newPage) => {
  props.getData(newPage)
})
</script>
