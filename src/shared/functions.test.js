import { expect, test } from 'vitest'
import { amOrPm, stringToMinutes } from './functions'

test.each([
  { hour: 0, result: 'AM' },
  { hour: 1, result: 'AM' },
  { hour: 11, result: 'AM' },
  { hour: 12, result: 'PM' },
  { hour: 23, result: 'PM' },
])
('returns $result for hour $hour', ({ hour, result }) => {
  let d = new Date();
  d.setHours(hour);

  expect(amOrPm(d)).toBe(result);
})

test.each([
  { modifier: '1:10', result: 70 },
  { modifier: '2:0', result: 120 },
  { modifier: '-1:24', result: -84 },
  { modifier: '168:0', result: 10080 },
  { modifier: '3:8', result: 188 },
])
('modifier string $modifier to minutes', ({ modifier, result }) => {
  expect(stringToMinutes(modifier)).toBe(result)
})
