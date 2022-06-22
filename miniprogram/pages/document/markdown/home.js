// pages/document/markdown/home.js
import api from "../../../config/api.js"
import timeFormat from "../../../config/time.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "Loading...",
    time: "",
    markdown: {},
    nodata: false,
    topType: 3,
    isShow: true,
    bgVal: 'bg-orange-thin',
    iconVal: '',
    msgVal: '表格、代码向左滑动可查看全部内容',
    alignVal: 'center',
    isMask: false,
    maskBgVal: '',
    duration: 2000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    api.GetDataByTitle('mini-markdown', options.mk).then(res => {
      if (res.data.length > 0) {
        this.setData({
          markdown: app.towxml(res.data[0].markdown, 'markdown', {
            theme: wx.getSystemInfoSync().theme
          }),
          title: options.mk,
          time: timeFormat.formatTime(res.data[0]._updateTime)
        })
      } else {
        this.setData({
          nodata: true
        })
      }
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