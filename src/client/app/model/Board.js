import _ from 'lodash'
import moment from 'moment'
import { Trello } from './Trello'
require('moment-range')

const boardFactory = (boardData) => {
  let board = _.extend({
    getStoryPoints: getStoryPoints(boardData.id),
    getSprintDays: getSprintDays(boardData.id),
    getBurnDown: getBurnDown(boardData.id)
  }, boardData)

  return board
}

const getStoryPoints = (boardId) => () => Trello.getTodoListFrom(boardId)
  .then((list) => {
    const titleParts = _.defaults([], list.name.match(/\((.*)sp\)/), [ '(0sp)', '0' ])
    return Number(titleParts[ 1 ])
  })

const getSprintDays = (boardId) => () => Trello.getAcceptedListFrom(boardId)
  .then((list) => {
    const fromTo = new RegExp(/\((\d{2}\/\d{2}\/\d{4}) - (\d{2}\/\d{2}\/\d{4})\)/)
    const dateFormat = 'DD/MM/YYYY'
    const defaultDates = [ '', moment().format(dateFormat), moment().format(dateFormat) ]
    const titleParts = _.defaults([], list.name.match(fromTo), defaultDates)
    let days = 0

    const range = moment.range(moment(titleParts[1], dateFormat), moment(titleParts[2], dateFormat))

    range.by('days', (moment) => {
      if (moment.isoWeekday() < 6) days++
    })

    return days
  })

const getBurnDown = (boardId) => (storyPoints) => new Promise((resolve) => {
  Trello.getAcceptedListFrom(boardId).then((list) => {
    window.Trello.get(
      '/lists/' + list.id + '/actions',
      (actions) => {
        const moveActions = _.filter(actions, (action) => {
          return action.data.listAfter
        })

        const normalizedActions = _.map(moveActions, (action) => {
          return {
            date: moment(action.date).startOf('day'),
            card: action.data.card.name,
            listAfter: action.data.listAfter,
            listBefore: action.data.listBefore
          }
        })

        resolve([ ...calculateBurnDownFrom(normalizedActions, storyPoints) ])
      }
    )
  })
})

function calculateBurnDownFrom (actions, storyPoints) {
  const sorted = actions
    .sort(function (prev, next) {
      return prev.date.diff(next.date)
    })
    .map((action) => {
      const splitTitle = action.card.match(/- (\d*)/)
      const points = splitTitle ? Number(splitTitle[1]) : 0
      return [action.date.format(), points]
    })
    .reduce((completed, card) => {
      if (card[0] in completed) {
        completed[card[0]] -= card[1]
      } else {
        completed[card[0]] = storyPoints
      }

      storyPoints -= card[1]

      return completed
    }, {})

  let current = 0
  return _.map(sorted, (item, index) => {
    const chartItem = {x: current, y: item}
    current++
    return chartItem
  })
}

export { boardFactory as Board }
