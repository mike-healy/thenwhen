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

const formatModifier = (modifier) => {
  if (!modifier) {
    return ''
  }

  let mins = stringToMinutes(modifier)
  const negative = mins <= 0
  mins = Math.abs(mins)

  const formatReturn = (value) => negative ? `-${value}` : value

  if (mins < 60) {
    return formatReturn(`0h ${mins}m`)
  }

  const hours = Math.floor(mins/60)
  return formatReturn(`${hours}h ${mins-hours*60}m`)
}

const minutesToHM = (minutes) => {
  const sign = minutes < 0 ? '-' : '';
  minutes = Math.abs(minutes);

  if (minutes < 60) {
    return `${sign}${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return `${sign}${hours}h ${minutes}m`;
};

export {
  amOrPm,
  stringToMinutes,
  formatTime,
  formatTimeForInput,
  zeroPad,
  base12Hours,
  formatModifier,
  minutesToHM,
}
