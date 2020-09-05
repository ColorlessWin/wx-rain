function Promisic(func) {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      params = Object.assign( params, { success: resolve, fail: reject })
      func( params )
    })
  }
}

module.exports = {
  Promisic
}