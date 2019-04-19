// 初始化
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('questionnaire').add({
      data: {
        content: event.content,
        qid: 0
      }
    })
  } catch (e) {
    console.error(e)
  }
}