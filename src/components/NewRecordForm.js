import React from 'react'
import { Field } from 'redux-form'

let NewRecordForm = props => {
  const { handleSubmit, onSubmit, errors, fields, pristine, submitting } = props
  const hasErrors = errors && Object.keys(errors).length > 0
  const disabledClass = submitting || pristine || hasErrors ? 'records-button-disabled' : ''

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          name="email"
          id="email"
          className={`records-input ${errorClass(fields, errors, 'email')}`}
          component="input"
          type="email"
          placeholder="EMAIL"
          validate={[ required, email, maxLength50 ]}
        />
      </div>
      <button type="submit"
        className={`records-button ${disabledClass}`}
        disabled={hasErrors}>
        BECOME HISTORY
      </button>
    </form>
  )
}

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const maxLength50 = maxLength(50)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

const errorClass = (fields, errors, key) => {
  if (isVisited(fields, key)) {
    return errors && errors[key] ? 'records-input-error' : ''
  }
  return ''
}
const isVisited = (fields, key) => {
  return fields && fields[key] && fields[key].visited
}

export default NewRecordForm