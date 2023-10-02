import { type Module } from 'vuex'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { type RootState } from './types'

interface IPlanet {
  id: number
  url: string
  name: string
  rotationPeriod: number
  orbitalPeriod: number
  diameter: number
  climate: string
}

interface IPlanetsState {
  planets: IPlanet[]
}

const state = {
  planets: []
}

const mutations = {
  GET_PLANETS(state: IPlanetsState, planets: []) {
    state.planets = planets
  }
}

const actions = {
  async fetchPlanets({ commit }: any) {
    try {
      const response = await axios.get<{ results: IPlanet[] }>(
        'https://swapi.dev/api/planets'
      )
      const planets = camelcaseKeys(response?.data?.results)
      const formattedPlanets = planets.map((p: IPlanet) => {
        const splitedUrl = p.url.split('/')
        return {
          id: splitedUrl[5],
          name: p.name,
          rotationPeriod: Number(p.rotationPeriod),
          orbitalPeriod: Number(p.orbitalPeriod),
          diameter: Number(p.diameter),
          climate: p.climate
        }
      })

      commit('GET_PLANETS', formattedPlanets)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }
}

const getters = {
  getPlanets: (state: IPlanetsState) => state.planets
}

const planetsModule: Module<IPlanetsState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default planetsModule
