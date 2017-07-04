import React from "react"
import { shallow } from "enzyme"

import InputHint from "../../src/javascripts/components/InputHint"
import AutoCompleteField from "../../src/javascripts/components/AutoCompleteField"
import GenericAutoCompleteField from "../../src/javascripts/components/GenericAutoCompleteField"
import InputLabel from "../../src/javascripts/components/InputLabel"
import InputError from "../../src/javascripts/components/InputError"

// TODO: .toContainReact() fails throughout this file, can't figure out why

test("renders expected sub components", () => {
  // arrange

  // act
  const wrapper = shallow(
    <GenericAutoCompleteField />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputLabel />)).toBe(true)
  expect(wrapper.containsMatchingElement(<AutoCompleteField />)).toBe(true)

});

test("renders sub components with expected values", () => {
  // arrange
  const label       = "My Input Label"
  const inputId     = "my_input_id"
  const value       = "Initial input value"
  const emptyFunction = () => {}
  const autoCompleteOptions = ["this", "that"]
  // act
  const wrapper = shallow(
    <GenericAutoCompleteField
      label={ label }
      value={ value }
      inputId={ inputId }
      autoCompleteOptions={ autoCompleteOptions }
      onChange={ emptyFunction }
    />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputLabel  label={ label } inputId={ inputId }/>)).toBe(true)
  expect(wrapper.containsMatchingElement(<AutoCompleteField
    autoCompleteOptions={ autoCompleteOptions }
    value={ value }
    onChange={ emptyFunction }
    inputId={ inputId }
  />)).toBe(true)


});

test("renders hint when specified", () => {
  // arrange
  const hint = "My Input Hint"

  // act
  const wrapper = shallow(
    <GenericAutoCompleteField hint={ hint } required="required"/>
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputHint hint={ hint } className="c-input__group__tip"/>)).toBe(true)
});

test("does not render hint when hint is not specified", () => {
  // arrange

  // act
  const wrapper = shallow(
    <GenericAutoCompleteField />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputHint />)).toBe(false)

});

test("renders error when specified", () => {
  // arrange
  const errorMessage = "My Error Message"

  // act
  const wrapper = shallow(
    <GenericAutoCompleteField errorMessage={ errorMessage } />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputError errorMessage={ errorMessage }/>)).toBe(true)
});

test("does not render error when error is not specified", () => {
  // arrange

  // act
  const wrapper = shallow(
    <GenericAutoCompleteField />
  )

  // assert
  expect(wrapper.containsMatchingElement(<InputError />)).toBe(false)
  // class subject to change when css applied
  expect(wrapper.find("div")).not.toHaveClassName("c-input--error")

});

test("adds prop classname to surrounding div", () => {
  // arrange
  const className = "c-input--custom"

  // act
  const wrapper = shallow(
    <GenericAutoCompleteField className={ className } />
  )

  // assert
  expect(wrapper.find("div").first()).toHaveClassName(`c-input ${ className }`)

});
