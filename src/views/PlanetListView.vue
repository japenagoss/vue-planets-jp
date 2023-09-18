<template>
	<v-container>
		<div class="d-flex  justify-center align-center loading-box" v-if="loading">
			<v-progress-circular
				indeterminate
				color="primary"
			></v-progress-circular>
		</div>
		<v-table theme="dark" v-if="!loading">
			<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Rotation Period</th>
					<th class="text-left">Orbital Period</th>
					<th class="text-left">Diameter</th>
					<th class="text-left">Climate</th>
					<th class="text-left">Gravity</th>
					<th class="text-left">Terrain</th>
					<th class="text-left">Surface Water</th>
					<th class="text-left">Population</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="planet in planets" :key="planet.name">
					<td>{{ planet.name }}</td>
					<td>{{ planet.rotationPeriod }}</td>
					<td>{{ planet.orbitalPeriod }}</td>
					<td>{{ planet.diameter }}</td>
					<td>{{ planet.climate }}</td>
					<td>{{ planet.gravity }}</td>
					<td>{{ planet.terrain }}</td>
					<td>{{ planet.surfaceWater }}</td>
					<td>{{ planet.population }}</td>
				</tr>
			</tbody>
		</v-table>

		<v-pagination
			v-model="page"
			:length="total"
			total-visible="10"
		></v-pagination>
	
	</v-container>
</template>

<script lang="ts" setup>
	import { Ref, ref, onMounted, watch } from "vue"
	import PlanetService from "@/services/PlanetService"

	const page:Ref<number> = ref(1)
	const loading:Ref<boolean> = ref(true)

	const service = new PlanetService()
	const planets = service.getPlanets()
	const total = service.getTotal()

	onMounted(async () => {
		await service.fetchPlanets()
		loading.value = false
	})

	watch(page, (newPage) => {
		(async () => {
			loading.value = true
			await service.fetchPlanets(newPage)
			loading.value = false
		})()
	})

</script>

<style scoped>
	.loading-box {
		min-height: 500px;
	}
</style>