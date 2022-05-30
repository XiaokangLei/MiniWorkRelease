// app.js
import {
  colorUI
} from './config/ColorUI'
// import { colorUISdk } from './config/mp-sdk'
import envId from "/config/config.js"

App({
  colorUI, //挂载到app上
  towxml: require('/towxml/index'), // 引入`towxml3.0`解析方法
  // colorUISdk,
  store: {
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    screenHeight: null,
    windowWidth: null,
    env: '',
    adState: true
  },
  globalData: {
    openid: "",
    userInfo: null,
    advert: {},
    lastLoginDate: "" //最后登录时间
  },
  getOpenId: null,
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: envId.envId,
        traceUser: true,
      });
      this.store.env = envId.envId

      this.getOpenId = (function (that) {
        return new Promise((resolve, reject) => {
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              // that.globalData.openid = res.result.openid
              that.globalData.openid = res.result.openId
              that.globalData.userId = res.result.userId
              that.globalData.avatarUrl = res.result.avatarUrl
              that.globalData.nickName = res.result.nickName
              wx.setStorageSync('openid', res.result.openId);
              wx.setStorageSync('userId', res.result.userId);
              wx.setStorageSync('avatarUrl', res.result.avatarUrl);
              wx.setStorageSync('nickName', res.result.nickName);
              console.log('[云函数] [login] 调用成功:', res.result.openId, res.result.userId, res.result.avatarUrl, res.result.nickName)
              resolve({
                openId: res.result.openId,
                avatarUrl: res.result.avatarUrl,
                nickName: res.result.nickName
              })
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
            }
          })
        })
      })(this)
    }

    this.globalData = {};
  },

  config: {
    mock: false
  },
  /**
   * 登录验证
   * @param {} cb 
   */
  checkUserInfo: function (cb) {
    let that = this
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo, true);
    } else {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = JSON.parse(res.rawData);
                typeof cb == "function" && cb(that.globalData.userInfo, true);
              }
            })
          } else {
            typeof cb == "function" && cb(that.globalData.userInfo, false);
          }
        }
      })
    }
  },

});