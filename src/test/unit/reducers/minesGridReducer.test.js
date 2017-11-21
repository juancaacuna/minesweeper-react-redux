import * as actionTypes from '../../../actions/actionTypes'
import * as gameStatus from '../../../lib/gameStatus'
import minesGridReducer from '../../../reducers/minesGridReducer'

const initialState = {
  Grid: [],
  RowCount: 0,
  ColCount: 0,
  MinesCount: 0,
  GameStatus: gameStatus.NEW,
  FlagToggle: false,
}

describe('minesGridReducer', () => {
  it('should return new minesGrid when action type is INIT_MINES_GRID', () => {
    const expected = {
      ColCount: 1,
      GameStatus: gameStatus.NEW,
      Grid: [[
        {hasFlag: false, hasMine: true, isOpened: false, minesAround: -1, x: 0, y: 0}
      ]],
      MinesCount: 0.2,
      RowCount: 1,
      FlagToggle: false,
    }
    const newMinesGrid = minesGridReducer(initialState, { type: actionTypes.INIT_MINES_GRID, rowCount: 1, colCount: 1 })
    expect(newMinesGrid).toEqual(expected)
  })

  it('should return minesGrid with cell opened when action type is OPEN_CELL', () => {
    const expected = {
      ColCount: 1,
      GameStatus: gameStatus.GAME_OVER,
      Grid: [[
        {hasFlag: false, hasMine: true, isOpened: true, minesAround: 1, x: 0, y: 0}
      ]],
      MinesCount: 0.2,
      RowCount: 1,
      FlagToggle: false,
    }
    let newMinesGrid = minesGridReducer(initialState, { type: actionTypes.INIT_MINES_GRID, rowCount: 1, colCount: 1 })
    newMinesGrid = minesGridReducer(newMinesGrid, { type: actionTypes.OPEN_CELL, cell: newMinesGrid.Grid[0][0] })
    expect(newMinesGrid).toEqual(expected)
  })

  it('should return minesGrid with cell with flag when action type is FLAG_CELL', () => {
    const expected = {
      ColCount: 1,
      GameStatus: gameStatus.IN_PROGRESS,
      Grid: [[
        {hasFlag: true, hasMine: true, isOpened: false, minesAround: -1, x: 0, y: 0}
      ]],
      MinesCount: 0.2,
      RowCount: 1,
      FlagToggle: false,
    }
    let newMinesGrid = minesGridReducer(initialState, { type: actionTypes.INIT_MINES_GRID, rowCount: 1, colCount: 1 })
    newMinesGrid = minesGridReducer(newMinesGrid, { type: actionTypes.FLAG_CELL, cell: newMinesGrid.Grid[0][0] })
    expect(newMinesGrid).toEqual(expected)
  })

  it('should return minesGrid with flag toggled when action type is FLAG_TOGGLE', () => {
    const expected = {
      ColCount: 10,
      GameStatus: gameStatus.NEW,
      Grid: [],
      MinesCount: 0,
      RowCount: 10,
      FlagToggle: true,
    }
    const newMinesGrid = minesGridReducer(initialState, { type: actionTypes.FLAG_TOGGLE })
    expect(newMinesGrid).toEqual(expected)
  })

})