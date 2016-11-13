import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar'
import 'material-design-lite/src/typography/_typography.scss'
import { TrelloBurnDown } from './components/TrelloBurnDown.jsx'

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
    <div>
      <AppBar title='Generate Burn Down Chart from a Trello board' />
      <TrelloBurnDown />
    </div>
  </MuiThemeProvider>,
  document.getElementById('app')
)
