import React from 'react'
import { LineChart } from 'rd3'

class BurnDownChart extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      storyPoints: 0,
      days: 0,
      burnDown: []
    }

    props.board.getStoryPoints().then((storyPoints) => {
      this.setState({ storyPoints: storyPoints })
    })

    props.board.getSprintDays().then((days) => {
      this.setState({ days: days })
    })

    props.board.getBurnDown().then((burnDown) => {
      this.setState({burnDown: burnDown})
    })
  }

  render () {
    const data = [
      {
        name: 'Ideal burn down chart',
        values: [ ...idealBurnDown(this.state.days, this.state.storyPoints) ],
        strokeWidth: 1,
        strokeDashArray: '5,5'
      },
      {
        name: 'Remaining effort',
        strokeWidth: 3,
        values: this.state.burnDown
      }
    ]

    return <LineChart
      circleRadius={3}
      legend
      data={data}
      width='100%'
      height={400}
      viewBoxObject={{
        x: 0,
        y: 0,
        width: 500,
        height: 400
      }}
      title='Burn down chart'
      yAxisLabel='Remaining effort (story points)'
      xAxisLabel='Days'
      domain={{ x: [], y: [] }}
      gridHorizontal
      gridVertical
    />
  }
}

BurnDownChart.propTypes = {
  board: React.PropTypes.object.isRequired
}

function* idealBurnDown (days, storyPoints) {
  const idealBurnDownPerIteration = Math.ceil(storyPoints / days)
  let leftStoryPoints = storyPoints
  let current = 0

  while (current <= days) {
    yield ({ x: current, y: Math.max(0, leftStoryPoints) })
    leftStoryPoints -= idealBurnDownPerIteration
    current++
  }
}

export { BurnDownChart, idealBurnDown }
