import React, { Component } from 'react'

class Cell extends Component {
  checkCell = event => {
    console.log('Clicked')
  }

  render() {
    return <td onClick={this.checkCell}>{this.props.value}</td>
  }
}

export default Cell
