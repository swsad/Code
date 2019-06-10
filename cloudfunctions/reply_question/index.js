/*
  功能：回答问题
  接受参数：
    qid: string 问题id
    time: string 回答的时间
    content: string 回答内容
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
    const question = await db.collection('question').where({
      _id: event.qid
    }).get()
    console.log('[question]: ', question)
    if (question.uid == wxContext.OPENID) {
      throw '提问者不能回答自己的提问哦~'
    }
    await db.collection('reply').add({
      data: {
        uid: wxContext.OPENID,
        qid: event.qid,
        time: event.time,
        content: event.content,
        like_count: 0
      }
    })
    console.log('[完成]: 完成回答问题')
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