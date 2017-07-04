import React, { Component } from 'react'
import InputField from './InputField'

export default class AutoCompleteField extends Component {
  autoCompleteOptions() {
    if (this.props.autoCompleteOptions === undefined || this.props.autoCompleteOptions.length < 1) {
      return null
    } else {
      let options = this.props.autoCompleteOptions.map(function(opt, i) {
        return <option key={ i } value={ opt } />
      }.bind(this))
      return <datalist id={ this.props.inputId + "_list" }>
        { options }
      </datalist>
    }
  }
  // autoComplete='off' turns off browser autoComplete
  render() {
    return <div>
      <InputField value={ this.props.value } onChange={ this.props.onChange } placeholder={ this.props.placeholder } id={ this.props.inputId } list={ this.props.inputId + "_list" } autoComplete="off" required={ this.props.required } />

      { this.autoCompleteOptions() }
    </div>

  }
}
