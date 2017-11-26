import * as actionTypes from './actionTypes'

export function fetchUser(email) {
  return (dispatch) => {
    dispatch(fetchUserRequest(email))

    const query = `
    {
      users(prop:"email" value:"${email}")
      {
        userId
        email
        country
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
      .then(json => dispatch(fetchUserSuccess(json.data.users)))
      .catch(error => dispatch(fetchUserError(error)))
  }
}

export function fetchUserRequest(filter) {
  return {
    type: actionTypes.FETCH_USER,
    filter
  }
}

export function fetchUserSuccess(users) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    users,
  }
}

export function fetchUserError(error) {
  return {
    type: actionTypes.FETCH_USER_ERROR,
    error,
  }
}

export function postUser(user) {
  return (dispatch) => {
    dispatch(postUserRequest(user))

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      mode: 'cors',
    }

    return fetch(`${process.env.REACT_APP_API_URL}/api/users`, options)
      .then(res => res.json())
      .then(json => dispatch(postUserSuccess(json.data)))
      .catch(error => dispatch(postUserError(error)))
  }
}

export function postUserRequest(user) {
  return {
    type: actionTypes.POST_USER,
    user
  }
}

export function postUserSuccess(user) {
  return {
    type: actionTypes.POST_USER_SUCCESS,
    user,
  }
}

export function postUserError(error) {
  return {
    type: actionTypes.POST_USER_ERROR,
    error,
  }
}