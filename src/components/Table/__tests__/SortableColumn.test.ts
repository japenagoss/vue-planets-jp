/**
 * @vitest-environment happy-dom
 */
import { describe, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SortableColumn from '@/components/Table/SortableColumn.vue'

describe('SortableColumn testing', () => {
  it('Should render', () => {
    shallowMount(SortableColumn, {
      props: {
        orderBy: 'name',
        order: 'asc',
        attributeName: 'name',
        label: 'Name'
      },
      stubs: ['router-link']
    })
  })
})
