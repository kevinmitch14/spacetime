// the average time between solstices, on timeanddate.com
// approx 88 days, 23 hours, 30 mins
const oneYear = 31557060000

const halfYear = 15855660000
// strangely, this does not seem to be exactly half.
// const halfYear = oneYear / 2

// the 2015 winter solstice
const oneWinter = 1450759620000

const goForward = function (epoch) {
  let num = oneWinter + oneYear
  while (num < epoch) {
    num += oneYear
  }
  return num
}
const goBackward = function (epoch) {
  let num = oneWinter - oneYear
  while (num > epoch) {
    num -= oneYear
  }
  return num
}

const solstice = function (s) {
  let found = null
  if (s.epoch > oneWinter) {
    found = goForward(s.epoch)
  } else {
    found = goBackward(s.epoch)
  }
  let winter = s._from(found)
  // ensure it's the right year
  if (winter.year() < s.year()) {
    winter = winter._from(winter.epoch + oneYear)
  }
  if (winter.year() > s.year()) {
    winter = winter._from(winter.epoch - oneYear)
  }
  let summer = winter._from(winter.epoch - halfYear)
  return {
    winter: winter,
    summer: summer,
  }
}
// const equinox = function (s) {
//   return {
//     summer: null,
//     winter: null,
//   }
// }
export default solstice
