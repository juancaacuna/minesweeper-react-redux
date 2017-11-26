import * as actionTypes from './actionTypes'
import * as userActions from './userActions'

export function fetchRecords() {
  return (dispatch) => {
    dispatch(fetchRecordRequest())

    const query = `
    {
      records
      {
        recordId
        level
        seconds
        user {
          email
          country
        }
      }
    }`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query }),
      mode: 'cors',
    }

    return fetch(`${process.env.REACT_APP_API_URL}/graphql`, options)
      .then(res => res.json())
      .then(json => dispatch(fetchRecordSuccess(json.data.records)))
      .catch(error => dispatch(fetchRecordError(error)))
  }
}

export function fetchRecordRequest() {
  return {
    type: actionTypes.FETCH_RECORDS
  }
}

export function fetchRecordSuccess(records) {
  return {
    type: actionTypes.FETCH_RECORDS_SUCCESS,
    records,
  }
}

export function fetchRecordError(error) {
  return {
    type: actionTypes.FETCH_RECORDS_ERROR,
    error,
  }
}

export function putRecord(record, seconds, user) {
  return (dispatch, getState) => {
    dispatch(putRecordRequest(record, user))

    if (!user.userId) {
      return dispatch(userActions.fetchUser(user.email)).then(() => {
        const fetchedUser = getState().user
        if (!fetchedUser) {
          return dispatch(userActions.postUser(user)).then(() => {
            const postedUser = getState().user
            if (postedUser) {
              return putRecordFetch(dispatch, record, seconds, postedUser)
            } else {
              return null
            }
          })
        } else {
          return putRecordFetch(dispatch, record, seconds, fetchedUser)
        }
      })
    } else {
      return putRecordFetch(dispatch, record, seconds, user)
    }
  }
}

function putRecordFetch(dispatch, record, seconds, user) {
  const putRecord = {
    seconds: seconds,
    userId: user.userId
  }

  const options = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(putRecord),
    mode: 'cors',
  }

  return fetch(`${process.env.REACT_APP_API_URL}/api/records/${record.recordId}`, options)
    .then(res => res.json())
    .then(json => dispatch(putRecordSuccess(json.data)))
    .then(() => dispatch(fetchRecords()))
    .catch(error => dispatch(putRecordError(error)))
}

export function putRecordRequest(record, user) {
  return {
    type: actionTypes.PUT_RECORD,
    record,
    user
  }
}

export function putRecordSuccess(record) {
  return {
    type: actionTypes.PUT_RECORD_SUCCESS,
    record,
  }
}

export function putRecordError(error) {
  return {
    type: actionTypes.PUT_RECORD_ERROR,
    error,
  }
}