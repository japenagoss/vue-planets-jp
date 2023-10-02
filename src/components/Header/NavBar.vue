<template>
  <v-toolbar>
    <v-btn
      icon
      class="hidden-xs-only"
      v-if="currentRouteName === 'planet'"
      @click="router.push('/planets')"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>The Star Wars API</v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const currentRouteName = computed(() => route.name)
</script>
