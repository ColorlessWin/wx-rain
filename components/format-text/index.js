// components/format-text/index.js
(function(){ require = getApp().require })()
const { computed } = require('extends/index')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ' '
    }
  },

  created() {
    computed(this, {
      fmtText() {
        let lines = this.properties.text.split(/\\n/g)
        return lines
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
