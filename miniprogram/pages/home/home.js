const app = getApp();
import api from "../../config/api.js"

Page({
  data: {
    scrollTop: 0,
    swiperList: [],
    list: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this
    //有openid跳授权计算积分
    if (options.openid) {
      let shareOpenId = options.openid
      app.checkUserInfo(function (userInfo, isLogin) {
        if (!isLogin) {
          that.setData({
            showLogin: true
          })
        } else {
          that.setData({
            userInfo: userInfo
          });
        }
      });

      if (that.data.userInfo) {
        let info = {
          shareOpenId: shareOpenId,
          nickName: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl
        }
        await api.addShareDetail(info)
      }
    }
    // 获取首页数据
    api.GetDataByKind('mini-index-r', 'home').then(res => {
      this.setData({
        swiperList: res.data[0].swiperList,
        list: res.data[0].list
      })
    })
  },
  
  onShow() {

  },
  // 监听用户滑动页面事件。
  onPageScroll(e) {
    // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
    // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  tapToUrl(e) {
    // 页面跳转，tabBar和非tabBar都可以跳转
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      fail: function (res) {
        wx.switchTab({
          url: e.currentTarget.dataset.url
        })
      }
    })
  },
})