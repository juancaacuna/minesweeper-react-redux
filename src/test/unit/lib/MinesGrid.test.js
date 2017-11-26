import * as actionTypes from '../../../actions/actionTypes'
import MinesGrid from '../../../lib/MinesGrid'
import * as gameStatus from '../../../lib/gameStatus'
import { setTimeout } from 'timers';

const minesGrid = new MinesGrid()

describe('MinesGrid', () => {
  it('should have initial default values', () => {
    const expected = {
      ColCount: 10,
      GameStatus: gameStatus.NEW,
      Grid: [],
      MinesCount: 0,
      RowCount: 10,
    }
    expect(minesGrid).toEqual(expected)
  })

  it('should set values', () => {
    const expected = {
      ColCount: 4,
      GameStatus: gameStatus.IN_PROGRESS,
      Grid: [],
      MinesCount: 0,
      RowCount: 4,
    }
    minesGrid.SetValues(expected)
    expect(minesGrid).toEqual(expected)
  })

  it('should init Grid', () => {
    const initial = {
      ColCount: 1,
      GameStatus: gameStatus.NEW,
      Grid: [],
      MinesCount: 0,
      RowCount: 1,
    }
    const expected = {
      ColCount: 1,
      GameStatus: gameStatus.NEW,
      Grid: [[{ hasFlag: false, hasMine: true, isOpened: false, minesAround: -1, x: 0, y: 0 }]],
      MinesCount: 0.2,
      RowCount: 1,
    }
    minesGrid.SetValues(initial)
    minesGrid.InitGrid()
    expect(minesGrid).toEqual(expected)
  })

  it('should open cell', () => {
    const expected = {
      ColCount: 1,
      GameStatus: gameStatus.WIN,
      Grid: [[{ hasFlag: false, hasMine: true, isOpened: true, minesAround: 1, x: 0, y: 0 }]],
      MinesCount: 0.2,
      RowCount: 1,
    }
    minesGrid.InitGrid()
    minesGrid.OpenCell(minesGrid.Grid[0][0])
    expect(minesGrid).toEqual(expected)
  })

  it('should flag cell', () => {
    const expected = {
      ColCount: 1,
      GameStatus: gameStatus.WIN,
      Grid: [[{ hasFlag: true, hasMine: true, isOpened: false, minesAround: -1, x: 0, y: 0 }]],
      MinesCount: 0.2,
      RowCount: 1,
    }
    minesGrid.InitGrid()
    minesGrid.FlagCell(minesGrid.Grid[0][0])
    expect(minesGrid).toEqual(expected)
  })

  it('should count mines around', () => {
    const initial = {
      ColCount: 3,
      GameStatus: gameStatus.NEW,
      Grid: [],
      MinesCount: 0,
      RowCount: 3,
    }
    minesGrid.SetValues(initial)
    minesGrid.InitGrid()
    const count = minesGrid.CountMinesAround(minesGrid.Grid[1][1])
    expect(count).toBeLessThanOrEqual(2)
    expect(count).toBeGreaterThanOrEqual(0)
  })

  it('should set cell info', () => {
    minesGrid.SetCellInfo(minesGrid.Grid[1][1], { isOpened: true, hasFlag: false })
    expect(minesGrid.Grid[1][1].isOpened).toEqual(true)
    expect(minesGrid.Grid[1][1].minesAround).toBeLessThanOrEqual(2)
    expect(minesGrid.Grid[1][1].minesAround).toBeGreaterThanOrEqual(0)
  })

  it('should get cells around', () => {
    const cellsAround = minesGrid.GetCellsAround(minesGrid.Grid[1][1])
    expect(cellsAround.length).toEqual(9)
  })

  it('should open cells around', () => {
    minesGrid.InitGrid()
    // Find any cell in Row 1, with no mine
    const cell = minesGrid.Grid[1].find(c => !c.hasMine)
    minesGrid.OpenAround(cell)
    const cellsAround = minesGrid.GetCellsAround(cell)
    expect(cellsAround.filter(c => !c.isOpened && !c.hasMine).length).toEqual(0)
  })

  it('should open all cells in the grid', () => {
    minesGrid.InitGrid()
    minesGrid.OpenAllCells()
    const openedCells = minesGrid.Grid.map(r => {
      return r.filter(c => !c.isOpened).length
    })
    const expected = Array.apply(null, { length: minesGrid.RowCount }).map(() => 0)
    expect(openedCells).toEqual(expected)
  })

  it('should return true if user if winner', () => {
    minesGrid.InitGrid()
    minesGrid.Grid.forEach(row => {
      row.forEach(cell => {
        if (!cell.hasMine) {
          minesGrid.OpenCell(cell)
        } else {
          minesGrid.FlagCell(cell)
        }
      })
    })
    expect(minesGrid.IsWinner()).toEqual(true)
  })

  it('should swap mine if first one has a mine', () => {
    minesGrid.InitGrid()
    const cell = minesGrid.Grid[2][1]
    cell.hasMine = true
    minesGrid.SwapMine(cell)
    expect(cell.hasMine).toEqual(false)
  })
})