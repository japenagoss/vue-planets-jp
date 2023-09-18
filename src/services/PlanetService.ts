import { ref, Ref } from "vue"
import axios from "axios"
import camelcaseKeys from 'camelcase-keys'
import { IPlanet } from "@/interfaces/IPlanet"

class PlanetService {
  private planets:Ref<Array<IPlanet>>
	private total: Ref<number>
	
	constructor() {
		this.planets = ref<Array<IPlanet>>([])
		this.total = ref<number>(0)
	}

	getPlanets():Ref<Array<IPlanet>> {
		return this.planets
	}

	getTotal():Ref<number> {
		return this.total
	}

	async fetchPlanets(page: number | undefined): Promise<void> {
		try {
			const url = `https://swapi.dev/api/planets${page ? `?page=${page}` : ''}`
			const response = await axios(url)
					
			if (response?.data?.results) {
				const planets = await camelcaseKeys(response?.data?.results)
				this.planets.value = planets
			}

			if (response?.data?.count) {
				const total = Math.ceil(Number(response.data.count) / 10)
				this.total.value = total
			}

		} catch (error) {
			console.log(error)
		}
	}
}

export default PlanetService