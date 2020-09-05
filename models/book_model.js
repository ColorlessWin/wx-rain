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
  },

  getBookfavor(book_id) {
    return new Promise((resolve, reject) => {
      Http.request({ url: `/book/${book_id}/favor`, success: resolve })
    })
  },

  getBookfavorCount() {
    return new Promise((resolve, reject) => {
      Http.request({ url: '/book/favor/count', success: resolve })
    })
  },

  postComment(book_id, content) {
    return new Promise((resolve, reject) => {
      Http.request({ 
        url: `/book/add/short_comment`, 
        method: "POST", 
        data: {
          book_id,
          content
        },
        success: resolve })
    })
  },

  search(offset, limit, keyword) {
    return new Promise((resolve, reject) => {
      Http.request({ 
        url: '/book/search',
        data: {
          count: limit,
          start: offset,
          q: keyword
        },
        success: resolve
      })
    })
  }
}

module.exports = BookModel