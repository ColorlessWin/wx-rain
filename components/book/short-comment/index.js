// components/book/short-comment/index.js
const { computed } = require('../../../extends/index')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments: {
      type: Array,
      value: []
    }
  },

  created() {
    computed(this, {
      shortCmt() {
        let comments = this.properties.comments
        return comments.slice(0, 12)
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

  }
})
