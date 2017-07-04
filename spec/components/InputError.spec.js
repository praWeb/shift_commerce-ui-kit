import React from "react"
import { shallow } from "enzyme"

import InputError from "../../src/javascripts/components/InputError"

test("renders text input hint containing hint text", () => {
  // arrange
  const errorMessage = "My Error Message"

  // act
  const wrapper = shallow(
    <InputError errorMessage={ errorMessage } />
  )

  // assert
  expect(wrapper).toIncludeText(errorMessage)

});
