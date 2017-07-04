import React from "react"
import { shallow, mount } from "enzyme"

import SearchBar from "../../src/javascripts/components/SearchBar"
import SubmitButton from "../../src/javascripts/components/SubmitButton"
import AutoCompleteField from "../../src/javascripts/components/AutoCompleteField"

test("renders text box and button", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <SearchBar value='10' displaySearchTerm="11" onChange={ emptyFunction } handleSearch={ emptyFunction } placeholder="SKU" />
  )

  // assert
  expect(wrapper.containsMatchingElement(<button className="o-button">Reset</button>)).toBe(true)
  expect(wrapper.containsMatchingElement(<SubmitButton label="Search" className="o-button o-button--positive u-float-right"/>)).toBe(true)
  expect(wrapper.containsMatchingElement(<AutoCompleteField inputId="search_term" value='10' placeholder="SKU" onChange={ emptyFunction } />)).toBe(true)
})

test("renders FlashMessage when no displaySearchTerm passed in", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <SearchBar value='10' displaySearchTerm="" onChange={ emptyFunction } handleSearch={ emptyFunction } placeholder="SKU" />
  )

  // assert
  expect(wrapper.containsMatchingElement(<SubmitButton label="Search"/>)).toBe(true)
  expect(wrapper.containsMatchingElement(<AutoCompleteField inputId="search_term" value='10' placeholder="SKU" onChange={ emptyFunction } />)).toBe(true)
})
