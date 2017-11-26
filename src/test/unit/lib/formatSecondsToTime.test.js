import formatSecondsToTime from '../../../lib/formatSecondsToTime'

describe('MinesGrid', () => {
  it('should return 00:02:00 for 120 seconds', () => {
    const expected = '00:02:00'
    expect(formatSecondsToTime(120)).toEqual(expected)
  })

  it('should return 01:00:00 for 3600 seconds', () => {
    const expected = '01:00:00'
    expect(formatSecondsToTime(3600)).toEqual(expected)
  })

  it('should return 00:00:10 for 10 seconds', () => {
    const expected = '00:00:10'
    expect(formatSecondsToTime(10)).toEqual(expected)
  })
})