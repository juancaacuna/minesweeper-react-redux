import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMine: props.info.hasMine,
      hasFlag: props.info.hasFlag,
      isOpened: props.info.isOpened,
      minesAround: props.info.minesAround
    }
  }

  openCell() {
    if (this.props.flagToggle) {
      this.props.flagCell(this.props.info)
    } else {
      this.props.openCell(this.props.info)
    }
  }

  flagCell(e) {
    e.preventDefault();
    if(!this.state.isOpened){
      this.props.flagCell(this.props.info)
    }
  }

  render() {
    const {
      isOpened,
      hasMine,
      hasFlag,
      minesAround
    } = this.state

    let className = 'cell-closed'
    if (isOpened) {
      className = minesAround === 0 ? 'cell-empty' : className
      className = minesAround > 0 ? 'cell-number' : className
      className = hasMine ? 'cell-bomb' : className
    } else {
      className = hasFlag ? 'cell-flag' : className
    }

    const rowsCount = this.props.gridRowCount
    let classSize = ''
    classSize = rowsCount >= 19 ? 'cell-size-3' : classSize
    classSize = rowsCount >= 14 && rowsCount < 19 ? 'cell-size-4' : classSize
    classSize = rowsCount > 7 && rowsCount < 11 ? 'cell-size-7' : classSize
    classSize = rowsCount <= 7 ? 'cell-size-10' : classSize

    const CellElement = () => {
      return (
        <div className={`cell ${className} ${classSize}`}>
          { isOpened && hasMine &&
            <span role="img" aria-label="bomb">💣</span>
          }
          { !isOpened && hasFlag &&
            <span role="img" aria-label="flag">🚩</span>
          }
          { isOpened && minesAround > 0 && !hasMine &&
            <span className="innerText">{minesAround}</span>
          }
        </div>
      )
    }
    return (
      <div id="cell-wrapper" onClick={this.openCell.bind(this)} onContextMenu={this.flagCell.bind(this)}>
        <CellElement />
      </div>
    );
  }
}