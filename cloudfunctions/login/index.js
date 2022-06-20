const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID

  const result = await db
    .collection('mini-user')
    .where({
      _openid: openId
    })
    .get()
  const idData = result.data[0]
  var avatarUrl = ""
  var nickName = ""
  if (result.data.length < 1) {
    avatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
    nickName = "微信用户"
    await db.collection('mini-user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        _openid: openId,
        avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
        nickName: "微信用户"
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  } else {
    avatarUrl = idData.avatarUrl
    nickName = idData.nickName
  }


  return {
    userId: idData && idData._id && idData._openid ? idData._id : null,
    openId: openId,
    avatarUrl: avatarUrl,
    nickName: nickName
  }
}