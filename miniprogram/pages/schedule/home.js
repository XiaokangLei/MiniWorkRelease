import api from "../../config/api.js"

Page({
  data: {
    scrollTop: 0,
    radio: 1,
    check: false,
    tabValue: 0,
    list: [],
    listhot: [],
    listteachin: []
  },
  onLoad() {
    api.GetRecruitment('mini-recruitment', 0).then(res => {
      this.setData({
        list: res.data
      })
    })
    api.GetRecruitment('mini-recruitment', 1).then(res => {
      this.setData({
        listhot: res.data
      })
    })
    api.GetRecruitment('mini-teachin', 2).then(res => {
      this.setData({
        listteachin: res.data
      })
    })

  },
  tabNavChange(e) {
    let that = this
    that.setData({
      tabValue: e.detail.index
    })
    if (e.detail.index == 0) {
      that.setData({
        list: that.data.list
      })
    } else if (e.detail.index == 1) {
      that.setData({
        list: that.data.list2
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
      url: "/pages/schedule/datail/home?id=" + id + "&time=" + time + "&title=" + title + "&html=" + encodeURIComponent(html) + "&info=" + info + "&showstar=true"
    })
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 触底加载评论

    try {
      wx.showLoading({
        title: '加载中...',
      })
      setTimeout(() => {
        let list = this.data.list
        list.push(...this.data.list)
        this.setData({
          list: list
        })
        wx.hideLoading()
      }, 500)

    } catch (err) {
      console.info(err)
    } finally {}
  },
})