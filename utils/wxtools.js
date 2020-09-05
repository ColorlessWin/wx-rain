const { Promisic } = require('./common')

function isAuth() {
  return new Promise((resolve, reject) => {
    Promisic(wx.getSetting)().then(res => {
      resolve( res.authSetting['scope.userInfo']? true: false )
    })
  })
}

function getUserInfo() {
  return Promisic(wx.getUserInfo)()
}

module.exports = {
  isAuth,
  getUserInfo
}