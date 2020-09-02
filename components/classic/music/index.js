// components/classic/music/index.js.js

const mMger = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [require('../classic-behavior')],
  properties: {
    audioUrl: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: "./images/player@pause.png",
    playSrc: "./images/player@play.png"
  },

  attached: function() {
    this.recoverStatus()
    mMger.onPlay(this.recoverStatus.bind(this))
    mMger.onPause(this.recoverStatus.bind(this))
    mMger.onEnded(this.recoverStatus.bind(this))
    mMger.onStop(this.recoverStatus.bind(this))
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        mMger.title = this.properties.title
        mMger.src = this.properties.audioUrl
        mMger.coverImgUrl = this.properties.cover
        mMger.play()
      }else {
        mMger.pause()
      }
    },

    recoverStatus: function() {
      if (mMger.src == this.properties.audioUrl) {
        this.setData({
          playing: !mMger.paused
        })
      }
    }
  }
})
