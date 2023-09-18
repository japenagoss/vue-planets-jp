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
					<th class="text-left">
						<SortableColumn
							:setHover="setHover"
							:setOrder="setOrder"
							:orderBy="orderBy"
							:order="order"
							:hover="hover"
							attributeName="name"
							label="Name"
						/>
					</th>
					<th class="text-left">
						<SortableColumn
							:setHover="setHover"
							:setOrder="setOrder"
							:orderBy="orderBy"
							:order="order"
							:hover="hover"
							attributeName="rotationPeriod"
							label="Rotation Period"
						/>
					</th>
					<th class="text-left">
						<SortableColumn
							:setHover="setHover"
							:setOrder="setOrder"
							:orderBy="orderBy"
							:order="order"
							:hover="hover"
							attributeName="orbitalPeriod"
							label="Orbital Period"
						/>
					</th>
					<th class="text-left">Diameter</th>
					<th class="text-left">Climate</th>
					<th class="text-left">Gravity</th>
					<th class="text-left">Terrain</th>
					<th class="text-left">Surface Water</th>
					<th class="text-left">Population</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="planet in orderedPlanets" :key="planet.name">
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
	import { Ref, ref, onMounted, watch, computed } from "vue"
	import PlanetService from "@/services/PlanetService"
	import SortableColumn from "@/components/Table/SortableColumn.vue"
	import { IPlanet } from "@/interfaces/IPlanet"

	const page:Ref<number> = ref(1)
	const loading:Ref<boolean> = ref(true)
	const orderBy:Ref<string> = ref("name")
	const order:Ref<string> = ref("asc")
	const hover:Ref<string> = ref("")

	const service = new PlanetService()
	const planets = service.getPlanets()
	const total = service.getTotal()

	onMounted(async () => {
		await service.fetchPlanets(1)
		loading.value = false
	})

	watch(page, (newPage) => {
		(async () => {
			loading.value = true
			await service.fetchPlanets(newPage)
			loading.value = false
			orderBy.value = "name"
			order.value = "asc"
		})()
	})

	const orderedPlanets = computed(() => {
		return planets.value.sort((a: IPlanet, b: IPlanet): any => {
			if (order.value === "asc") {
				if (typeof a[orderBy.value] === "string") {
					return String(a[orderBy.value]).localeCompare(String(b[orderBy.value]))
				} else {
					return Number(a[orderBy.value]) - Number(b[orderBy.value])
				}
			} else if (order.value === "desc") {
				if (typeof a[orderBy.value] === "string") {
					return String(b[orderBy.value]).localeCompare(String(a[orderBy.value]))
				} else {
					return Number(b[orderBy.value]) - Number(a[orderBy.value])
				}
			}
		})
	})

	const setOrder = (value: string) => {
		if (order.value === "asc") {
			order.value = "desc"
		} else {
			order.value = "asc"
		}
		orderBy.value = value
	}

	const setHover = (value: string) => {
		hover.value = value
	}

</script>

<style scoped>
	.loading-box {
		min-height: 500px;
	}
</style>