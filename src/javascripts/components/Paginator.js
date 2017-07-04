import React, { Component } from 'react'
import PaginatorButton from "./PaginatorButton"

export default class Paginator extends Component {
  render () {
    let currentPageNumber = Number(this.props.current_page)
    let totalPages = Math.ceil(this.props.record_count / this.props.page_size)

    let previousButton = () => {
      if (currentPageNumber === 1) {
        return null
      } else {
        return (
          <PaginatorButton key="«" label="«" onClick={ this.props.onClick(currentPageNumber - 1) } />
        )
      }
    }

    let startSeparator = () => {
      if (currentPageNumber <= 3) {
        return null
      } else {
        let buttons = [<PaginatorButton key={ 1 } label={ 1 } onClick={ this.props.onClick(1) } />]
        if (currentPageNumber >= 5) {
          buttons.push(<PaginatorButton key="...1" label="..." disabled />)
        }
        return buttons
      }
    }

    let mainButtons = () => {
      let buttons = []
      let startPoint = Math.max((currentPageNumber - 2), 1)
      let endPoint = Math.min((currentPageNumber + 2), totalPages)
      for(let i = startPoint; i <= endPoint; i++) {
        if (i === currentPageNumber) {
          buttons.push(<PaginatorButton key={ i } label={ i } disabled />)
        } else {
          buttons.push(<PaginatorButton key={ i } label={ i } onClick={ this.props.onClick(i) } />)
        }
      }
      return buttons
    }

    let endSeparator = () => {
      if (currentPageNumber >= (totalPages - 2)) {
        return null
      } else {
        let buttons = [<PaginatorButton key={ totalPages } label={ totalPages } onClick={ this.props.onClick(totalPages) } />]
        if (currentPageNumber <= (totalPages - 4)) {
          buttons.unshift(<PaginatorButton key="...2" label="..." disabled />)
        }
        return buttons
      }
    }

    let nextButton = () => {
      if (currentPageNumber === totalPages) {
        return null
      } else {
        return (
          <PaginatorButton key="»" label="»" onClick={ this.props.onClick(currentPageNumber + 1) } />
        )
      }
    }

    if (this.props.record_count <= this.props.page_size) {
      return null
    } else {
      return <div>
        { previousButton() }
        { startSeparator() }
        { mainButtons() }
        { endSeparator() }
        { nextButton() }
      </div>
    }
  }
}
