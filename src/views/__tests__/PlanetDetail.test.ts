/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { type VueWrapper, shallowMount } from '@vue/test-utils'
import PlanetDetail from '@/views/PlanetDetail.vue'
import store from '@/store'
import router from '@/router'

describe('SortableColumn testing', () => {
  let wrapper: VueWrapper<any, any>

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = shallowMount(PlanetDetail, {
      global: {
        plugins: [store, router]
      }
    })
  })

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
