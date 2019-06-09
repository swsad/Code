/*
  功能：提问
  接受参数：
    time: string 提问时间
    title: string 问题标题
    content: string 问题内容
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
    await db.collection('question').add({
      data: {
        uid: wxContext.OPENID,
        time: event.time,
        title: event.title,
        content: event.content
      }
    })   
    console.log('[完成]: 完成提问')
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