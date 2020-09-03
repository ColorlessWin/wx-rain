const __OBS_CAPTURE__ = Symbol('captures') 
const __OBS_REACTIVE__ = Symbol('reactives')

function getReactives(obj, key) {
  let __reactives = obj[__OBS_REACTIVE__]
    ? obj[__OBS_REACTIVE__]
    : obj[__OBS_REACTIVE__] = { }  
  let r_calls = __reactives[key]
    ? __reactives[key]
    : __reactives[key] = []  

  return r_calls  
}

function getCaptures(obj, key) {
  let __captures = obj[__OBS_CAPTURE__] 
    ? obj[__OBS_CAPTURE__]
    : obj[__OBS_CAPTURE__] = { }

  let c_calls = __captures[key]
    ? __captures[key]
    : __captures[key] = []

  return c_calls  
}

function defineObserver(obj, key, reactive, capture) {

  if (capture)
    var c_calls = getCaptures(obj, key)
  if (reactive)
    var r_calls = getReactives(obj, key)
  
  if (reactive && typeof reactive == 'function')
    r_calls.push(reactive)
  if (capture && typeof capture == 'function') 
    c_calls.push(capture)  

  let val = obj[key]
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      c_calls && c_calls.forEach(call=> call())
      return val
    },

    set(newVal) {
      let oldVal = val
      val = newVal
      if (oldVal !== newVal) 
        r_calls && r_calls.forEach(call=> call())
    }
  })
}

function clearObserver(obj) {
  [obj[__OBS_CAPTURE__], obj[__OBS_REACTIVE__]].forEach(obs => {
    obs && Object.keys(obs).forEach(field => {
      obs[field].splice(0, obs[field].length)
      delete obs[field]
    })
  })
  delete obj[__OBS_CAPTURE__]
  delete obj[__OBS_REACTIVE__]
}

function removeObserver(obj, key, type = "getter", obs) {
  let obs_list = (type == 'getter')
    ? getCaptures(obj, key)
    : getReactives(obj, key)

  let index = obs_list.indexOf(obs) 
  if (index => 0) obs_list.splice(index, 1)
  if (obs_list.length == 0) {
    (type == "getter")
      ? delete obj[__OBS_CAPTURE__][key]
      : delete obj[__OBS_REACTIVE__][key]
  }
}

function watch(obj, watchs, ctx) {
  Object.keys(watchs).forEach(key => {
    if (obj[key] && typeof watchs[key] === 'function') 
      defineObserver(obj, key, watchs[key].bind(ctx || obj))
  })
}


module.exports = {
  defineObserver,
  clearObserver,
  removeObserver,
  watch
}