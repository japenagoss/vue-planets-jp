import { type Module, type Commit } from 'vuex'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { type RootState } from './types'
import { type IPlanet } from '@/interfaces/IPlanet'

interface IPlanetsState {
  planets: IPlanet[]
  total: number
  planet: object
}

interface IPlanetsResult {
  results: IPlanet[]
  count: number
}

interface IContext {
  commit: Commit
  state: IPlanetsState
}

const state = {
  planets: [],
  total: 0,
  planet: {}
}

const mutations = {
  SET_PLANETS(state: IPlanetsState, result: IPlanetsState) {
    state.planets = result.planets
    if (result.total != null) {
      state.total = result.total
    }
  },
  SET_PLANET(state: IPlanetsState, planet: object) {
    state.planet = planet
  }
}

const actions = {
  async fetchPlanets({ commit }: { commit: Commit }, page: number) {
    try {
      const response = await axios.get<IPlanetsResult>(
        `https://swapi.dev/api/planets?page=${page}`
      )
      const planets = camelcaseKeys(response?.data?.results)
      const formattedPlanets = planets.map((p: IPlanet) => {
        const splitedUrl = p.url.split('/')
        return {
          id: Number(splitedUrl[5]),
          name: p.name,
          rotationPeriod:
            p.rotationPeriod === 'unknown' ? 0 : Number(p.rotationPeriod),
          orbitalPeriod:
            p.orbitalPeriod === 'unknown' ? 0 : Number(p.orbitalPeriod),
          diameter: p.diameter === 'unknown' ? 0 : Number(p.diameter),
          climate: p.climate
        }
      })

      const total = Math.ceil(Number(response.data.count) / 10)

      commit('SET_PLANETS', {
        planets: formattedPlanets,
        total
      })
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  },
  async fetchPlanet({ commit }: { commit: Commit }, id: number) {
    try {
      const response = await axios.get(`https://swapi.dev/api/planets/${id}`)
      const planet = camelcaseKeys(response?.data)
      commit('SET_PLANET', planet)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  },
  sortPlanets(context: IContext, { orderBy, sortOrder }: any): void {
    const currenData = context.state.planets
    const sortedData = currenData.sort((a: IPlanet, b: IPlanet) => {
      const aValue: string | number = a[orderBy]
      const bValue: string | number = b[orderBy]

      if (typeof aValue === 'string') {
        if (sortOrder === 'asc') {
          return String(aValue).localeCompare(String(bValue))
        } else {
          return String(bValue).localeCompare(String(aValue))
        }
      } else if (typeof aValue === 'number') {
        if (sortOrder === 'asc') {
          return aValue - Number(bValue)
        } else {
          return Number(bValue) - aValue
        }
      }
      return 0
    })
    context.commit('SET_PLANETS', {
      planets: sortedData
    })
  }
}

const getters = {
  getPlanets: (state: IPlanetsState) => state.planets,
  getPlanetsTotal: (state: IPlanetsState) => state.total,
  getPlanet: (state: IPlanetsState) => state.planet
}

const planetsModule: Module<IPlanetsState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default planetsModule
