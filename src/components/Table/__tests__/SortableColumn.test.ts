/**
 * @vitest-environment happy-dom
 */
import { describe, it } from "vitest"
import { mount } from "@vue/test-utils"
import SortableColumn from "@/components/Table/SortableColumn.vue"

describe("SortableColumn testing", () => {
  it("Should render", () => {
    const wrapper = mount({
      template: SortableColumn
    })
  })
})