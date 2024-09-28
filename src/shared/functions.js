const amOrPm = (date) => date.getHours() >= 12 ? 'PM' : 'AM'

const stringToMinutes = (modifier) => {
  const parts = modifier.split(':')

  const hours = parseInt(parts[0])

  return hours >= 0
    ? hours*60 + parseInt(parts[1])
    : hours*60 - parseInt(parts[1])
}

const zeroPad = (part) => part < 10 ? `0${part}` : part

const formatTime = (date) => `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`

export { amOrPm, stringToMinutes, formatTime, zeroPad }
