import React, { Component } from 'react'
import axios from 'axios'

import './App.css'

import Cell from './Cell'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      difficulty: 0,
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
    console.log(this.state.difficulty)

    axios
      .post('https://minesweeper-api.herokuapp.com/games/', { difficulty: this.state.difficulty })
      .then(response => {
        console.log(response.data)
        this.setState({
          playing: true,
          game: response.data
        })
      })
  }

  checkCell = (selectedRow, selectedColumn) => {
    if (!this.state.playing) {
      return
    }
    axios
      .post(`https://minesweeper-api.herokuapp.com/games/${this.state.game.id}/check/`, {
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

  flagCell = (selectedRow, selectedColumn) => {
    if (!this.state.playing) {
      return
    }
    axios
      .post(`https://minesweeper-api.herokuapp.com/games/${this.state.game.id}/flag`, {
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
    if (this.state.playing) {
      if (this.state.game.state === 'won') {
        return 'You won!'
      } else if (this.state.game.state === 'lost') {
        return 'Game Over!'
      } else {
        return `Game #${this.state.game.id}`
      }
    } else {
      return 'Start a New Game!'
    }
  }

  minesText = () => {
    if (this.state.playing) {
      return `${this.state.game.mines} mines left`
    } else {
      return
    }
  }

  buttonText = () => {
    if (this.state.game.state === 'lost') {
      return '🙁'
    } else {
      return '🙂'
    }
  }

  chooseDifficulty = event => {
    this.setState({
      difficulty: parseInt(event.target.value)
      // This event targets the element on which the event
      // originally occurred, and then we return it's value
      // but as an integer
    })
  }

  boardRows = () => {
    return this.state.game.board.map((row, rowIndexx) => {
      return (
        <tr key={rowIndexx}>
          {row.map((valueOfTheRowItem, rowIndex) => {
            return (
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={rowIndexx}
                column={rowIndex}
                value={valueOfTheRowItem}
              />
            )
          })}
        </tr>
      )
    })
  }

  boardSize = () => {
    return this.state.game.board[0].length
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td className="header" colSpan={this.boardSize()}>
                <select onChange={this.chooseDifficulty} value={this.state.difficulty}>
                  <option value="0">Easy</option>
                  <option value="1">Intermediate</option>
                  <option value="2">Expert</option>
                </select>
                <button onClick={this.newGame}>{this.buttonText()}</button>
              </td>
            </tr>
            <tr>
              <td className="header not-playing" colSpan={this.boardSize()}>
                {this.headerText()}
              </td>
            </tr>
            {this.boardRows()}

            {/* <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={0}
                value={this.state.game.board[1][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={1}
                value={this.state.game.board[1][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={2}
                value={this.state.game.board[1][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={3}
                value={this.state.game.board[1][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={4}
                value={this.state.game.board[1][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={5}
                value={this.state.game.board[1][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={6}
                value={this.state.game.board[1][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                column={7}
                value={this.state.game.board[1][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={0}
                value={this.state.game.board[2][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={1}
                value={this.state.game.board[2][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={2}
                value={this.state.game.board[2][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={3}
                value={this.state.game.board[2][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={4}
                value={this.state.game.board[2][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={5}
                value={this.state.game.board[2][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={6}
                value={this.state.game.board[2][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                column={7}
                value={this.state.game.board[2][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={0}
                value={this.state.game.board[3][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={1}
                value={this.state.game.board[3][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={2}
                value={this.state.game.board[3][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={3}
                value={this.state.game.board[3][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={4}
                value={this.state.game.board[3][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={5}
                value={this.state.game.board[3][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={6}
                value={this.state.game.board[3][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                column={7}
                value={this.state.game.board[3][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={0}
                value={this.state.game.board[4][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={1}
                value={this.state.game.board[4][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={2}
                value={this.state.game.board[4][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={3}
                value={this.state.game.board[4][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={4}
                value={this.state.game.board[4][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={5}
                value={this.state.game.board[4][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={6}
                value={this.state.game.board[4][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                column={7}
                value={this.state.game.board[4][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={0}
                value={this.state.game.board[5][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={1}
                value={this.state.game.board[5][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={2}
                value={this.state.game.board[5][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={3}
                value={this.state.game.board[5][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={4}
                value={this.state.game.board[5][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={5}
                value={this.state.game.board[5][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={6}
                value={this.state.game.board[5][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                column={7}
                value={this.state.game.board[5][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={0}
                value={this.state.game.board[6][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={1}
                value={this.state.game.board[6][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={2}
                value={this.state.game.board[6][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={3}
                value={this.state.game.board[6][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={4}
                value={this.state.game.board[6][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={5}
                value={this.state.game.board[6][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={6}
                value={this.state.game.board[6][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                column={7}
                value={this.state.game.board[6][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={0}
                value={this.state.game.board[7][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={1}
                value={this.state.game.board[7][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={2}
                value={this.state.game.board[7][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={3}
                value={this.state.game.board[7][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={4}
                value={this.state.game.board[7][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={5}
                value={this.state.game.board[7][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={6}
                value={this.state.game.board[7][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                column={7}
                value={this.state.game.board[7][7]}
              />
            </tr> */}
            <tr>
              <td className="header" colSpan={this.boardSize()}>
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
