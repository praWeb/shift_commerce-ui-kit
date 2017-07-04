import React from "react"
import { shallow, mount } from "enzyme"

import Paginator from "../../src/javascripts/components/Paginator"
import PaginatorButton from "../../src/javascripts/components/PaginatorButton"

test("renders nothing if no pagination required", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <Paginator current_page={ 1 } page_size={ 10 } record_count={ 5 } onClick={ emptyFunction } />
  )

  // assert
  expect(wrapper.html()).toBe(null)

})

test("renders relevant buttons if 2 pages are required", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <Paginator current_page={ 1 } page_size={ 10 } record_count={ 15 } onClick={ emptyFunction } />
  )

  // assert
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 1 } disabled />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 2 } onClick={ emptyFunction(2) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label="»" onClick={ emptyFunction(2) } />)).toBe(true)

})

test("renders relevant buttons if not on page 1 and 2 pages are required", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <Paginator current_page={ 2 } page_size={ 10 } record_count={ 15 } onClick={ emptyFunction } />
  )

  // assert
  expect(wrapper.containsMatchingElement(<PaginatorButton label="«" onClick={ emptyFunction(1) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 1 } onClick={ emptyFunction(1) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 2 } disabled />)).toBe(true)
})

test("renders fully expanded paginator", () => {
    // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <Paginator current_page={ 5 } page_size={ 10 } record_count={ 81 } onClick={ emptyFunction } />
  )

  // assert
  expect(wrapper.containsMatchingElement(<PaginatorButton label="«" onClick={ emptyFunction(4) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 1 } onClick={ emptyFunction(1) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label="..." disabled />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 2 } />)).toBe(false)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 3 } onClick={ emptyFunction(3) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 4 } onClick={ emptyFunction(4) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 5 } disabled />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 6 } onClick={ emptyFunction(6) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 7 } onClick={ emptyFunction(7) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 8 } />)).toBe(false)
  expect(wrapper.find("[disabled=true]").length).toBe(3)
  expect(wrapper.containsMatchingElement(<PaginatorButton label={ 9 } onClick={ emptyFunction(9) } />)).toBe(true)
  expect(wrapper.containsMatchingElement(<PaginatorButton label="»" onClick={ emptyFunction(6) } />)).toBe(true)
})
