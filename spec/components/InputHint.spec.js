import React from "react"
import { shallow, mount } from "enzyme"

import InputHint from "../../src/javascripts/components/InputHint"

test("renders text input hint containing hint text", () => {
  // arrange
  const hint = "My Input Hint"

  // act
  const wrapper = shallow(
    <InputHint hint={ hint } />
  )

  // assert
  expect(wrapper).toIncludeText(hint)

});
