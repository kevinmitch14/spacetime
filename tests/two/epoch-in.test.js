import test from 'tape'
import spacetime from './_lib.js'
import { misc, vancouver2023, karachi2011, adelaide2021, panama1980, jan1s } from './times/index.js'

test('karachi 2011 epoch-iso alignments', (t) => {
  karachi2011.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, iso)
  })
  t.end()
})

test('panama 1980 epoch-iso alignments', (t) => {
  panama1980.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, iso)
  })
  t.end()
})

test('vancouver epoch-iso alignments', (t) => {
  vancouver2023.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).fmt('iso-medium')
    t.equal(str, iso, iso)
  })
  t.end()
})

// test('adelaide 2021 epoch-iso alignments', (t) => {
//   adelaide2021.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).fmt('iso-medium')
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })

// test('random epoch-iso alignments', (t) => {
//   misc.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).fmt('iso-medium')
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })