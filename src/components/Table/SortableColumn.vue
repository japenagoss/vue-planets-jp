<template>
  <div class="d-flex flex-row align-center sortable-column">
    <div>{{ props.label }}</div>
    <div class="ml-2">
      <v-icon
        size="medium"
        :icon="mdiChevronUpCircleOutline"
        v-if="props.orderBy === props.attributeName && props.order === 'desc'"
      ></v-icon>
      <v-icon
        size="medium"
        :icon="mdiChevronDownCircleOutline"
        v-if="props.orderBy === props.attributeName && props.order === 'asc'"
      ></v-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mdiChevronUpCircleOutline, mdiChevronDownCircleOutline } from '@mdi/js'
const props = defineProps({
  orderBy: {
    type: String,
    required: true
  },
  order: {
    type: String,
    required: true
  },
  attributeName: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.sortable-column:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
