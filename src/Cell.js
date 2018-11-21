import React, { Component } from 'react'

class Cell extends Component {
  leftClickCell = event => {
    console.log(`Clicked at [${this.props.row}, ${this.props.column}]`)
    //We can't call the API right here because this isn't where the state lives, and the API changes the state.
    this.props.checkCell(this.props.row, this.props.column)
  }

  rightClickCell = event => {
    event.preventDefault()
    console.log(`Flagged at [${this.props.row}, ${this.props.column}]`)
    this.props.flagCell(this.props.row, this.props.column)
  }

  render() {
    return (
      <td onClick={this.leftClickCell} onContextMenu={this.rightClickCell}>
        {this.props.value}
      </td>
    )
  }
}

export default Cell
