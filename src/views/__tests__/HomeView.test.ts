/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { type VueWrapper, shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('SortableColumn testing', () => {
  let wrapper: VueWrapper<any, any>

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {})
  })

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
