const amOrPm = (date) => date.getHours() >= 12 ? 'pm' : 'am'

const stringToMinutes = (modifier) => {
  const emptyToZero = (value) => value === '' ? 0 : value ?? 0

  const parts = modifier.split(':')

  if (parts.length === 1) {
    if (parts[0].toLowerCase().includes('h') && parts[0].toLowerCase().includes('m')) {
      return stringHMToMinutes(parts[0])
    }

    return parts[0].toLowerCase().includes('m')
      ? parseInt(parts[0])
      : parseInt(parts[0]) * 60;
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

const stringHMToMinutes = (phrase) => {
  const parts = phrase.toLowerCase().split('h')
  const minutes = Math.abs(parseInt(parts[0])) * 60 + parseInt(parts[1])

  return phrase.startsWith('-')
    ? minutes * -1
    : minutes;
};

const zeroPad = (part) => part < 10 ? `0${part}` : part

const base12Hours = (hours) => hours >= 13 ? hours - 12 : hours

const formatTime = (date) => {
  if (date.getHours() === 0) {
    return `12:${zeroPad(date.getMinutes())} ${amOrPm(date)}`
  }

  return `${base12Hours(date.getHours())}:${zeroPad(date.getMinutes())} ${amOrPm(date)}`
}

const formatTimeForInput = (date) => `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`

export {
  amOrPm,
  stringToMinutes,
  formatTime,
  formatTimeForInput,
  zeroPad,
  base12Hours,
}
