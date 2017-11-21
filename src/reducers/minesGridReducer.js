import * as actionTypes from '../actions/actionTypes'
import * as gameStatus from '../lib/gameStatus'
import MinesGrid from '../lib/MinesGrid'

const initialState = {
  Grid: [],
  RowCount: 0,
  ColCount: 0,
  MinesCount: 0,
  GameStatus: gameStatus.NEW,
  FlagToggle: false,
}
let minesGrid = null

export default function (state = initialState, action) {
  if (!minesGrid) {
    minesGrid = new MinesGrid(initialState)
  }
  minesGrid.SetValues(state)
  const newState = Object.assign({}, state)

  switch (action.type) {
    case actionTypes.INIT_MINES_GRID: {
      minesGrid.RowCount = action.rowCount
      minesGrid.ColCount = action.colCount
      minesGrid.InitGrid()
      break
    }
    case actionTypes.OPEN_CELL: {
      minesGrid.OpenCell(action.cell)
      break
    }
    case actionTypes.FLAG_CELL: {
      minesGrid.FlagCell(action.cell)
      break
    }
    case actionTypes.FLAG_TOGGLE: {
      newState.FlagToggle = !newState.FlagToggle
      break
    }
    default: break
  }
  return {
    ...newState,
    Grid: minesGrid.Grid,
    RowCount: minesGrid.RowCount,
    ColCount: minesGrid.ColCount,
    MinesCount: minesGrid.MinesCount,
    GameStatus: minesGrid.GameStatus
  }
}
