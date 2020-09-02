// components/book/cover/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickHandle: function(event) {
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${this.properties.book.id}`,
      })
    }
  }
})
