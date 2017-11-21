import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as minesGridActions from '../actions/minesGridActions'
import * as gameStatus from '../lib/gameStatus'

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 0,
      timerInterval: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextStatus = nextProps.gameStatus
    if (nextStatus === gameStatus.WIN ||
      nextStatus === gameStatus.GAME_OVER ||
      nextStatus === gameStatus.NEW) {
      this.stopTimer()
    }
    if (this.props.gameStatus === gameStatus.NEW &&
      nextStatus === gameStatus.IN_PROGRESS) {
      this.startTimer()
    }
    if (nextStatus === gameStatus.NEW) {
      this.resetTimer()
    }
  }

  startTimer = function(){
    this.setState({
      timer: 0,
      timerInterval: setInterval(() => {
        this.setState({ timer: this.state.timer + 1 }) }
      , 1000)
    })
  }
  
  stopTimer = function(){
    clearInterval(this.state.timerInterval)
  }

  resetTimer = function(){
    this.setState({ timer: 0 })
  }
  
  getTimerValue = function(){
    const date = new Date(null)
    date.setSeconds(this.state.timer)
    return date.toISOString().substr(11, 8)
  }

  toggleFlag() {
    this.props.actions.toggleFlag()
  }

  render() {
    const { flagToggle, rowCount } = this.props
    const classFlagToggle = !flagToggle ? 'gray-filter' : ''
    const classHeaderTime = rowCount <= 5 ? 'header-time-small' : ''

    return(
      <div className="header">
        <span className={`header-time ${classHeaderTime}`}>{this.getTimerValue()}</span>
        <div className={`flag-toggle ${classFlagToggle}`} onClick={this.toggleFlag.bind(this)}>
          <span role="img" aria-label="flag">🚩</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameStatus: state.minesGrid.GameStatus,
    flagToggle: state.minesGrid.FlagToggle,
    rowCount: state.minesGrid.RowCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        minesGridActions
      ),
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)