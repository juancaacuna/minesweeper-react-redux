import React from 'react'
import emojiFlags from 'emoji-flags'

export default function RecordsRow({record}) {
  const flag = record.country ? emojiFlags.countryCode(record.country) : null
  const cellElements = Object.keys(record).map(key => {
    if (key !== 'recordId') {
      if (flag && key === 'country') {
        return (
          <td key={`${record.recordId}_${key}`}>
            <span role="img" aria-label="flag">{flag ? flag.emoji : null}</span>
          </td>
        )
      } else {
        return (
          <td key={`${record.recordId}_${key}`}>
            {record[key]}
          </td>
        )
      }
    }
    return null
  })
  return (
    <tr>
      {cellElements}
    </tr>
  )
}