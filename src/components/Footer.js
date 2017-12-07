import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as minesGridActions from '../actions/minesGridActions'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

export class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: this.props.rowCount
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sliderValue: nextProps.rowCount })
  }

  resetGame() {
    const { sliderValue } = this.state
    this.props.actions.initMinesGrid(sliderValue, sliderValue)
    if (this.props.flagToggle) {
      this.props.actions.toggleFlag()
    }
  }

  handleSliderChange = value => {
    this.setState({
      sliderValue: value
    })
  };

  render() {
    const { sliderValue } = this.state
    return(
      <div className="footer">
        <div className="footer-row">
          <div className="footer-left">
            <span className="footer-inner-label">LEVEL</span>
            <Slider
              min={4}
              max={20}
              value={sliderValue}
              handleLabel={`${sliderValue}`}
              onChange={this.handleSliderChange}
            />
          </div>
          <div className="footer-right">
            <span className="footer-again" onClick={this.resetGame.bind(this)}>RESET</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rowCount: state.minesGrid.RowCount,
    flagToggle: state.minesGrid.FlagToggle,
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)