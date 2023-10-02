<template>
  <div
    class="d-flex flex-row align-center"
    @mouseover="props.setHover(props.attributeName)"
    @mouseleave="props.setHover('')"
  >
    <div>{{ props.label }}</div>
    <div>
      <v-icon
        size="large"
        icon="mdi-chevron-up-circle-outline"
        v-if="
          (props.orderBy === props.attributeName && props.order === 'desc') ||
          (props.hover === props.attributeName &&
            orderBy !== props.attributeName)
        "
        @click="props.setOrder(props.attributeName)"
      ></v-icon>
      <v-icon
        size="large"
        icon="mdi-chevron-down-circle-outline"
        v-if="orderBy === props.attributeName && order === 'asc'"
        @click="props.setOrder(props.attributeName)"
      ></v-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  setHover: {
    type: Function,
    required: true
  },
  setOrder: {
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
  hover: {
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
