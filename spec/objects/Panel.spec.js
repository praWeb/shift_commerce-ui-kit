import React from "react"
import { shallow, mount } from "enzyme"

import Panel from "../../src/javascripts/objects/Panel"

test("renders o-panel class", () => {
  // arrange
  const label = "Some Text"

  // act
  const wrapper = shallow(
    <Panel>{ label }</Panel>
  )

  // assert
  expect(wrapper.is(".o-panel")).toBe(true)
  expect(wrapper).toIncludeText(label)
});
