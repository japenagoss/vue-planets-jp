/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { type VueWrapper, shallowMount } from '@vue/test-utils'
import SimpleTable from '@/components/Table/SimpleTable.vue'
import router from '@/router'

describe('SortableColumn testing', () => {
  let wrapper: VueWrapper<any, any>

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = shallowMount(SimpleTable, {
      props: {
        headers: [
          {
            text: 'Name',
            value: 'name'
          }
        ],
        loading: false,
        data: [],
        sortData: () => {},
        total: 100,
        totalVisible: 10,
        getData: () => {},
        orderBy: 'name',
        order: 'asc'
      },
      global: {
        plugins: [router]
      }
    })
  })

  it('Should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
