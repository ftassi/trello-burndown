import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BurnDownChart } from './components/BurnDownChart.jsx'

injectTapEventPlugin()

const lineData = [
  {
    name: 'Remaining effort',
    strokeWidth: 3,
    values: [ { x: 0, y: 40 }, { x: 1, y: 40 }, { x: 2, y: 32 } ]
  }
]

ReactDOM.render(
  <MuiThemeProvider>
    <BurnDownChart data={lineData} storyPoints={40} iterations={4} />
  </MuiThemeProvider>,
  document.getElementById('app')
)
