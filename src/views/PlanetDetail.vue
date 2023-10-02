<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>Planet: {{ planet.name }}</v-card-title>
        <v-card-text class="mt-5">
          <v-row
            align="center"
            class="mx-0"
            v-for="(value, key) in planet"
            :key="value"
          >
            <v-col>
              <b>{{ key }} </b>
            </v-col>
            <v-col>
              {{ value }}
            </v-col>
            <v-divider class="mx-4 mb-1"></v-divider>
          </v-row>
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const planet = computed(() => store.getters['planets/getPlanet'])

onMounted(async () => {
  await store.dispatch('planets/fetchPlanet', route.params.id)
})
</script>
