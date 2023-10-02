import { type Module, type Commit } from 'vuex'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { type RootState } from './types'
import { type IPlanet } from '@/interfaces/IPlanet'

interface IPlanetsState {
  planets: IPlanet[]
  total: number
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
  total: 0
}

const mutations = {
  SET_PLANETS(state: IPlanetsState, result: IPlanetsState) {
    state.planets = result.planets
    if (result.total != null) {
      state.total = result.total
    }
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
  getPlanetsTotal: (state: IPlanetsState) => state.total
}

const planetsModule: Module<IPlanetsState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default planetsModule
