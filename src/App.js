import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td className="header" colSpan="8">
                <select>
                  <option value="0">Easy</option>
                  <option value="1">Intermediate</option>
                  <option value="2">Expert</option>
                </select>
                <button>🙂</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
