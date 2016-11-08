import React from 'react'
import { render } from 'react-dom'
import rd3 from 'rd3';

const LineChart = rd3.LineChart
const lineData = [
  {
    name: 'Ideal burn down chart',
    values: [ { x: 0, y: 40 }, { x: 1, y: 30 }, { x: 2, y: 20 }, { x: 3, y: 10 }, { x: 4, y: 0 }],
    strokeWidth: 1,
    strokeDashArray: "5,5",
  },
  {
    name: 'Remaining effort',
    strokeWidth: 3,
    values : [ { x: 0, y: 40 }, { x: 1, y: 40 }, { x: 2, y: 32}]
  }
];

class App extends React.Component {
  render () {
    return <LineChart
      circleRadius={3}
      legend={true}
      data={lineData}
      width='100%'
      height={400}
      viewBoxObject={{
        x: 0,
        y: 0,
        width: 500,
        height: 400
      }}
      title="Burn down chart"
      yAxisLabel="Remaining effort (story points)"
      xAxisLabel="Iteration"
      domain={{x: [], y: []}}
      gridHorizontal={true}
      gridVertical={true}
    />
  }
}

render(<App />, document.getElementById('app'))
