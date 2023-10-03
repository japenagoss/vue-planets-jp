/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { type VueWrapper, shallowMount } from '@vue/test-utils'
import PlanetListView from '@/views/PlanetListView.vue'
import store from '@/store'

describe('PlanetListView testing', () => {
  let wrapper: VueWrapper<any, any>

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = shallowMount(PlanetListView, {
      props: {},
      global: {
        plugins: [store]
      }
    })
  })

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
