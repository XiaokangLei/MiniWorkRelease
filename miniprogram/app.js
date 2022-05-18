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

  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: envId.envId,
        traceUser: true,
      });
      this.store.env = envId.envId
      console.log("this.store.env:", this.store.env)
      var openid = wx.getStorageSync('openid');
      if (openid) {
        this.globalData.openid = openid
        console.log("getStorageSync:", openid)
      } else {
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            this.globalData.openid = res.result.openId
            this.globalData.userId = res.result.userId
            this.globalData.avatarUrl = res.result.avatarUrl
            this.globalData.nickName = res.result.nickName
            wx.setStorageSync('openid', res.result.openId);
            wx.setStorageSync('userId', res.result.userId);
            wx.setStorageSync('avatarUrl', res.result.avatarUrl);
            wx.setStorageSync('nickName', res.result.nickName);
            console.log('[云函数] [login] 调用成功:', res.result.openId, res.result.userId, res.result.avatarUrl, res.result.nickName)
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
      }
    }

    this.globalData = {};
  },

  config: {
    mock: false
  },
});