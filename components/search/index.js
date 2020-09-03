// components/search/index.js
const { KeywordModel, BookModel } = require('../../models/index')

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    searchResults: [],
  },

  attached() {
    let historyWords = KeywordModel.getHistoryKeywordSync()
    this.setData({ historyWords })
    KeywordModel.getHotKeyword().then(res => {
      this.setData({ hotWords: res.hot })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancelHandle(event) {
      this.triggerEvent('close')
    },

    onConfirmHandle(event) {
      let keyword = event.detail.value || event.detail.tag
      BookModel.search(0, keyword).then(res => {
        KeywordModel.addToHistorySync(keyword)
        this.setData({ 
          searchResults: res.books,
          searching: true
        })
      })
    }
  }
})
