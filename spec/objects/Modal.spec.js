import React from "react"
import { shallow, mount } from "enzyme"

import Modal from "../../src/javascripts/objects/Modal"

test("renders modal popup", () =>{
  // act
  const wrapper = mount(
    <Modal>
      <div>
        Modal popup
      </div>
    </Modal>
  )

  // assert
  expect(wrapper).toIncludeText("Modal popup")

})