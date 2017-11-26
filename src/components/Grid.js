import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as minesGridActions from '../actions/minesGridActions'
import * as gameStatus from '../lib/gameStatus'
import Cell from './Cell'

class Grid extends React.Component {

  componentDidMount() {
    const gridSize = 10
    this.props.actions.initMinesGrid(gridSize, gridSize)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.minesGrid.ColCount !== nextProps.minesGrid.ColCount &&
      nextProps.minesGrid.GameStatus !== gameStatus.NEW){
      this.props.actions.initMinesGrid(
        nextProps.minesGrid.RowCount,
        nextProps.minesGrid.ColCount
      )
    }
  }

  openCell(cell) {
    if (this.props.minesGrid.GameStatus === gameStatus.IN_PROGRESS) {
      this.props.actions.openCell(cell)
    }
  }

  flagCell(cell) {
    if (this.props.minesGrid.GameStatus === gameStatus.IN_PROGRESS) {
      this.props.actions.flagCell(cell)
    }
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