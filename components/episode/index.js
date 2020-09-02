// components/episode/index.js
const { computed } = require('../../extends/index')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 1
    }
  },

  created() {
    computed(this, {
      formatIndex() {
        let index = this.properties.index
        return index < 10? `0${index}`: index
      }
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    month: '',
    year: ''
  },

  attached: function() {
    let date = new Date()
    let month = this.data.months[date.getMonth()]
    let year = date.getFullYear()

    this.setData({ month, year })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
