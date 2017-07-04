import React, { Component } from 'react'
import AutoCompleteField from "./AutoCompleteField"
import SubmitButton from "./SubmitButton"

export default class SearchBar extends Component {

  render() {
    return <div>
      <form onSubmit={ this.props.handleSearch }>
        <div className="c-search-bar__form">
          <AutoCompleteField
            autoCompleteOptions={ this.props.autoCompleteOptions }
            inputId={ this.props.inputId || "search_term" }
            placeholder={ this.props.placeholder }
            value={ this.props.value }
            onChange={ this.props.onChange }
          />
        </div>
        <div className="c-search-bar__buttons">
          <button onClick={ this.props.resetSearch } className="o-button">Reset</button>
          <SubmitButton label="Search" className="o-button o-button--positive u-float-right"/>
        </div>
      </form>
    </div>
  }
}
