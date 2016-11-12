import { idealBurnDown } from './BurnDownChart.jsx'

describe('BurnDownChart', () => {
  it('should calculate ideal burn down', () => {
    const totalStoryPoints = 37
    const iterations = 4
    const data = [...idealBurnDown(iterations, totalStoryPoints)]

    data.should.be.deep.equal([
      {x: 0, y: 37},
      {x: 1, y: 27},
      {x: 2, y: 17},
      {x: 3, y: 7},
      {x: 4, y: 0}
    ])
  })
})
