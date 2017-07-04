import React, { Component } from "react"
import classNames from 'classnames'

// Components
import InputLabel from "./InputLabel"
import InputField from "./InputField"
import InputHint from "./InputHint"
import InputError from "./InputError"

export default class GenericInput extends Component {
  render() {
    let {
      label,
      name,
      hint,
      errorMessage,
      inputId,
      placeholder,
      className,
      value,
      onChange,
      required,
      type
    } = this.props

    return (
      <div className={ classNames("c-input", className, { "c-input--error": errorMessage }) }>
        <div className="c-input__group">
          { errorMessage && <InputError errorMessage={ errorMessage } /> }
          <div>
            <InputLabel
              label={ label }
              inputId={ inputId }
            />
          </div>
          <div>
            <InputField
              id={ inputId }
              name={ name }
              value={ value }
              placeholder={ placeholder }
              onChange={ onChange }
              required={ required }
              type={ type }
            />
          </div>
          { hint && <InputHint hint={ hint } /> }
        </div>
      </div>
    )
  }
}
