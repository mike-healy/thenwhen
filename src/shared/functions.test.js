import { expect, test } from 'vitest'
import {
  amOrPm,
  base12Hours,
  formatTimeForInput,
  formatTime,
  stringToMinutes,
  formatModifier,
} from './functions'

test.each([
  { hour: 0, result: 'am' },
  { hour: 1, result: 'am' },
  { hour: 11, result: 'am' },
  { hour: 12, result: 'pm' },
  { hour: 23, result: 'pm' },
])
('returns am/pm $result for hour $hour', ({ hour, result }) => {
  let d = new Date();
  d.setHours(hour);

  expect(amOrPm(d)).toBe(result);
});

test.each([
  { modifier: '1:10', result: 70 },
  { modifier: '-1:24', result: -84 },
  { modifier: '-01:24', result: -84 },
  { modifier: '168:0', result: 10080 },
  { modifier: '3:8', result: 188 },
  { modifier: '2:0', result: 120 },
  { modifier: '2', result: 120 },
  { modifier: '2:', result: 120 },
  { modifier: '-0:15', result: -15 },
  { modifier: '0:15', result: 15 },
  { modifier: ':10', result: 10 },
  { modifier: '-:10', result: -10 },
  { modifier: '-2', result: -120 },
  { modifier: ':07', result: 7 },
  { modifier: '7m', result: 7 },
  { modifier: '7M', result: 7 },
  { modifier: '1h', result: 60 },
  { modifier: '1h 30m', result: 90 },
  { modifier: '1h30m', result: 90 },
  { modifier: '1h:30m', result: 90 },
  { modifier: '-1h30m', result: -90 },
  { modifier: '-1h:30m', result: -90 },
  { modifier: '-1h 30m', result: -90 },
])
('modifier string $modifier to minutes', ({ modifier, result }) => {
  expect(stringToMinutes(modifier)).toBe(result)
});

test.each([
  [9, 9],
  [12, 12],
  [13, 1],
  [23, 11],
])('converts hour component %s to 12 base', (input, output) => {
  expect(base12Hours(input)).toBe(output)
});

test.each([
  [0, 0, '00:00'],
  [3, 12, '03:12'],
  [13, 0, '13:00'],
  [23, 59, '23:59'],
])('formats dates to HH:MM string for time input %d,%d -> %s', (hour, minute, expected) => {
  const d = new Date()
  d.setHours(hour)
  d.setMinutes(minute)

  expect(formatTimeForInput(d)).toBe(expected)
});

test.each([
  [14, 30, '2:30 pm'],
  [10, 15, '10:15 am'],
  [12, 59, '12:59 pm'],
  [1, 15, '1:15 am'],
  [0, 5, '12:05 am'],
])
('formats times %d:%d to be rad and awesome', (hours, minutes, result) => {
  const d = new Date();
  d.setHours(hours);
  d.setMinutes(minutes);
  expect(formatTime(d)).toBe(result);
});

test.each([
  ['', ''],
  ['3m', '0h 3m'],
  ['1', '1h 0m'],
  ['1:10', '1h 10m'],
  ['-2h 5m', '-2h 5m'],
])
('formats modifier value for consistent display', (input, result) => {
  expect(formatModifier(input)).toBe(result);
});
