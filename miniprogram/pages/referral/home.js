import api from "../../config/api.js"

Page({
  data: {
    scrollTop: 0,
    list: [],
    bgload: "/static/logo.png",
    loading: true
  },
  onLoad() {
    // 获取首页数据
    api.GetReferral('mini-referral-r').then(res => {
      this.setData({
        list: res.data,
        loading: false
      })
    })

  },
  toProductDetail(e) {
    let info = JSON.stringify(e.currentTarget.dataset.info);
    let logo = e.currentTarget.dataset.logo;
    let name = e.currentTarget.dataset.company;
    let comment = e.currentTarget.dataset.comment;
    wx.navigateTo({
      url: '/pages/referral/detail/home?info=' + info + '&name=' + name + '&comment=' + comment + '&logo=' + logo
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '校招、社招内推',
    }

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
})