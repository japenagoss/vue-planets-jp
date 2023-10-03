<template>
  <v-toolbar class="flex-grow-0" color="primary" dark>
    <v-btn
      icon
      class="hidden-xs-only"
      v-if="currentRouteName === 'planet'"
      @click="router.push('/planets')"
    >
      <v-icon :icon="mdiArrowLeft"></v-icon>
    </v-btn>
    <v-toolbar-title>The Star Wars API</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="item in nav"
      :key="item.title"
      :to="item.to"
      :title="item.title"
      flat
      >{{ item.text }}</v-btn
    >
  </v-toolbar>
</template>

<script lang="ts" setup>
import { computed, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'

interface INav {
  title: string
  text: string
  to: string
}

const route = useRoute()
const router = useRouter()
const currentRouteName = computed(() => route.name)
const nav: Ref<INav[]> = ref([
  {
    title: 'Home',
    text: 'Home',
    to: '/'
  },
  {
    title: 'Planets',
    text: 'Planets',
    to: '/planets'
  }
])
</script>
