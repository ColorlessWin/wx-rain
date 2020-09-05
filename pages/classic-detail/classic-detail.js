// pages/classic-detail/classic-detail.js
(function(){ require = getApp().require })()
const { ClassicModel, LikeModel } = require('models/index')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
  },

  onLoad: function(options) {
    ClassicModel.getClassic(options.type, options.id, (res)=> {
      this._setClassicData(res)
    })
  },

  onLikeHandle: function(event) {
    let behavior = event.detail.behavior
    LikeModel.like(this.data.classic.id, this.data.classic.type, behavior)
  },

  _setClassicData(classic) {
    this.setData({
      classic,
    })
  },
})