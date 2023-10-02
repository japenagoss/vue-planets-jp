<template>
  <v-container>
    <SimpleTable :headers="headers" :loading="loading" :data="planets" />
  </v-container>
</template>

<script lang="ts" setup>
import { type Ref, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import SimpleTable from '@/components/Table/SimpleTable.vue'
import { type ITableHeader } from '@/interfaces/ITable'

const store = useStore()

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
</script>
