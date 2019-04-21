/*
  功能：发布问卷
  接受参数：
    content: string 问卷内容（JSON转string）
    description: string 对问卷的简要描述
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
  console.log('[参数]: ', event)

  try {
    const _id = await db.collection('questionnaire').add({
      data: {
        content: event.content,
        description: event.description
      }
    })
    await db.collection('qu_relation').add({
      data: {
        qid: _id,
        uid: wxContext.OPENID
      }
    })
    console.log('[完成]: 完成发布问卷')
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