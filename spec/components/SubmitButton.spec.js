import React from "react"
import { shallow } from "enzyme"

import SubmitButton from "../../src/javascripts/components/SubmitButton"

test("renders button with default text", () => {
  // arrange

  // act
  const wrapper = shallow(
    <SubmitButton />
  )

  // assert
  expect(wrapper).toIncludeText("Submit")

});

test("renders button with custom text", () => {
  // arrange
  const label = "Create"

  // act
  const wrapper = shallow(
    <SubmitButton label={ label }/>
  )

  // assert
  expect(wrapper).toIncludeText(label)

});
