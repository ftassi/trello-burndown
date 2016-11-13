import React from 'react'
import _ from 'lodash'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import SvgIconLabelOutline from 'material-ui/svg-icons/action/label-outline'

class TrelloBoardSelector extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      boards: [],
      allBoards: [],
      filter: '',
    }

    window.Trello.get(
      '/members/me/boards/',
      (boards) => {
        this.setState({ boards: boards.map((board) => _.pick(board, [ 'name', 'id', 'shortLink', 'shortUrl', 'starred', 'prefs' ])) })
        this.setState({
          allBoards: this.state.boards.slice()
        })
      },
      () => { console.log('Failed to load boards') }
    )

    this.filter = this.filter.bind(this)
    this.selectBoard = this.selectBoard.bind(this)
  }

  filter (event) {
    this.setState({ filter: event.target.value })
    this.setState({
      boards: _.filter(this.state.allBoards, (board) => board.name.toLowerCase().includes(event.target.value.toLowerCase()))
    })
  }

  selectBoard (board) {
    this.props.onSelectBoard(board)
  }

  render () {
    let boards = []
    this.state.boards.forEach((board) => {
      boards.push(
        <Chip style={{ margin: 4 }} key={board.id} backgroundColor={board.prefs.backgroundColor} onTouchTap={() => this.selectBoard(board)}>
          <Avatar color={board.prefs.backgroundColor} icon={<SvgIconLabelOutline />} />
          {board.name}
        </Chip>
      )
    })

    return (
      <div>
        <TextField hintText='Search...' value={this.state.filter} onChange={this.filter} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{boards}</div>
      </div>
    )
  }
}

TrelloBoardSelector.propTypes = {
  onSelectBoard: React.PropTypes.func.isRequired
}
export { TrelloBoardSelector }
