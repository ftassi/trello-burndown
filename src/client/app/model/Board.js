import _ from 'lodash'
import moment from 'moment'
require('moment-range')
import { Trello } from './Trello'

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

const getBurnDown = (boardId) => () => new Promise((resolve) => {
  resolve([ { x: 0, y: 40 }, { x: 1, y: 40 }, { x: 2, y: 32 }, { x: 3, y: 27 } ])
})

export { boardFactory as Board }
