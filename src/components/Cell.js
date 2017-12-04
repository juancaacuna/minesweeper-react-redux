import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMine: props.info.hasMine,
      hasFlag: props.info.hasFlag,
      isOpened: props.info.isOpened,
      minesAround: props.info.minesAround,
      bgColor: props.bgColor
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
      minesAround,
      bgColor
    } = this.state

    let className = 'cell-closed'
    if (isOpened) {
      className = minesAround === 0 ? 'cell-empty' : className
      className = minesAround > 0 ? 'cell-number' : className
      className = hasMine ? 'cell-bomb' : className
    } else {
      className = hasFlag ? 'cell-flag' : className
    }

    if (className === 'cell-closed') {
      className = `${className} bg-green-${bgColor}`
    }

    const rowsCount = this.props.gridRowCount

    const CellElement = () => {
      return (
        <div className={`cell ${className}`}>
          { isOpened && hasMine &&
            <span role="img" aria-label="bomb" className="cell-icon">💣</span>
          }
          { !isOpened && hasFlag &&
            <span role="img" aria-label="flag" className="cell-icon">🚩</span>
          }
          { isOpened && minesAround > 0 && !hasMine &&
            <span className="cell-text">{minesAround}</span>
          }
        </div>
      )
    }
    return (
      <div id="cell-wrapper" className={`cell-wrapper cell-level-${rowsCount}`} onClick={this.openCell.bind(this)} onContextMenu={this.flagCell.bind(this)}>
        <CellElement />
      </div>
    );
  }
}