import React from 'react'
import _ from 'lodash'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import SvgIconLabelOutline from 'material-ui/svg-icons/action/label-outline'

class TrelloBoardSelector extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      boards: []
    }

    window.Trello.get(
      '/members/me/boards/',
      (boards) => {
        this.setState({ boards: boards.map((board) => _.pick(board, [ 'name', 'id', 'shortLink', 'shortUrl', 'starred', 'prefs' ])) })
      },
      () => { console.log('Failed to load boards') }
    )
  }

  render () {
    console.log(this.state.boards)
    let boards = []
    this.state.boards.forEach((board) => {
      boards.push(
        <Chip style={{ margin: 4 }} key={board.id} backgroundColor={board.prefs.backgroundColor}>
          <Avatar color='#444' icon={<SvgIconLabelOutline />} />
          {board.name}
        </Chip>
      )
    })

    return (
      <div>
        <h1>Select a board</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{boards}</div>
      </div>
    )
  }
}

export { TrelloBoardSelector }
