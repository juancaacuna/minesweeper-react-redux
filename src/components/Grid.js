import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as minesGridActions from '../actions/minesGridActions'
import * as gameStatus from '../lib/gameStatus'
import Cell from './Cell'

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cellBgColors: []
    }
  }

  componentDidMount() {
    const gridSize = 10
    this.props.actions.initMinesGrid(gridSize, gridSize)
    this.setState({
      cellBgColors: this.generateCellBgColors(gridSize)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { minesGrid } = nextProps

    if(this.props.minesGrid.ColCount !== minesGrid.ColCount &&
      minesGrid.GameStatus !== gameStatus.NEW){
      this.props.actions.initMinesGrid(
        minesGrid.RowCount,
        minesGrid.ColCount
      )
      this.setState({
        cellBgColors: this.generateCellBgColors(minesGrid.RowCount)
      })
    }
  }

  openCell(cell) {
    const { minesGrid } = this.props
    const status = minesGrid.GameStatus
    if (status === gameStatus.NEW || status === gameStatus.IN_PROGRESS) {
      this.props.actions.openCell(cell)
    }
  }

  flagCell(cell) {
    const { minesGrid } = this.props
    const status = minesGrid.GameStatus
    if (status === gameStatus.NEW || status === gameStatus.IN_PROGRESS) {
      this.props.actions.flagCell(cell)
    }
  }

  generateCellBgColors(gridSize) {
    return Array.apply(null, Array(gridSize)).map((y) => {
      return Array.apply(null, Array(gridSize)).map((x, i) => {
        return (Math.floor(Math.random() * 3) + 1) * 100
      })
    })
  }

  render() {
    const {
      minesGrid
    } = this.props

    const GridRow = ({row}) => {
      const cellElements = row.map(cell => {
        return (
          <td key={`${cell.x}${cell.y}`} className="cell-td">
            <Cell
              info={cell}
              gridRowCount={minesGrid.RowCount}
              flagToggle={minesGrid.FlagToggle}
              openCell={this.openCell.bind(this)}
              flagCell={this.flagCell.bind(this)}
              bgColor={this.state.cellBgColors[cell.y][cell.x]}
            />
          </td>
        );
      })
      return (
        <tr>
          {cellElements}
        </tr>
      )
    }

    const rowElements = minesGrid.Grid.map(row => <GridRow key={row[0].y} row={row} />)

    return(
      <table className="grid">
        <tbody>
          {rowElements}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    minesGrid: state.minesGrid,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators(
      Object.assign({},
        minesGridActions
      ),
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)