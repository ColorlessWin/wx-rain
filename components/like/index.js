// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    liked: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: './images/like@dis.png',
    likedSrc: './images/like.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      if (this.properties.readOnly) return

      let liked = this.properties.liked
      let count = this.properties.count
      
      count = liked? count - 1: count + 1
      liked = !liked
      this.setData({ count, liked })

      this.triggerEvent('like', { behavior: liked })
    }
  }
})
