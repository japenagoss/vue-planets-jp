import { createStore, type StoreOptions } from 'vuex'
import { type RootState } from './types'
import planetsModule from './Planets'

const store: StoreOptions<RootState> = {
  modules: {
    planets: planetsModule
  }
}

export default createStore(store)
