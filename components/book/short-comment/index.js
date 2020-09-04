// components/book/short-comment/index.js
(function(){ require = getApp().require })()
const { computed } = require('extends/index')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    limit: {
      type: Number,
      value: 10
    },
    comments: {
      type: Array,
      value: []
    }
  },

  created() {
    computed(this, {
      shortCmt() {
        let limit = this.properties.limit
        let comments = this.properties.comments
        return comments.slice(0, limit)
      }
    })
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
    onTagClickHandle(event) {
      this.triggerEvent('tagclick', { tag: event.detail.tag })
    }
  }
})
