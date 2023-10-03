/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { type VueWrapper, shallowMount } from '@vue/test-utils'
import NavBar from '@/components/Header/NavBar.vue'
import router from '@/router'

describe('SortableColumn testing', () => {
  let wrapper: VueWrapper<any, any>

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      props: {},
      global: {
        plugins: [router]
      }
    })
  })

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
