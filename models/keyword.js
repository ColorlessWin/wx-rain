const Http = require("../utils/http")

const HIS_KEYWORD = 'his_keyword'
const MAX_HIS_NUMS = 10

const KeywordModel = {
  getHotKeyword() {
    return new Promise((resolve, reject) => {
      Http.request({ url: '/book/hot_keyword', success: resolve })
    })
  },

  getHistoryKeywordSync() {
    let keywords = wx.getStorageSync(HIS_KEYWORD)
    if (!keywords) return []
    return keywords
  },

  addToHistorySync(keyword) {
    let keywords = this.getHistoryKeywordSync()
    if (keywords.includes(keyword)) return 

    keywords.unshift(keyword)
    if (keywords.length > MAX_HIS_NUMS) keywords.pop()
    wx.setStorageSync(HIS_KEYWORD, keywords)
  }
}

module.exports = KeywordModel