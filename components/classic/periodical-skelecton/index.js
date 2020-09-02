// components/classic/classic-skelecton/index.js
const ClassicBehavior = require('../classic-behavior')

Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },

  behaviors: [ClassicBehavior],
  properties: {
    tag: String,
    type: {
      type: String,
      value: 'moive'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagSrc: {
      moive: "./images/movie@tag.png",
      essay: "./images/essay@tag.png",
      music: "./images/music@tag.png"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})