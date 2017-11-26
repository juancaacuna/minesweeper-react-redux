import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as minesGridActions from '../actions/minesGridActions'
import * as gameStatus from '../lib/gameStatus'
import formatSecondsToTime from '../lib/formatSecondsToTime'

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
      if (nextStatus === gameStatus.WIN) {
        this.props.actions.setWinnerTime(this.state.timer)
      }
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
    return formatSecondsToTime(this.state.timer)
  }

  toggleFlag() {
    if (this.props.gameStatus === gameStatus.IN_PROGRESS) {
      this.props.actions.toggleFlag()
    }
  }

  render() {
    const { flagToggle } = this.props
    const classFlagToggle = !flagToggle ? 'gray-filter' : ''

    return(
      <div className="header">
        <span className={`header-time`}>{this.getTimerValue()}</span>
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