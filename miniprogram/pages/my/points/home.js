// pages/my/points/home.js

import api from "../../../config/api.js"
import util from "../../../config/time.js"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPoints: 0,
    showBanner: false,
    showBannerId: "",
    signBtnTxt: "马上签到",
    signed: 0,
    signedRightCount: 0,
    signedDays: 0,
    showVIPModal: false,
    isVip: false,
    applyStatus: 0,
    showLogin: false,
    showPointDescModal: false, //积分说明弹窗
    highLighted: false,
    highLightBtnTxt: "立即兑换",
    shareList: [{
      nickName: "待邀请",
      bgUrl: "bg-gary",
      icon: "cicon-person-add-o",
      style: ""
    }, {
      nickName: "待邀请",
      bgUrl: "bg-gary",
      icon: "cicon-person-add-o"
    }, {
      nickName: "待邀请",
      bgUrl: "bg-gary",
      icon: "cicon-person-add-o"
    }, {
      nickName: "待邀请",
      bgUrl: "bg-gary",
      icon: "cicon-person-add-o"
    }, {
      nickName: "待邀请",
      bgUrl: "bg-gary",
      icon: "cicon-person-add-o"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    let that = this
    // let advert = app.globalData.advert
    // if (advert.pointsStatus) {
    //   that.setData({
    //     showBanner: true,
    //     showBannerId: advert.pointsId
    //   })
    // }

    // app.checkUserInfo(function (userInfo, isLogin) {
    //   if (!isLogin) {
    //     that.setData({
    //       showLogin: true
    //     })
    //   } else {
    //     that.setData({
    //       userInfo: userInfo
    //     });
    //   }
    // });

    let res = await api.getMemberInfo(app.globalData.openid)
    if (res.data.length > 0) {
      let memberInfo = res.data[0]
      that.setData({
        signedDays: memberInfo.continueSignedCount,
        totalPoints: memberInfo.totalPoints,
        signed: util.formatTime(new Date()) == memberInfo.lastSignedDate ? 1 : 0,
        signBtnTxt: util.formatTime(new Date()) == memberInfo.lastSignedDate ? "已经完成" : "马上签到",
        isVip: Number(memberInfo.level) > 1,
        applyStatus: memberInfo.applyStatus,
        signedRightCount: memberInfo.sighRightCount == undefined ? 0 : memberInfo.sighRightCount
      })
    }

    if (advert.taskVideoStatus) {
      that.loadInterstitialAd(advert.taskVideoId);
    }

    let shareList = await api.getShareDetailList(app.globalData.openid, util.formatTime(new Date()))
    let defaultShareList = that.data.shareList
    console.info(shareList)
    if (shareList.data.length > 0) {
      let i = 0
      shareList.data.forEach(item => {
        defaultShareList[i].nickName = item.nickName
        defaultShareList[i].bgUrl = ""
        defaultShareList[i].icon = ""
        defaultShareList[i].style = "background-image:url(" + item.avatarUrl + ");"
        i++
      });

      that.setData({
        shareList: defaultShareList
      })
    }
  },

  onUnload: function () {
    if (rewardedVideoAd && rewardedVideoAd.destroy) {
      rewardedVideoAd.destroy()
    }
  },

  show2() {
    this.$showDialog({
      content: '这是一个模态弹窗',
      showCancel: false,
      success: res => {
        console.log(res);
      }
    });
  },

  /**
   * 签到列表
   * @param {*} e 
   */
  clickSigned: async function (e) {
    wx.navigateTo({
      url: '../sign/sign?signedDays=' + this.data.signedDays + '&signed=' + this.data.signed + '&signedRightCount=' + this.data.signedRightCount
    })
  },

  /**
   * 展示积分使用明细
   * @param {} e 
   */
  showUsingDetail: async function (e) {
    wx.navigateTo({
      url: './detail/home'
    })
  },

  /**
   * 阅读文章
   * @param {*} e 
   */
  clickVip: async function (e) {
    let that = this
    if (that.data.isVip) {
      return;
    }
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
   * 隐藏
   * @param {}} e 
   */
  hideModal: async function (e) {
    this.setData({
      showVIPModal: false
    })
  },

  /**
   * 展示积分说明
   * @param {} e 
   */
  showPointDesc: function (e) {
    this.setData({
      showPointDescModal: true
    })
  },

  /**
   * 隐藏积分说明
   * @param {*} e 
   */
  hidePointDesc: function (e) {
    this.setData({
      showPointDescModal: false
    })
  },

  /**
   * 初始化广告视频
   * @param {} excitationAdId 
   */
  loadInterstitialAd: function (excitationAdId) {
    let that = this;
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: excitationAdId
      })
      rewardedVideoAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      rewardedVideoAd.onError((err) => {
        console.log(err);
        wx.showToast({
          title: "视频广告出现问题啦",
          icon: "none",
          duration: 3000
        });
      })
      rewardedVideoAd.onClose((res) => {
        if (res && res.isEnded) {
          //新增积分
          wx.showLoading({
            title: '积分更新中...',
          })

          let info = {
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl,
          }

          api.addPoints("taskVideo", info).then((res) => {
            console.info(res)
            if (res.result) {
              that.setData({
                totalPoints: Number(that.data.totalPoints) + 50,
              })
              wx.showToast({
                title: "恭喜获得50积分",
                icon: "none",
                duration: 3000
              });
            } else {
              wx.showToast({
                title: "程序有些小异常",
                icon: "none",
                duration: 3000
              });
            }
            wx.hideLoading()
          })
        } else {
          wx.showToast({
            title: "完整看完视频才能获得积分哦",
            icon: "none",
            duration: 3000
          });
        }
      })
    }
  },

  /**
   * 点击任务视频
   */
  clickVideoTask: function () {
    let that = this;
    rewardedVideoAd.show()
      .catch(() => {
        rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(err => {
            wx.showToast({
              title: "视频广告出现问题啦",
              icon: "none",
              duration: 3000
            });
          })
      })
  },

  /**
   * 分享邀请
   */
  onShareAppMessage: function () {
    return {
      title: '有内容的小程序',
      imageUrl: 'https://test-91f3af.tcb.qcloud.la/sharepic.jpg?sign=6a33faf314c17c7ed2e234911d312b93&t=1585835244',
      path: '/pages/index/index?openid=' + app.globalData.openid
    }
  },

  /**
   * 展示打赏二维码
   * @param {} e 
   */
  showMoneryUrl: async function (e) {
    wx.previewImage({
      urls: [config.moneyUrl],
      current: config.moneyUrl
    })
  },

  /**
   * 申请VIP
   * @param {*} e 
   */
  applyVip: async function (e) {

    wx.showLoading({
      title: '提交中...',
    })
    console.info(app.globalData.userInfo)
    let info = {
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
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
  },

  /**
   * 返回
   */
  navigateBack: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 兑换漏签权益
   * @param {*} e 
   */
  clickForgetRight: function (e) {
    let that = this
    if (that.data.totalPoints < 200) {
      wx.showToast({
        title: "很抱歉，您的积分不够",
        icon: "none",
        duration: 4000
      });
      return;
    }

    wx.showModal({
      title: '提示',
      content: '是否确认兑换?',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中...',
          })
          let info = {
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl,
          }
          api.addPoints("forgetSignRight", info).then((res) => {
            console.info(res)
            if (res.result) {
              that.setData({
                totalPoints: Number(that.data.totalPoints) - 200
              })
              wx.showToast({
                title: "兑换成功",
                icon: "none",
                duration: 3000
              });
            } else {
              wx.showToast({
                title: "程序有些小异常",
                icon: "none",
                duration: 3000
              });
            }
            wx.hideLoading()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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