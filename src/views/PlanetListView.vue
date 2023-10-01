<template>
  <v-container>
    <SimpleTable :headers="headers" :loading="loading" :data="data" />
  </v-container>
</template>

<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import SimpleTable from '@/components/Table/SimpleTable.vue'
import { type ITableHeader } from '@/interfaces/ITable'
import { type IPlanet } from '@/interfaces/IPlanet'

const loading: Ref<boolean> = ref(false)
const headers: Ref<ITableHeader[]> = ref([
  {
    text: 'ID',
    value: 'id'
  },
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Rotation Period',
    value: 'rotationPeriod'
  },
  {
    text: 'Orbital Period',
    value: 'orbitalPeriod'
  },
  {
    text: 'Diameter',
    value: 'diameter'
  },
  {
    text: 'Climate',
    value: 'climate'
  }
])

const data: Ref<IPlanet[]> = ref([
  {
    id: 1,
    name: 'test',
    rotationPeriod: 3343,
    orbitalPeriod: 3333,
    diameter: 2334,
    climate: 'test'
  }
])
</script>
