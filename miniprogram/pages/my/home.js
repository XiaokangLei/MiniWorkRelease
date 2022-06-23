const app = getApp();
const config = require('../../config/config.js')
const api = require('../../config/api.js');
import util from "../../config/time.js"

Page({
  data: {
    scrollTop: 0,
    signBtnTxt: "每日签到",
    signedDays: 0, //连续签到天数
    signed: 0,
    signedRightCount: 0,
    showVIPModal: false,
    isAdmin: false,
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
    nickName: "微信用户"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isAdmin: app.globalData.admin
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    await this.getMemberInfo()
  },

  /**
   * VIP申请
   * @param {*} e 
   */
  clickVip: async function (e) {
    let that = this
    if (that.data.isVip) {
      return;
    }

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

    console.info(that.data.applyStatus)
    if (that.data.applyStatus == 1) {
      wx.showToast({
        title: "已经申请，等待审核",
        icon: "none",
        duration: 3000
      });
      return;
    }

    that.setData({
      showVIPModal: true
    })
  },

  /**
   * 正式提交
   */
  submitApplyVip: async function (accept, templateId, that) {
    try {

      wx.showLoading({
        title: '提交中...',
      })
      console.info(app.globalData.userInfo)
      let info = {
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        accept: accept,
        templateId: templateId
      }
      let res = await api.applyVip(info)
      console.info(res)
      if (res.result) {
        wx.showToast({
          title: "申请成功，等待审批",
          icon: "none",
          duration: 3000
        });
        this.setData({
          showVIPModal: false,
          applyStatus: 1
        })
      } else {
        wx.showToast({
          title: "程序出错啦",
          icon: "none",
          duration: 3000
        });
      }

      wx.hideLoading()
    } catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none',
        duration: 1500
      })
      console.info(err)
      wx.hideLoading()
    }
  },

  /**
   * 申请VIP
   * @param {*} e 
   */
  applyVip: async function (e) {
    let that = this
    let tempalteId = 'mCInmCCR_RzdMDNvBN2ranJaTKX74-4BqP9w_R0IRKg'
    wx.requestSubscribeMessage({
      tmplIds: [tempalteId],
      success(res) {
        console.info(res)
        that.submitApplyVip(res[tempalteId], tempalteId, that).then((res) => {
          console.info(res)
        })
      },
      fail(res) {
        console.info(res)
        wx.showToast({
          title: '程序有一点点小异常，操作失败啦',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 隐藏
   * @param {}} e 
   */
  hideModal: async function (e) {
    this.setData({
      showVIPModal: false
    })
  },

  /**
   * 签到
   * @param {*} e 
   */
  btnSigned: async function (e) {
    wx.navigateTo({
      url: '/pages/my/sign/home?signedDays=' + this.data.signedDays + '&signed=' + this.data.signed + '&signedRightCount=' + this.data.signedRightCount
    })
  },
  /**
   * 获取用户信息
   * @param {} e 
   */
  getMemberInfo: async function (e) {

    let that = this
    try {
      let res = await api.getMemberInfo(app.globalData.openid)
      console.info(res)
      if (res.data.length > 0) {
        let memberInfo = res.data[0]
        that.setData({
          signedDays: memberInfo.continueSignedCount,
          signed: util.formatTime(new Date()) == memberInfo.lastSignedDate ? 1 : 0,
          signBtnTxt: util.formatTime(new Date()) == memberInfo.lastSignedDate ? "今日已签到" : "每日签到",
          vipDesc: Number(memberInfo.level) > 1 ? "VIP用户" : "点击申请VIP",
          isVip: Number(memberInfo.level) > 1,
          applyStatus: memberInfo.applyStatus,
          signedRightCount: memberInfo.sighRightCount == undefined ? 0 : memberInfo.sighRightCount,
          nickName: memberInfo.nickName,
          avatarUrl: memberInfo.avatarUrl
        })
      }
    } catch (e) {
      console.info(e)
    }
  },
  tapToUrl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
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
  show() {
    this.$showDialog({
      content: '敬请期待~',
      showCancel: false,
      success: res => {
        console.log(res);
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '小贝校招',
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
  /**
   * 展示打赏二维码
   * @param {} e 
   */
  showQrcode: async function (e) {
    wx.previewImage({
      urls: [config.moneyUrl],
      current: config.moneyUrl
    })
  },
})