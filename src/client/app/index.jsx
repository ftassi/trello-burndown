import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar'
import 'material-design-lite/src/typography/_typography.scss'
import { TrelloBoardSelector } from './components/TrelloBoardSelector.jsx'

injectTapEventPlugin()

// const lineData = [
//   {
//     name: 'Remaining effort',
//     strokeWidth: 3,
//     values: [ { x: 0, y: 40 }, { x: 1, y: 40 }, { x: 2, y: 32 } ]
//   }
// ]

ReactDOM.render(
  <MuiThemeProvider>
    <div>
      <AppBar title='Generate Burn Down Chart from a Trello board' />
      <TrelloBoardSelector />
    </div>
  </MuiThemeProvider>,
  document.getElementById('app')
)
