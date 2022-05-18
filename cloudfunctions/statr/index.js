// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化数据库
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let data = event.press
  data._openid = wxContext.OPENID
  let star_data = await db.collection("mini-star").where({
    press_id: data._id,
    _openid: wxContext.OPENID
  }).get()
  if (star_data.data.length == 0) {

    await db.collection('mini-recruitment').doc(data._id).update({
      data: {
        statr: _.inc(1),
      },
    })
    data._id = data._id + wxContext.OPENID
    await db.collection("mini-star").add({
      data
    })

    return "点赞成功"
  } else {
    await db.collection("mini-star").where({
      press_id: data._id,
      _openid: wxContext.OPENID
    }).remove()
    await db.collection('mini-recruitment').doc(data._id).update({
      data: {
        statr: _.inc(-1),
      },
    })
    return "取消点赞"
  }

}