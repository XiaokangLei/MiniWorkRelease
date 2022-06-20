var task = require("./request.js")
import time from "./time.js"
const db = wx.cloud.database()
const _ = db.command

function GetDataByKind(dbName, kind) {
  return db.collection(dbName)
    .where({
      kind: kind
    })
    .get()
}

function GetReferral(dbName) {
  return db.collection(dbName)
    .where({
      show: true
    })
    .get()
}

function GetDataByTitle(dbName, title) {
  return db.collection(dbName)
    .where({
      title: title
    })
    .get()
}

function GetRecruitmentList(deName) {
  return db.collection(deName)
    .limit(20)
    .orderBy('_createTime', 'asc')
    .get()
}

function GetRecruitment(deName, kind) {
  if (kind == 0) {
    return db.collection(deName)
      .limit(20)
      .where({
        end: _.gte(time.formatTimeOnly(new Date(Date.now())))
      })
      .orderBy('end', 'asc')
      .get()
  } else if (kind == 1) {
    return db.collection(deName)
      .limit(20)
      .orderBy('browse', 'desc')
      .get()
  } else if (kind == 2) {
    return db.collection(deName)
      .limit(20)
      .orderBy('_createTime', 'desc')
      .get()
  }

}


function GetMyInfoByType(deName, type, openid) {
  return db.collection(deName)
    .where({
      Type: type,
      _openid: openid
    })
    .limit(20)
    .orderBy('add_time', 'asc')
    .get()
}

/**
 * 获取会员信息
 * @param {} openId 
 */
function getMemberInfo(openId) {
  return db.collection('mini_member')
    .where({
      openId: openId
    })
    .limit(1)
    .get()
}

/**
 * 获取积分明细列表
 * @param {*} page 
 * @param {*} openId 
 */
function getPointsDetailList(page, openId) {
  return db.collection('mini_point_detail')
    .where({
      openId: openId
    })
    .orderBy('createTime', 'desc')
    .skip((page - 1) * 20)
    .limit(20)
    .get()
}

function getSignedDetail(openId, year, month) {
  return wx.cloud.callFunction({
    name: 'memberService',
    data: {
      action: "getSignedDetail",
      openId: openId,
      year: year,
      month: month
    }
  })
}

/**
 * 新增签到
 */
function addSign(info) {
  return wx.cloud.callFunction({
    name: 'memberService',
    data: {
      action: "addSign",
      info: info
    }
  })
}

/**
 * 补签
 */
function addSignAgain(info) {
  return wx.cloud.callFunction({
    name: 'memberService',
    data: {
      action: "addSignAgain",
      info: info
    }
  })
}

/**
 * 获取分享明细
 * @param {} openId 
 * @param {*} date 
 */
function getShareDetailList(openId, date) {
  return db.collection('mini_share_detail')
    .where({
      shareOpenId: openId,
      date: date
    })
    .limit(5)
    .get()
}

/**
 * 分享得积分
 * @param {*} info 
 */
function addShareDetail(info) {
  return wx.cloud.callFunction({
    name: 'memberService',
    data: {
      action: "addShareDetail",
      info: info
    }
  })
}

/**
 * 新增积分
 */
function addPoints(taskType, info) {
  return wx.cloud.callFunction({
    name: 'memberService',
    data: {
      action: "addPoints",
      taskType: taskType,
      info: info
    }
  })
}

/**
 * 申请VIP
 * @param {}}  
 */
function applyVip(info) {
  return wx.cloud.callFunction({
    name: 'memberService',
    data: {
      action: "applyVip",
      info: info
    }
  })
}


module.exports = {
  GetDataByKind: GetDataByKind,
  GetReferral: GetReferral,
  GetDataByTitle: GetDataByTitle,
  GetRecruitmentList: GetRecruitmentList,
  GetRecruitment: GetRecruitment,
  GetMyInfoByType: GetMyInfoByType,
  getMemberInfo: getMemberInfo,
  getPointsDetailList: getPointsDetailList,
  getSignedDetail: getSignedDetail,
  addSign: addSign,
  getShareDetailList: getShareDetailList,
  addShareDetail: addShareDetail,
  addPoints: addPoints,
  applyVip: applyVip,
  addSignAgain: addSignAgain,
}