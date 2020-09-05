// components/preview/index.js
const computed = require('../../extends/modules/computed')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  created() {
    computed(this, {
      typeText() {
        let typeMap = { 100: "电影", 200: "音乐", 300: "句子" }
        return typeMap[this.data.classic.type || '']
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      let type = this.data.classic.type
      let id = this.data.classic.id
      wx.navigateTo({       
        url: `/pages/classic-detail/classic-detail?type=${type}&id=${id}`,
      })
    }
  }
})
