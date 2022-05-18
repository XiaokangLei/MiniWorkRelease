// pages/my/star/home.js
import api from "../../../config/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xw_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let openid = wx.getStorageSync("openid")
    if (options.kind == 'star') {
      api.GetMyInfoByType('mini-star', 'xz', openid).then(res => {
        this.setData({
          xw_list: res.data,
          loding: false,
          mytitle: "我的点赞"
        })
      })
    } else if (options.kind == 'collect') {
      api.GetMyInfoByType('mini-collect', 'xz', openid).then(res => {
        this.setData({
          xw_list: res.data,
          loding: false,
          mytitle: "我的收藏"
        })
      })
    }

  },

  tapToUrl: function (e) {
    let info = e.currentTarget.dataset.info
    info["html"] = ""
    info = JSON.stringify(info)
    let html = e.currentTarget.dataset.html
    let title = e.currentTarget.dataset.title
    let time = ""
    if (e.currentTarget.dataset.time) {
      time = e.currentTarget.dataset.time
    }
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/schedule/datail/home?id=" + id + "&time=" + time + "&title=" + title + "&html=" + encodeURIComponent(html) + "&info=" + info + "&showstar=false"
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