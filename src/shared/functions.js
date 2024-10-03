const amOrPm = (date) => date.getHours() >= 12 ? 'pm' : 'am'

const stringToMinutes = (modifier) => {
  const emptyToZero = (value) => value === '' ? 0 : value ?? 0

  const parts = modifier.split(':')

  if (parts.length === 1) {
    return parseInt(parts[0]) * 60;
  }

  // Negative minutes only
  if (parts[0] === '-') {
    return parts[1] * -1;
  }

  parts[0] = emptyToZero(parts[0]);
  parts[1] = emptyToZero(parts[1]);

  const hours = parseInt(parts[0])

  return hours >= 0 && parts[0] !== '-0'
    ? hours*60 + parseInt(parts[1])
    : hours*60 - parseInt(parts[1])
}

const zeroPad = (part) => part < 10 ? `0${part}` : part

const formatTime = (date) => `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())} ${amOrPm(date)}`

export {
  amOrPm,
  stringToMinutes,
  formatTime,
  zeroPad,
}
