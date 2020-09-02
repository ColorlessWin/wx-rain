const Http = require('../utils/http')

const BookModel = {
  getHotBooks() {
    return new Promise((resolve, reject) => {
      Http.request({ url: '/book/hot_list', success: resolve })
    })
  },

  getShortComment(book_id) {
    return new Promise((resolve, reject) => {
      Http.request({ url: `/book/${book_id}/short_comment`, success: resolve })
    })
  },

  getBookDetail(book_id) {
    return new Promise((resolve, reject) => {
      Http.request({ url: `/book/${book_id}/detail`, success: resolve })
    })
  }
}

module.exports = BookModel