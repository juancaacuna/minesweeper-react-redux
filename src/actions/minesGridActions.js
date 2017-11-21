import * as actionTypes from './actionTypes'

export function initMinesGrid(rowCount, colCount) {
  return initGridSuccess.apply(this, arguments)
}

function initGridSuccess(rowCount, colCount) {
  return {
    type: actionTypes.INIT_MINES_GRID,
    rowCount,
    colCount
  }
}

export function openCell(cell) {
  return openCellSuccess.apply(this, arguments)
}

function openCellSuccess(cell) {
  return {
    type: actionTypes.OPEN_CELL,
    cell
  }
}

export function flagCell(cell) {
  return flagCellSuccess.apply(this, arguments)
}

function flagCellSuccess(cell) {
  return {
    type: actionTypes.FLAG_CELL,
    cell
  }
}

export function toggleFlag() {
  return toggleFlagSuccess()
}

function toggleFlagSuccess() {
  return {
    type: actionTypes.FLAG_TOGGLE
  }
}