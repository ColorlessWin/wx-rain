// pages/book-detail/book-detail.js
const { BookModel } = require('../../models/index')
const { computed } = require('../../extends/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: -1,
    comment: [],
    book: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    computed(this, {
      one() {
        console.log(this)
        return this.data.comment.length + this.data.book_id
      },
      test() {
        return this.data.comment.length + 'hello'
      },
    })

    let book_id = this.data.book_id = options.bid
    BookModel.getShortComment(book_id)
    .then(comment => {
      this.setData({ comment: comment.comments })
    })
      
    BookModel.getBookDetail(book_id)
    .then(book => {
      this.setData({ book })
    })
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})