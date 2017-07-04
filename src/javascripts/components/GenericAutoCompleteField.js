import React, { Component } from "react"
import classNames from 'classnames'

//Components
import InputLabel from "./InputLabel"
import InputHint from "./InputHint"
import InputError from "./InputError"
import AutoCompleteField from "./AutoCompleteField"

export default class GenericAutoCompleteField extends Component {

  constructor(props) {
    super(props)

    this.renderHelpText = this.renderHelpText.bind(this)
  }

  renderHelpText() {
    let hint = this.props.hint || 'This is required field'

    if(this.props.required){
      return (
        <div>
          <i className="c-input__group__tip-icon">&#8505;</i>
          <InputHint hint={ hint } className="c-input__group__tip"/>
        </div>
      )
    }
  }
  render() {
    let {
      label,
      errorMessage,
      inputId,
      className,
      value,
      onChange,
      required
    } = this.props

    let placeholder = this.props.placeholder || 'Start typing for autocomplete..'

    return (
      <div className={ classNames("c-input", className, { "c-input--error": errorMessage }) }>
        <div className="c-input__group">
          { errorMessage && <InputError errorMessage={ errorMessage } /> }
          <InputLabel
            label={ label }
            inputId={ inputId }
          />
          <AutoCompleteField
            autoCompleteOptions={ this.props.autoCompleteOptions }
            value={ value }
            onChange={ onChange }
            inputId={ inputId }
            required={ required }
            placeholder={ placeholder }
          />
          { this.renderHelpText() }
        </div>
      </div>
    )
  }
}
