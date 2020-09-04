// components/search/index.js
(function(){ require = getApp().require })()
const { KeywordModel, BookModel } = require('models/index')
const pagination = require('behaviors/pagination')

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pagination],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    keyword: '',
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
    OnTolowerHandle(event) {
      this.load()
    },

    onCancelHandle(event) {
      this.triggerEvent('close')
    },

    onConfirmHandle(event) {
      let keyword = event.detail.value || event.detail.tag
      this._open_result_panel()
      this.refresh()
      this.setData({ keyword }, ()=> {
        this.load()
      })
    },

    filling(offset, limit) {
      return new Promise((resolve, reject) => {
        BookModel.search(offset, limit, this.data.keyword).then(res => {
          resolve({
            total: res.total || 0,
            data: res.books,
            empty: (res.books.length === 0)
          })
        })
      })    
    },

    _close_result_panel() {
      this.setData({ searching: false })
    },

    _open_result_panel() {
      this.setData({ searching: true })
    }
  }
})
