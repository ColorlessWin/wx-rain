const Http = require('../utils/http')

const LikeModel = {
  like(art_id, category, behavior) {
    let url = behavior? '/like': '/like/cancel'
    Http.request({
      url,
      method: "POST",
      data: {
        art_id,
        type: category
      }
    })
  }
}

module.exports = LikeModel