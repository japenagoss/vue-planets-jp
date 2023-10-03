<template>
  <v-container>
    <v-text-field
      label="Search planets by name"
      :prepend-inner-icon="mdiBookSearch"
      v-model="searchBy"
      @input="handleSearchInput"
    ></v-text-field>
    <SimpleTable
      :headers="headers"
      :loading="planets.loading"
      :data="planets.planets"
      :sortData="sortData"
      :total="planets.total"
      :totalVisible="10"
      :getData="fetchPlanets"
      :orderBy="orderBy"
      :order="sortOrder"
      detailsLink="planet"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { type Ref, ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { mdiBookSearch } from '@mdi/js'
import SimpleTable from '@/components/Table/SimpleTable.vue'
import { type ITableHeader } from '@/interfaces/ITable'

const store = useStore()

const orderBy: Ref<string> = ref('id')
const sortOrder: Ref<string> = ref('asc')
const page: Ref<number> = ref(1)
const searchBy: Ref<string> = ref('')
const searchTimeout: Ref<null | ReturnType<typeof setTimeout>> = ref(null)
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
  },
  {
    text: 'Details',
    value: 'detail'
  }
])

const planets = computed(() => store.getters['planets/getPlanets'])

onMounted(async () => {
  await store.dispatch('planets/fetchPlanets', { page: page.value })
})

watch([orderBy, sortOrder], ([newOrderBy, newSortOrder]) => {
  void store.dispatch('planets/sortPlanets', {
    orderBy: newOrderBy,
    sortOrder: newSortOrder
  })
})

const handleSearchInput = (): void => {
  if (searchTimeout.value !== null) {
    clearTimeout(searchTimeout.value)
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  searchTimeout.value = setTimeout(async (): Promise<void> => {
    await store.dispatch('planets/fetchPlanets', {
      page: page.value,
      search: searchBy.value
    })
  }, 1000)
}

const sortData = (key: string): void => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  orderBy.value = key
}

const fetchPlanets = async (page: number): Promise<void> => {
  await store.dispatch('planets/fetchPlanets', { page })
}
</script>
