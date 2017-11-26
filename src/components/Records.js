import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as minesGridActions from '../actions/minesGridActions'
import * as recordsActions from '../actions/recordsActions'
import * as userActions from '../actions/userActions'
import formatSecondsToTime from '../lib/formatSecondsToTime'
import * as gameStatusList from '../lib/gameStatus'
import MDSpinner from 'react-md-spinner'
import RecordsRow from './RecordsRow'
import NewRecordForm from './NewRecordForm'

const form = 'records'

export class Records extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: [],
      showWindow: true,
      showRecords: true,
      showNewRecord: false,
      title: 'MINESWEEPER WAR'
    }
    this.sayings = ['WHAT!?', 'NO WAY!', 'JEEZ!', 'KILLER!', 'HOLLY!']
  }
  
  componentWillMount() {
    if (!this.props.records || this.props.records.length === 0) {
      this.props.actions.fetchRecords()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.gameStatus, nextProps.gameStatus)
    const { records, user } = this.props
    const { gameStatus, gameLevel, timeAchieved } = nextProps
    const sayings = this.sayings

    if (JSON.stringify(nextProps.records) !== JSON.stringify(records)) {
      const newRecords = nextProps.records.map(r => {
        return {
          recordId: r.recordId,
          level: r.level,
          seconds: formatSecondsToTime(r.seconds),
          user: r.user ? r.user.email.split('@')[0].substring(0, 21) : '---',
          country: r.user ? r.user.country : '',
        }
      })
      this.setState({ records: newRecords })
    }

    if (records && gameStatus === gameStatusList.WIN && this.props.gameStatus !== gameStatus) {
      const record = records.find(r => r.level === gameLevel)
      if (record && (record.seconds === 0 || timeAchieved < record.seconds)) {
        const saying = sayings[Math.floor(Math.random() * sayings.length)]
        if (user) {
          this.props.actions.putRecord(record, timeAchieved, user)
          this.setState({
            showWindow: true,
            showRecords: true,
            showNewRecord: false,
            title: `${saying} NEW RECORD!`,
          })
        } else {
          this.setState({
            showWindow: true,
            showRecords: false,
            showNewRecord: true,
            title: `${saying} NEW RECORD!`,
          })
        }
      } else {
        this.setState({
          showWindow: true,
          showRecords: true,
          showNewRecord: false,
          title: 'YOU WIN!',
        })
      }
    }
  }

  playGame() {
    this.setState({ showWindow: false, showRecords: false, showNewRecord: false })
  }

  submitNewRecord = (values) => {
    const { records, gameLevel, timeAchieved } = this.props
    const record = records.find(r => r.level === gameLevel)
    if (record) {
      // Try to get country
      fetch('http://freegeoip.net/json/')
      .then(data => data.json())
      .then(json => {
        const country = json ? json.country_code : null
        this.putRecord(record, timeAchieved, values.email, country)
      })
      .catch((err) => this.putRecord(record, timeAchieved, values.email, null))
    }
  }

  putRecord(record, timeAchieved, email, country) {
    const user = { userId: null, email, country }
    this.props.actions.putRecord(record, timeAchieved, user)
    this.setState({ showWindow: true, showRecords: true, showNewRecord: false })
  }
  
  render() {
    const { records, showWindow, showRecords, showNewRecord, title } = this.state
    const { formFields, formErrors } = this.props
    const rowElements = records.map(record =>
      <RecordsRow key={record.recordId} record={record} />
    )

    return(
      showWindow &&
      <div className="records-wrapper">
        { showRecords &&
        <div className="records-grid-wrapper">
          <span className="records-title">{title}</span>
          { (!records || records.length === 0) &&
            <span className="records-spinner"><MDSpinner size="60" singleColor="rgb(86, 216, 0)"  /></span>
          }
          { records.length > 0 &&
          <table className="records-grid">
            <tbody>
              <tr>
                <th>LEVEL</th>
                <th>RECORD</th>
                <th>WHO?</th>
                <th></th>
              </tr>
              {rowElements}
            </tbody>
          </table>
          }
          <span className="records-button" onClick={this.playGame.bind(this)}>PLAY</span>
        </div>
        }
        { showNewRecord &&
        <div className="records-grid-wrapper">
          <span className="records-title">{title}</span> 
          <NewRecordForm
            {...this.props}
            fields={formFields}
            errors={formErrors}
            onSubmit={this.submitNewRecord} />
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameStatus: state.minesGrid.GameStatus,
    gameLevel: state.minesGrid.RowCount,
    timeAchieved: state.minesGrid.TimeAchieved,
    records: state.records,
    user: state.user,
    formErrors: state.form[form] ? state.form[form].syncErrors : {},
    formFields: state.form[form] ? state.form[form].fields : {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        minesGridActions,
        recordsActions,
        userActions
      ),
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form,
})(Records))