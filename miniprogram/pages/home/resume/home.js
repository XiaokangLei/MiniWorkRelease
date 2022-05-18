// pages/home/resume/home.js
import api from "../../../config/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [],
    list_img: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    api.GetDataByTitle('mini-navData', 'resume').then(res => {
      this.setData({
        navData: res.data[0].sub,
        loading: false
      })
    })
    let list = []
    for (var i = 0; i < this.data.navData.length; i++) {
      list.push(this.data.navData[i].img)
    }
    this.setData({
      list_img: list
    })
  },

  downloadFile: function (e) {
    //对应的网络路径，可以是内网的或者外网
    var filePath = e.currentTarget.dataset.url;
    var fileType = e.currentTarget.dataset.type;
    //下载对应文件
    wx.downloadFile({
      url: filePath,
      success: function (res) {
        //文件路径   
        var filePath = res.tempFilePath;
        wx.openDocument({
          // 装载对应文件的路径
          filePath: filePath,
          // 指定打开的文件类型
          fileType: fileType,
          // 右上角的菜单转发分享操作
          showMenu: true,
          success: function (res) {
            console.log("打开成功");
          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res);
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