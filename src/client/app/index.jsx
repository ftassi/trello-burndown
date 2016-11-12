import React from 'react'
import { render } from 'react-dom'
import { BurnDownChart } from './components/BurnDownChart.jsx'

const lineData = [
  {
    name: 'Remaining effort',
    strokeWidth: 3,
    values: [ { x: 0, y: 40 }, { x: 1, y: 40 }, { x: 2, y: 32 } ]
  }
]

render(<BurnDownChart data={lineData} storyPoints={40} iterations={4} />, document.getElementById('app'))
