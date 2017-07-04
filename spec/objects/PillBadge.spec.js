import React from "react"
import { shallow, mount } from "enzyme"

import PillBadge from "../../src/javascripts/objects/PillBadge"

test("renders label as content", () => {
  // arrange
  const label = "warning"

  // act
  const wrapper = shallow(
    <PillBadge label={ label } status="positive" />
  )

  // assert
  expect(wrapper.is(".o-pill-badge")).toBe(true)
  expect(wrapper).toIncludeText(label)
});

test("renders status as a BEM modifier", () => {
  // arrange
  const status = "notice"

  // act
  const wrapper = shallow(
    <PillBadge label="warning" status={ status } />
  )

  // assert
  expect(wrapper.is(".o-pill-badge")).toBe(true)
  expect(wrapper.is(`.o-pill-badge--${ status }`)).toBe(true)
});

test("renders alt text if provided", () => {
  // arrange
  const status = "notice"
  const title = "Stock Available: 6"

  // act
  const wrapper = shallow(
    <PillBadge label="warning" status={ status } title={ title } />
  )

  // assert
  expect(wrapper.is(".o-pill-badge")).toBe(true)
  expect(wrapper.is(`[title="${title}"]`)).toBe(true)
});