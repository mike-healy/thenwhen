import { expect, test } from 'vitest'
import { amOrPm, base12Hours, stringToMinutes } from './functions'

test.each([
  { hour: 0, result: 'am' },
  { hour: 1, result: 'am' },
  { hour: 11, result: 'am' },
  { hour: 12, result: 'pm' },
  { hour: 23, result: 'pm' },
])
('returns $result for hour $hour', ({ hour, result }) => {
  let d = new Date();
  d.setHours(hour);

  expect(amOrPm(d)).toBe(result);
})

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
])
('modifier string $modifier to minutes', ({ modifier, result }) => {
  expect(stringToMinutes(modifier)).toBe(result)
})

test.each([
  [9, 9],
  [12, 12],
  [13, 1],
  [23, 11],
])('converts hour component %s to 12 base', (input, output) => {
  expect(base12Hours(input)).toBe(output)
})
