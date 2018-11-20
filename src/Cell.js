import React, { Component } from 'react'

class Cell extends Component {
  checkCell = event => {
    console.log('Clicked')
    //We can't call the API right here because this isn't where the state lives, and the API changes the state.
  }

  render() {
    return <td onClick={this.checkCell}>{this.props.value}</td>
  }
}

export default Cell
