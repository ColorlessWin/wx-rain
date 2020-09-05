// pages/my/my.js
const wxtools = require('../../utils/wxtools')
const { ClassicModel, BookModel } = require('../../models/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeCount: 0,
    authorized: false,
    userInfo: {},
    favor: [],

    unAuthSrc: '../../images/my/my.png'
  },

  onGetUserInfo(event) {
    if (!this.data.authorized)
      this.userAuthorized()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyFavor()
    this.getMyFavorBookCount()
  },

  async userAuthorized() {
    let isAuthd = await wxtools.isAuth()
    if (isAuthd) {
      let res = await wxtools.getUserInfo()
      this.setData({
        userInfo: res.userInfo,
        authorized: true 
      })
    }
  },

  getMyFavor() {
    ClassicModel.getFavor((res) => {
      this.setData({ favor: res })
    })
  },

  getMyFavorBookCount() {
    BookModel.getBookfavorCount().then(res => {
      let count = res.count
      this.setData({ likeCount: count })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})