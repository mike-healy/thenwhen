const amOrPm = (date: Date) => date.getHours() >= 12 ? 'pm' : 'am'

const stringToMinutes = (modifier: string): number => {
  const emptyToZero = (value: string) => value === '' ? '0' : value ?? '0'

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
    return parseInt(parts[1]) * -1;
  }

  parts[0] = emptyToZero(parts[0]);
  parts[1] = emptyToZero(parts[1]);

  const hours = parseInt(parts[0])

  return hours >= 0 && parts[0] !== '-0'
    ? hours*60 + parseInt(parts[1])
    : hours*60 - parseInt(parts[1])
}

const stringHMToMinutes = (phrase: string): number => {
  const parts = phrase.toLowerCase().split('h')
  const minutes = Math.abs(parseInt(parts[0])) * 60 + parseInt(parts[1])

  return phrase.startsWith('-')
    ? minutes * -1
    : minutes;
};

const zeroPad = (part: number): string => part < 10 ? `0${part}` : part.toString()

const base12Hours = (hours: number): number => hours >= 13 ? hours - 12 : hours

const formatTime = (date: Date): string => {
  if (date.getHours() === 0) {
    return `12:${zeroPad(date.getMinutes())} ${amOrPm(date)}`
  }

  return `${base12Hours(date.getHours())}:${zeroPad(date.getMinutes())} ${amOrPm(date)}`
}

const formatTimeForInput = (date: Date): string => `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`

const formatModifier = (modifier: string): string => {
  if (!modifier) {
    return ''
  }

  let mins = stringToMinutes(modifier)
  const negative = mins <= 0
  mins = Math.abs(mins)

  const formatReturn = (value: string): string => negative ? `-${value}` : value.toString()

  if (mins < 60) {
    return formatReturn(`0h ${mins}m`)
  }

  const hours = Math.floor(mins/60)
  return formatReturn(`${hours}h ${mins-hours*60}m`)
}

const minutesToHM = (minutes: number): string => {
  const sign = minutes < 0 ? '-' : ''
  minutes = Math.abs(minutes)

  if (minutes < 60) {
    return `${sign}${minutes}m`
  }

  const hours = Math.floor(minutes / 60)
  minutes = minutes % 60

  return `${sign}${hours}h ${minutes}m`
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
