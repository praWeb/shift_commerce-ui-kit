import React from "react"
import { shallow, mount } from "enzyme"

import InputHint from "../../src/javascripts/components/InputHint"
import InputField from "../../src/javascripts/components/InputField"
import GenericInput from "../../src/javascripts/components/GenericInput"
import InputLabel from "../../src/javascripts/components/InputLabel"
import InputError from "../../src/javascripts/components/InputError"

// TODO: .toContainReact() fails throughout this file, can't figure out why

test("renders expected sub components", () => {
  // arrange

  // act
  const wrapper = mount(
    <GenericInput />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputLabel />)).toBe(true)
  expect(wrapper.containsMatchingElement(<InputField />)).toBe(true)

});

test("renders sub components with expected values", () => {
  // arrange
  const label       = "My Input Label"
  const inputId     = "my_input_id"
  const name        = "my_input_name"
  const value       = "Initial input value"
  const placeholder = "Enter text here"

  // act
  const wrapper = mount(
    <GenericInput
      label={ label }
      name={ name }
      value={ value }
      inputId={ inputId }
      placeholder={ placeholder }
    />
  )

  // assert
  expect(wrapper.find("label")).toIncludeText(label)
  expect(wrapper.find("label")).toHaveProp("htmlFor", inputId)

  expect(wrapper.find("input")).toHaveProp("id", inputId)
  expect(wrapper.find("input")).toHaveProp("name", name)
  expect(wrapper.find("input")).toHaveProp("value", value)
  expect(wrapper.find("input")).toHaveProp("placeholder", placeholder)

});

test("renders hint when specified", () => {
  // arrange
  const hint = "My Input Hint"

  // act
  const wrapper = mount(
    <GenericInput hint={ hint } required="required"/>
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputHint />)).toBe(true)
  expect(wrapper).toIncludeText(hint)

});

test("does not render hint when hint is not specified", () => {
  // arrange

  // act
  const wrapper = mount(
    <GenericInput />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputHint />)).toBe(false)

});

test("renders error when specified", () => {
  // arrange
  const errorMessage = "My Error Message"

  // act
  const wrapper = mount(
    <GenericInput errorMessage={ errorMessage } />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputError/>)).toBe(true)
  expect(wrapper).toIncludeText(errorMessage)
  // class subject to change when css applied
  expect(wrapper.find("div").first()).toHaveClassName("c-input c-input--error")

});

test("does not render error when error is not specified", () => {
  // arrange

  // act
  const wrapper = mount(
    <GenericInput />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputError />)).toBe(false)
  // class subject to change when css applied
  expect(wrapper.find("div")).not.toHaveClassName("c-input--error")

});

test("adds prop classname to surrounding div", () => {
  // arrange
  const className = "c-input"

  // act
  const wrapper = mount(
    <GenericInput className={ className } />
  )

  // assert
  expect(wrapper.find("div").first()).toHaveClassName(`c-input ${ className }`)

});
