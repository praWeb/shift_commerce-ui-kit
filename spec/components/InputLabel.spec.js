import React from "react"
import { shallow, mount } from "enzyme"

import InputLabel from "../../src/javascripts/components/InputLabel"

test("renders text input label containing label text", () => {
  // arrange
  const label = "My Input"

  // act
  const wrapper = shallow(
    <InputLabel label={ label } />
  )

  // assert
  expect(wrapper).toHaveTagName("label")
  expect(wrapper.find("label")).toIncludeText(label)

});

test("renders text input label for a specific input name", () => {
  // arrange
  const label = "My Input"
  const inputId = "my_input_id"

  // act
  const wrapper = shallow(
    <InputLabel label={ label } inputId={ inputId } />
  )

  // assert
  expect(wrapper.find("label")).toHaveProp('htmlFor', inputId)

});
