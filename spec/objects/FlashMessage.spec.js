import React from "react"
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import FlashMessage from "../../src/javascripts/objects/FlashMessage"

test("renders flash message containing the message text", () => {
  // act
  const mockStore = configureStore([]);
  const store = mockStore({});

  const wrapper = mount(
    <Provider store={ store }>
      <FlashMessage  message="My Flash Message" error="false"/>
    </Provider>
  )

  // assert
  expect(wrapper).toIncludeText("My Flash Message")
})