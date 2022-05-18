// pages/schedule/datail/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    html: "",
    title: "",
    time: "",
    id: "",
    sc_show: false,
    dz_show: false,
    showstar: "true"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    let time = ""
    if(options.time){
      time = options.time
    }
    this.setData({
      info: JSON.parse(options.info),
      html: app.towxml(decodeURIComponent(options.html), 'html', {
        theme: wx.getSystemInfoSync().theme
      }),
      title: options.title,
      time: time,
      id: options.id,
      showstar: options.showstar
    })
    let info = this.data.info
    info["html"] = decodeURIComponent(options.html)
    info["press_id"] = options.id
    info["Type"] = "xz"
    this.setData({
      info: info
    })
    wx.cloud.callFunction({
      name: "details_cs",
      data: {
        id: this.data.id,
      },
    }).then(res => {
      this.setData({
        sc_show: res.result.collect,
        dz_show: res.result.statr
      })
    })
  },

  statr_sc(e) {
    let openid = wx.getStorageSync("openid")
    if (openid) {
      let that = this
      wx.showToast({
        title: "玩命加载中",
        icon: 'loading',
        mask: true,
        duration: 2000
      })
      wx.cloud.callFunction({
        name: e.currentTarget.dataset.id,
        data: {
          press: this.data.info,
        },
      }).then(res => {
        wx.showToast({
          title: res.result,
          duration: 1000,
          icon: 'none',
          mask: true
        })
        wx.cloud.callFunction({
          name: "details_cs",
          data: {
            id: this.data.id,
          },
        }).then(res => {
          this.setData({
            sc_show: res.result.collect,
            dz_show: res.result.statr
          })
        })
      })
    } else {
      wx.showToast({
        title: '您尚未注册/登录',
        duration: 1000,
        icon: 'none',
        mask: true
      })
    }
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