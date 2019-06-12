/*
  功能：点赞/取消点赞回复
  接受参数：
    rid: string 回复id
  返回情况：
    {
      success: bool 表示是否正确执行
      error: object 如果失败会返回错误描述
    }
*/

// 初始化
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  console.log('[参数]: ', event)

  try {
    const result = await db.collection('ur_like_relation').where({
      uid: wxContext.OPENID,
      rid: event.rid
    }).get()
    console.log('[result]: ', result.data)
    var count = result.data.length
    console.log('[count]: ', result.data.length)
    if (count == 0) {
      await db.collection('ur_like_relation').add({
        data: {
          uid: wxContext.OPENID,
          rid: event.rid
        }      
      })
      await db.collection('reply').doc(event.rid).update({
        data: {
          like_count: _.inc(1)
        }
      })
      console.log('[完成]: 完成点赞回复')
    }
    else {
      await db.collection('ur_like_relation').where({
        uid: wxContext.OPENID,
        rid: event.rid
      }).remove()
      await db.collection('reply').doc(event.rid).update({
        data: {
          like_count: _.inc(-1)
        }
      })
      console.log('[完成]: 完成取消点赞回复')
    }
    return {
      success: true
    }
  } catch (err) {
    console.log('[错误]: ', err)
    return {
      success: false,
      error: err
    }
  }
}