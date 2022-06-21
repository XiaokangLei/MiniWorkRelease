// pages/home/company/home.js
import api from "../../../config/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    api.GetDataByTitle('mini-navData', 'company').then(res => {
      this.setData({
        company: res.data[0].sub
      })
    })
  },
  tapToUrl(e) {
    let kind = (e.currentTarget.dataset.url).split("=")[1]
    wx.navigateTo({
        url: '/pages/document/offer/home?kind=' + kind
    })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})