import React from "react"
import { shallow } from "enzyme"

import InputField from "../../src/javascripts/components/InputField"

test("renders text input field containing value", () => {
  // arrange
  // 10 Character Random String
  const value = Math.random().toString(36).substring(2,12)

  // act
  const wrapper = shallow(
    <InputField value={ value } />
  )

  // assert
  expect(wrapper.find("input")).toHaveProp("value", value)
});

test("renders text input field containing placeholder", () => {
  // arrange
  const placeholder = Math.random().toString(36).substring(2,12)

  // act
  const wrapper = shallow(
    <InputField placeholder={ placeholder } />
  )

  // assert
  expect(wrapper.find("input")).toHaveProp("placeholder", placeholder)
});

test("renders text input field with given name", () => {
  // arrange
  const name = Math.random().toString(36).substring(2,12)

  // act
  const wrapper = shallow(
    <InputField name={ name } />
  )

  // assert
  expect(wrapper.find("input")).toHaveProp("name", name)
});

test("defaults to text type", () => {
  // arrange

  // act
  const wrapper = shallow(
    <InputField />
  )

  // assert
  expect(wrapper.find("input")).toHaveProp("type", "text")

});

test("sets input field type when passed in", () => {
  // arrange
  const type="number"
  // act
  const wrapper = shallow(
    <InputField type={ type } />
  )

  // assert
  expect(wrapper.find("input")).toHaveProp("type", type)

});
