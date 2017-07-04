import React from "react"
import { shallow, mount } from "enzyme"

import Popover from "../../src/javascripts/objects/Popover"

test("renders component", ()=> {
  // Arrange
  let displayLabel= "Testing"

  // Act
  const wrapper = mount(
    <Popover displayLabel={ displayLabel }></Popover>
  )

  // Assert
  expect(wrapper.find("div.o-popover__label")).toIncludeText(displayLabel)
})


test("renders display_search_term instead of displayLabel when both are provided", () => {
  // Arrange
  let displayLabel= "Testing"
  let displaySearchTerm = "Display Label"

  // Act
  const wrapper = mount(
    <Popover displayLabel={ displayLabel } displaySearchTerm={ displaySearchTerm }></Popover>
  )

  // Assert
  expect(wrapper.find("div.o-popover__label")).toIncludeText(displaySearchTerm)
})
