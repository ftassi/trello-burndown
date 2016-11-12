import React from 'react'
import { LineChart } from 'rd3'

class BurnDownChart extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      data: [
        {
          name: 'Ideal burn down chart',
          values: [ ...idealBurnDown(props.iterations, props.storyPoints) ],
          strokeWidth: 1,
          strokeDashArray: '5,5'
        },
        ...props.data
      ]
    }
  }

  render () {
    return <LineChart
      circleRadius={3}
      legend
      data={this.state.data}
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
      xAxisLabel='Iteration'
      domain={{ x: [], y: [] }}
      gridHorizontal
      gridVertical
    />
  }
}

BurnDownChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  iterations: React.PropTypes.number.isRequired,
  storyPoints: React.PropTypes.number.isRequired
}

function* idealBurnDown (iterations, storyPoints) {
  const idealBurnDownPerIteration = Math.ceil(storyPoints / iterations)
  let leftStoryPoints = storyPoints
  let currentIteration = 0

  while (currentIteration <= iterations) {
    yield ({ x: currentIteration, y: Math.max(0, leftStoryPoints) })
    leftStoryPoints -= idealBurnDownPerIteration
    currentIteration++
  }
}

export { BurnDownChart, idealBurnDown }
