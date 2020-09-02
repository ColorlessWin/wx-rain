// pages/classic.js
const { ClassicModel, LikeModel } = require('../../models/index')

Component ({
  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    latest: true,
    first: false
  },

  methods: {
    onLikeHandle: function(event) {
      let behavior = event.detail.behavior
      LikeModel.like(this.data.classic.id, this.data.classic.type, behavior)
    },

    onNextHandle: function(event) {
      ClassicModel.getPreviousCalssic(this.data.classic.index, (res)=> {
        this._setClassicData(res)
      })
    },

    onPrevHandle: function(event) {
      ClassicModel.getNextCalssic(this.data.classic.index, (res)=> {
        this._setClassicData(res)
      })
    },

    _setClassicData(classic) {
      let index = classic.index
      this.setData({
        classic,
        latest: ClassicModel.isLatest(index),
        first: ClassicModel.isFirst(index)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached: function(options) {
    ClassicModel.getLatest((res) => {
      this._setClassicData(res)
    })
  },
})