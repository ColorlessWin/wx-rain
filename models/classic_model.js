const Http = require('../utils/http')

const CLASSIC_CACHE = {}
let latest = 0

const isCached = function(index) { return CLASSIC_CACHE[index]? true: false }

const Cache = function(index, data) { 
  return JSON.parse(JSON.stringify(CLASSIC_CACHE[index] = data))
}

const fromCache = function(index) {
  let data = CLASSIC_CACHE[index]
  return JSON.parse(JSON.stringify(data))
}

const resolve = function(callback) {
  let _callback = function(result, ...args) {
    let index = result.index
    result = isCached(index)? fromCache(index): Cache(index, result)
    callback(result, ...args)
  }
  return _callback
}

const ClassicModel = {
  getLatest(callback) {
    let _callback = function(result, ...args) {
      latest = result.index
      callback = resolve(callback)
      callback(result, ...args)
    }
    Http.request({ url: '/classic/latest', success: _callback })
  },

  getNextCalssic(index, callback) {
    let next_index = index + 1
    if (isCached(next_index)) callback(fromCache(next_index)) 
    else {
      callback = resolve(callback)
      Http.request({ url: `/classic/${index}/next`, success: callback })
    }
  },

  getPreviousCalssic(index, callback) {
    let next_index = index - 1
    if (isCached(next_index)) callback(fromCache(next_index))
    else {
      callback = resolve(callback)
      Http.request({ url: `/classic/${index}/previous`, success: callback })
    }
  },

  isLatest(index) {
    return index === 1
  },

  isFirst(index) {
    return latest === index
  }
}

module.exports = ClassicModel