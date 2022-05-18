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
  if(kind == 0){
    return db.collection(deName)
    .limit(20)
    .where({
      end: _.gte(time.formatTimeOnly(new Date(Date.now())))
    })
    .orderBy('end', 'asc')
    .get()
  }
  else if(kind == 1){
    return db.collection(deName)
      .limit(20)
      .orderBy('browse', 'desc')
      .get()
  }
  else if(kind == 2){
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


module.exports = {
  GetDataByKind: GetDataByKind,
  GetReferral: GetReferral,
  GetDataByTitle: GetDataByTitle,
  GetRecruitmentList: GetRecruitmentList,
  GetRecruitment: GetRecruitment,
  GetMyInfoByType: GetMyInfoByType
}