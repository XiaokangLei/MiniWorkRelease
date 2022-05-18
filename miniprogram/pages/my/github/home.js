// pages/my/github/github.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList: [{
        title: '需求设计',
        desc: '2021/12/21'
      },
      {
        title: '模块确定&基本页面开发',
        desc: '2022/1/21'
      },
      {
        title: '后端数据库开发',
        desc: '2022/2/21'
      },
      {
        title: '点赞、收藏、评论等功能开发',
        desc: '2022/3/21'
      },
      {
        title: '数据收集，测试上线，试运营',
        desc: '2022/5/1'
      },
      {
        title: '开源代码',
        desc: '2022/5/25'
      },
      {
        title: '开源单独UI代码',
        desc: '2022/6/15'
      },
      {
        title: '开源示例数据库',
        desc: '2022/7/15'
      }
    ],
    num: 5,
  },
  tapCopy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success() {
        wx.showToast({
          title: '复制成功！',
          icon: 'none'
        })
      },
      fail() {
        wx.showToast({
          title: '复制失败！',
          icon: 'none'
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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