import React from 'react'
import { LineChart } from 'rd3'

const idealBurnDown = () => {
  return {
    name: 'Ideal burn down chart',
    values: [ { x: 0, y: 40 }, { x: 1, y: 30 }, { x: 2, y: 20 }, { x: 3, y: 10 }, { x: 4, y: 0 } ],
    strokeWidth: 1,
    strokeDashArray: '5,5'
  }
}

class BurnDownChart extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      data: [idealBurnDown(), ...props.data]
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
  data: React.PropTypes.array.isRequired
}

export {BurnDownChart, idealBurnDown}
