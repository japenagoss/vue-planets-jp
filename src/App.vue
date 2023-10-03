<template>
  <NavBar />
  <v-container>
    <v-alert v-if="error" icon="$vuetify" :text="error" type="error"></v-alert>
  </v-container>
  <router-view />
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'

import NavBar from '@/components/Header/NavBar.vue'
const store = useStore()
const error = computed(() => store.getters['planets/getError'])

/**
 * Hide error message once pass 5 seconds
 */
watch(error, (newError) => {
  if (newError.length > 0) {
    setTimeout(() => {
      void store.dispatch('planets/resetError')
    }, 5000)
  }
})
</script>
