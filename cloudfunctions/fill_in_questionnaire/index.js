/*
  功能：填写问卷
  接受参数：
    qid: string 所填写的问卷id
    content: string 填写的内容（JSON转string）
  返回情况：
    {
      success: bool 表示是否正确执行
      error: object 如果失败会返回错误描述
    }
*/

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  console.log('[参数]: ', event)

  try {
    const _id = await db.collection('answer').add({
      data: {
        content: event.content,
        qid: event.qid
      }
    })
    console.log(_id)
    await db.collection('au_relation').add({
      data: {
        anid: _id,
        qid: event.qid,
        uid: wxContext.OPENID
      }
    })
    console.log('[完成]: 完成填写问卷')
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