import React, { Component } from 'react'
import axios from 'axios'

import './App.css'

import Cell from './Cell'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      game: {
        id: 1,
        board: [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ],
        state: 'new',
        mines: 10
      }
    }
  }

  newGame = event => {
    console.log('New game has begun')
    axios.post('https://minesweeper-api.herokuapp.com/games/').then(response => {
      console.log(response.data)
      this.setState({
        playing: true,
        game: response.data
      })
    })
  }

  checkCell = (selectedRow, selectedColumn) => {
    axios
      .post(`https://minesweeper-api.herokuapp.com/games/${this.state.game.id}/check`, {
        id: this.state.game.id,
        row: selectedRow,
        col: selectedColumn
      })
      .then(response => {
        this.setState({
          game: response.data
        })
      })
  }

  headerText = () => {
    if (!this.state.playing) {
      return 'Start a new game!'
    } else {
      return `Game #${this.state.game.id}`
    }
  }

  minesText = () => {
    if (this.state.playing) {
      return `${this.state.game.mines} mines left`
    } else {
      return
    }
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td className="header" colSpan="8">
                <select>
                  <option value="0">Easy</option>
                  <option value="1">Intermediate</option>
                  <option value="2">Expert</option>
                </select>
                <button onClick={this.newGame}>😄</button>
              </td>
            </tr>
            <tr>
              <td className="header not-playing" colSpan="8">
                {this.headerText()}
              </td>
            </tr>
            <tr>
              <Cell row={0} column={0} value={this.state.game.board[0][0]} />
              <Cell row={0} column={1} value={this.state.game.board[0][1]} />
              <Cell row={0} column={2} value={this.state.game.board[0][2]} />
              <Cell row={0} column={3} value={this.state.game.board[0][3]} />
              <Cell row={0} column={4} value={this.state.game.board[0][4]} />
              <Cell row={0} column={5} value={this.state.game.board[0][5]} />
              <Cell row={0} column={6} value={this.state.game.board[0][6]} />
              <Cell row={0} column={7} value={this.state.game.board[0][7]} />
            </tr>
            <tr>
              <Cell row={1} column={0} value={this.state.game.board[1][0]} />
              <Cell row={1} column={1} value={this.state.game.board[1][1]} />
              <Cell row={1} column={2} value={this.state.game.board[1][2]} />
              <Cell row={1} column={3} value={this.state.game.board[1][3]} />
              <Cell row={1} column={4} value={this.state.game.board[1][4]} />
              <Cell row={1} column={5} value={this.state.game.board[1][5]} />
              <Cell row={1} column={6} value={this.state.game.board[1][6]} />
              <Cell row={1} column={7} value={this.state.game.board[1][7]} />
            </tr>
            <tr>
              <Cell row={2} column={0} value={this.state.game.board[2][0]} />
              <Cell row={2} column={1} value={this.state.game.board[2][1]} />
              <Cell row={2} column={2} value={this.state.game.board[2][2]} />
              <Cell row={2} column={3} value={this.state.game.board[2][3]} />
              <Cell row={2} column={4} value={this.state.game.board[2][4]} />
              <Cell row={2} column={5} value={this.state.game.board[2][5]} />
              <Cell row={2} column={6} value={this.state.game.board[2][6]} />
              <Cell row={2} column={7} value={this.state.game.board[2][7]} />
            </tr>
            <tr>
              <Cell row={3} column={0} value={this.state.game.board[3][0]} />
              <Cell row={3} column={1} value={this.state.game.board[3][1]} />
              <Cell row={3} column={2} value={this.state.game.board[3][2]} />
              <Cell row={3} column={3} value={this.state.game.board[3][3]} />
              <Cell row={3} column={4} value={this.state.game.board[3][4]} />
              <Cell row={3} column={5} value={this.state.game.board[3][5]} />
              <Cell row={3} column={6} value={this.state.game.board[3][6]} />
              <Cell row={3} column={7} value={this.state.game.board[3][7]} />
            </tr>
            <tr>
              <Cell row={4} column={0} value={this.state.game.board[4][0]} />
              <Cell row={4} column={1} value={this.state.game.board[4][1]} />
              <Cell row={4} column={2} value={this.state.game.board[4][2]} />
              <Cell row={4} column={3} value={this.state.game.board[4][3]} />
              <Cell row={4} column={4} value={this.state.game.board[4][4]} />
              <Cell row={4} column={5} value={this.state.game.board[4][5]} />
              <Cell row={4} column={6} value={this.state.game.board[4][6]} />
              <Cell row={4} column={7} value={this.state.game.board[4][7]} />
            </tr>
            <tr>
              <Cell row={5} column={0} value={this.state.game.board[5][0]} />
              <Cell row={5} column={1} value={this.state.game.board[5][1]} />
              <Cell row={5} column={2} value={this.state.game.board[5][2]} />
              <Cell row={5} column={3} value={this.state.game.board[5][3]} />
              <Cell row={5} column={4} value={this.state.game.board[5][4]} />
              <Cell row={5} column={5} value={this.state.game.board[5][5]} />
              <Cell row={5} column={6} value={this.state.game.board[5][6]} />
              <Cell row={5} column={7} value={this.state.game.board[5][7]} />
            </tr>
            <tr>
              <Cell row={6} column={0} value={this.state.game.board[6][0]} />
              <Cell row={6} column={1} value={this.state.game.board[6][1]} />
              <Cell row={6} column={2} value={this.state.game.board[6][2]} />
              <Cell row={6} column={3} value={this.state.game.board[6][3]} />
              <Cell row={6} column={4} value={this.state.game.board[6][4]} />
              <Cell row={6} column={5} value={this.state.game.board[6][5]} />
              <Cell row={6} column={6} value={this.state.game.board[6][6]} />
              <Cell row={6} column={7} value={this.state.game.board[6][7]} />
            </tr>
            <tr>
              <Cell row={7} column={0} value={this.state.game.board[7][0]} />
              <Cell row={7} column={1} value={this.state.game.board[7][1]} />
              <Cell row={7} column={2} value={this.state.game.board[7][2]} />
              <Cell row={7} column={3} value={this.state.game.board[7][3]} />
              <Cell row={7} column={4} value={this.state.game.board[7][4]} />
              <Cell row={7} column={5} value={this.state.game.board[7][5]} />
              <Cell row={7} column={6} value={this.state.game.board[7][6]} />
              <Cell row={7} column={7} value={this.state.game.board[7][7]} />
            </tr>
            <tr>
              <td className="header" colSpan="8">
                {this.minesText()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
