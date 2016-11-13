import React from 'react'
import _ from 'lodash'
import { TrelloBoardSelector } from './TrelloBoardSelector.jsx'
import { BurnDownChart } from './BurnDownChart.jsx'

const lineData = [
  {
    name: 'Remaining effort',
    strokeWidth: 3,
    values: [ { x: 0, y: 40 }, { x: 1, y: 40 }, { x: 2, y: 32 } ]
  }
]

class TrelloBurnDown extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      board: {}
    }

    this.selectBoard = this.selectBoard.bind(this)
  }

  selectBoard (board) {
    this.setState({board: board})
  }

  render () {
    const boardSelected = !_.isEmpty(this.state.board)
    return (
      <div>
        { boardSelected
          ? (<BurnDownChart data={lineData} iterations={4} storyPoints={40} />)
          : (<TrelloBoardSelector onSelectBoard={this.selectBoard} />)
        }
      </div>
  )
  }
}

export { TrelloBurnDown }
