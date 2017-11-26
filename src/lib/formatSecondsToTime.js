export default function formatSecondsToTime(seconds) {
  if (!seconds || isNaN(seconds) || !seconds < 0) {
    seconds = 0 
  }
  const date = new Date(null)
  date.setSeconds(seconds)
  return date.toISOString().substr(11, 8)
}