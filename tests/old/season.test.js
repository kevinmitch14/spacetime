import test from 'tape'
import spacetime from './_lib.js'

let south = [
  'Africa/Johannesburg',
  'Brazil/Acre',
  'Australia/Canberra',
  'Asia/Jakarta',
  'America/Argentina',
  'Africa/Lusaka'
]
let north = [
  'America/Detroit',
  'Mexico/BajaSur',
  'Canada/Eastern',
  'Europe/Oslo',
  'Asia/Baghdad',
  'Asia/Istanbul'
]

test('season-by-hemisphere', (t) => {
  //june
  let s = spacetime('june 6 2017', 'Canada/Eastern')
  south.forEach((tz) => {
    s = s.goto(tz)
    t.equal(s.season(), 'winter', tz + ' june-winter')
  })
  north.forEach((tz) => {
    s = s.goto(tz)
    t.equal(s.season(), 'summer', tz + ' june-summer')
  })
  t.end()
})

test('set season - north', (t) => {
  let s = spacetime('winter', 'Canada/Eastern')
  t.equal(s.monthName(), 'december', 'winter .month()')
  t.equal(s.date(), 1, 'q1 .date()')

  s = spacetime('spring', 'Canada/Eastern')
  t.equal(s.monthName(), 'march', 'spring .month()')
  t.equal(s.date(), 1, 'spring .date()')

  s = spacetime('summer', 'Canada/Eastern')
  t.equal(s.monthName(), 'june', 'summer .month()')
  t.equal(s.date(), 1, 'summer .date()')

  s = spacetime('fall', 'Canada/Eastern')
  t.equal(s.monthName(), 'september', 'fall .month()')
  t.equal(s.date(), 1, 'fall .date()')

  s = spacetime('fall 2001', 'Canada/Eastern')
  t.equal(s.monthName(), 'september', 'fall year .month()')
  t.equal(s.date(), 1, 'fall year .date()')
  t.equal(s.year(), 2001, 'fall .year()')

  s = spacetime('fall of 1960', 'Canada/Eastern')
  t.equal(s.monthName(), 'september', 'fall of year .month()')
  t.equal(s.date(), 1, 'fall of year .date()')
  t.equal(s.year(), 1960, 'fall of .year()')

  t.end()
})

test('season - south', (t) => {
  let s = spacetime('nov 11 2022', 'australia/adelaide')
  t.equal(s.season(), 'spring', 'south-spring')
  s = s.add(4, 'weeks')
  t.equal(s.season(), 'summer', 'south-summer')
  t.end()
})
