import * as gameStatus from './gameStatus'

const MinesGrid = function(info) {
  this.Grid = (info && info.Grid) || []
  this.RowCount = (info && info.RowCount) || 10
  this.ColCount = (info && info.ColCount) || 10
  this.MinesCount = (info && info.MinesCount) || 0
  this.GameStatus = (info && info.GameStatus) || gameStatus.NEW
}

MinesGrid.prototype.SetValues = function(info) {
  this.Grid = info.Grid || []
  this.RowCount = info.RowCount || 10
  this.ColCount = info.ColCount || 10
  this.MinesCount = info.MinesCount || 0
  this.GameStatus = info.GameStatus || gameStatus.NEW
}

MinesGrid.prototype.InitGrid = function() {
  this.GameStatus = gameStatus.NEW
  this.MinesCount = (this.RowCount * this.ColCount) / 5
  let minesGrid = []
  for(let row = 0; row < this.RowCount; row++){
    minesGrid.push([])
    for(let col = 0; col < this.ColCount; col++){
      minesGrid[row].push({
        x: col,
        y: row,
        minesAround: -1,
        isOpened: false,
        hasMine: false,
        hasFlag: false
      })
    }
  }
  // Put mines in random cells
  for(let i = 0; i < this.MinesCount;){
    const randomRow = Math.floor(Math.random() * this.RowCount)
    const randomCol = Math.floor(Math.random() * this.ColCount)
    const cell = minesGrid[randomRow][randomCol]
    if(!cell.hasMine){
      cell.hasMine = true
      i++
    }
  }
  this.Grid = minesGrid
}

MinesGrid.prototype.OpenCell = function(cell) {
  if(cell && !cell.isOpened){
    if(cell.hasMine){
      this.OpenAllCells()
      this.GameStatus = gameStatus.GAME_OVER
      return
    }
    if (this.GameStatus === gameStatus.NEW) {
      this.GameStatus = gameStatus.IN_PROGRESS
    }
    this.SetCellInfo(cell, { isOpened: true, hasFlag: false })
    if(cell.minesAround === 0){
      this.OpenAround(cell)
    }
  }
}

MinesGrid.prototype.CountMinesAround = function(cell) {
  const cellsAround = this.GetCellsAround(cell)
  const minesAroundCount = cellsAround.reduce((count, cell) => {
    return count = count + cell.hasMine
  }, 0)
  return minesAroundCount
}

MinesGrid.prototype.SetCellInfo = function(cell, cellInfo) {
  const minesAround = this.CountMinesAround(cell)
  cell.minesAround = minesAround
  cell.isOpened = cellInfo.isOpened
  cell.hasFlag = cellInfo.hasFlag
}

MinesGrid.prototype.FlagCell = function(cellInfo) {
  const cell = this.Grid[cellInfo.y][cellInfo.x]
  cell.hasFlag = !cell.hasFlag
  if (this.GameStatus === gameStatus.NEW) {
    this.GameStatus = gameStatus.IN_PROGRESS
  }
}

MinesGrid.prototype.OpenAround = function(cell){
  const cellsAround = this.GetCellsAround(cell)
  cellsAround.forEach(c => {
    if (!c.hasMine && !c.isOpened) {
      this.OpenCell(c)
    }
  })
}

MinesGrid.prototype.GetCellsAround = function(cell){
  const cellsAround = []
  for(let row = -1; row <= 1; row++){
    for(let col = -1; col <= 1; col++){
      let y = cell.y + row
      let x = cell.x + col
      if (this.Grid[y] && this.Grid[y][x]){
        cellsAround.push(this.Grid[y][x])
      }
    }
  }
  return cellsAround
}

MinesGrid.prototype.OpenAllCells = function(){
  this.Grid.forEach(row => {
    row.forEach(cell => {
      this.SetCellInfo(cell, { isOpened: true, hasFlag: false })
    })
  })
}

export default MinesGrid