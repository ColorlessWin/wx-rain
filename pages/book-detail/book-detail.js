// pages/book-detail/book-detail.js
const { BookModel } = require('../../models/index')
const { getShortComment } = require('../../models/book_model')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: -1,
    comment: [],
    book: {},
    favor: {},
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let book_id = this.data.book_id = options.bid

    let comment = BookModel.getShortComment(book_id),
        book = BookModel.getBookDetail(book_id),
        favor = BookModel.getBookfavor(book_id)

    wx.showLoading({ title: '加载中...' })
    Promise.all([comment, book, favor])
      .then(results => {
        this.setData({ 
          comment: results[0].comments,
          book: results[1],
          favor: results[2]
        })
        wx.hideLoading()
      })    
  },  

  onPostHandle(event) {
    let comment = event.detail.tag
    BookModel.postComment(this.data.book_id, comment)
      .then(rse => {
        wx.showToast({ title: '+ 1' })
        this.data.comment.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comment: this.data.comment,
          posting: false
        })
      })
  },

  onSwitchPostHandle(event) {
    let posting = this.data.posting
    this.setData({ posting: !posting })
  }
})