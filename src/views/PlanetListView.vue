<template>
  <v-container>
    <SimpleTable
      :headers="headers"
      :loading="loading"
      :data="planets"
      :sortData="sortData"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { type Ref, ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import SimpleTable from '@/components/Table/SimpleTable.vue'
import { type ITableHeader } from '@/interfaces/ITable'

const store = useStore()

const orderBy: Ref<string> = ref('id')
const sortOrder: Ref<string> = ref('asc')
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

const planets = computed(() => store.getters['planets/getPlanets'])

onMounted(async () => {
  await store.dispatch('planets/fetchPlanets')
})

watch([orderBy, sortOrder], ([newOrderBy, newSortOrder]) => {
  void store.dispatch('planets/sortPlanets', {
    orderBy: newOrderBy,
    sortOrder: newSortOrder
  })
})

const sortData = (key: string): void => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  orderBy.value = key
}
</script>
