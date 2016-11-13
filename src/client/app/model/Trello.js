import _ from 'lodash'

function getMyBoards () {
  return new Promise((resolve, reject) => {
    window.Trello.get(
      '/members/me/boards/',
      (boards) => {
        resolve(boards)
      },
      () => {
        reject()
      }
    )
  })
}

function getTodoListFrom (boardId) {
  return new Promise((resolve, reject) => {
    window.Trello.get(
      '/boards/' + boardId + '/lists/open',
      (lists) => {
        resolve(_.filter(lists, (list) => {
          return list.name.match(/^todo.*/i)
        }).pop())
      },
      () => {
        reject()
      }
    )
  })
}

function getAcceptedListFrom (boardId) {
  return new Promise((resolve, reject) => {
    window.Trello.get(
      '/boards/' + boardId + '/lists/open',
      (lists) => {
        resolve(_.filter(lists, (list) => {
          return list.name.match(/^done.*/i)
        }).pop())
      },
      () => {
        reject()
      }
    )
  })
}

const Trello = {
  getMyBoards,
  getTodoListFrom,
  getAcceptedListFrom
}

export { Trello }
