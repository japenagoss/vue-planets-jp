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
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { type ITableHeader } from '@/interfaces/ITable'

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
  }
})
</script>
