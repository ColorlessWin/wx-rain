const config = require('../config')

const tips = {
  1: '抱歉，出现了一个错误',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'期刊不存在'
}

class Http {
  request(params) {

    if (!params.method) params.method = 'GET'

    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        "content-type": "application/json",
        "appkey": config.appkey
      },

      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }       
      },

      fail: (err)=> {
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (error_code) error_code = 1
    let tip = tips[error_code], def_err_msg = tips[1]
    wx.showToast({
      title: tip? tip: def_err_msg,
      icon: 'none',
      duration: 2000
    })
  }
}


module.exports = new Http  