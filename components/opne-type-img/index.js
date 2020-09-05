// components/opne-type-img/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickHandle(event) {
      let types = ['getPhoneNumber', 'getUserInfo', 'launchApp', 'openSetting', 'contact']
      let openType = this.properties.openType
      if (types.indexOf(openType) >= 0) {
        let eventType = openType.toLowerCase()
        this.triggerEvent(eventType, event.detail)
      }
    },

    onErrorHandle(event) {
      this.triggerEvent('error', event.detail)
    }
  }
})
