import config from './config.js'
import parse from './parse/index.js'
import methods from './api/index.js'

const SpaceTime = function (input, tz) {
  //the IANA code for the current timezone
  this.tz = tz || config.fallbackTz
  //the holy UNIX moment
  this.epoch = parse(input, this.tz)
}

Object.assign(SpaceTime.prototype, methods)

// add method aliases
const aliases = [
  ['hours', 'hour'],
  ['minutes', 'minute'],
  ['seconds', 'second'],
  ['minus', 'subtract'],
  ['plus', 'add'],
]
aliases.forEach(a => {
  SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]]
})


export default SpaceTime