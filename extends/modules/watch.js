module.exports = (context, watchs) => {
  require('../libs/observer').watch(context.data, watchs, context)
}

