import React from "react"
import { shallow, mount } from "enzyme"

import PaginatorButton from "../../src/javascripts/components/PaginatorButton"

test("renders button with value and label", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <PaginatorButton label="»" onClick={ emptyFunction(2) } />
  )

  // assert
  expect(wrapper.find("button")).toIncludeText("»")
  expect(wrapper.find("button")).toHaveProp("onClick", emptyFunction(2))
  expect(wrapper.find("button")).not.toHaveProp("disabled")
})

test("renders disabled button with appropriate prop", () => {
  // arrange
  const emptyFunction = () => {}

  // act
  const wrapper = mount(
    <PaginatorButton label="..." disabled />
  )

  // assert
  expect(wrapper.find("button")).toIncludeText("...")
  expect(wrapper.find("button")).toHaveProp("disabled")
})
