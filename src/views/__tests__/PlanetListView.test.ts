/**
 * @vitest-environment happy-dom
 */
import { describe, it } from "vitest"
import { mount } from "@vue/test-utils"
import PlanetListView from "@/views/PlanetListView.vue"

describe("PlanetListView testing", () => {
  it("Should render", () => {
    const wrapper = mount({
      template: PlanetListView
    })
  })
})