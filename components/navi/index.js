// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    latest: Boolean,
    first: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    disPrevSrc: './images/triangle.dis@left.png',
    prevSrc: './images/triangle@left.png',
    disNextSrc: './images/triangle.dis@right.png',
    nextSrc: './images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNext: function(event) {
      (!this.properties.latest) && this.triggerEvent('next')
    },

    onPrev: function(event) {
      (!this.properties.first) && this.triggerEvent('prev')
    }
  }
})
