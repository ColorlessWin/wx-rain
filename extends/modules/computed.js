const { 
  defineObserver, 
  removeObserver,
  watch
} = require('../libs/observer')

const gather = (c, e) => () => c.push(e)

module.exports = (context, computeds) => {
  const data = context.data
  const dataKeys = Object.keys(context.data)
  const compKeys = Object.keys(computeds)
  
  let needUpdate = {}
  let depends = {}
  compKeys.forEach(comp_key => {
    let dep_list = depends[comp_key] = []
    let temp_obs = []
    dataKeys.forEach(data_key => {
      let _gather = gather(dep_list, data_key)
      defineObserver(data, data_key, undefined, _gather)
      temp_obs.push({ 
        data_key, 
        gather: _gather 
      })
    })
    let computer = computeds[comp_key]
    needUpdate[comp_key] = computer.call(context)
    for (let obs of temp_obs)
      removeObserver(data, obs.data_key, "getter", obs.gather)
  })

  Object.keys(depends).forEach(computer => {
    let update = function() {
      let result = computeds[computer].call(context)
      context.setData({ [computer]: result })
    }
    let watchs = depends[computer].reduce((prev, curr) => {
      prev[curr] = update
      return prev
    }, {})
    watch(data, watchs)
  })

  context.setData(needUpdate)
}