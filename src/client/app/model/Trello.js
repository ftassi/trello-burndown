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

const Trello = {
  getMyBoards
}

export { Trello }
