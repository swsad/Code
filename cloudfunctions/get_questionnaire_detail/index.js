/*
  功能：获取某个问卷的详情
  接受参数：
    qid: 问卷的id
  返回情况：
    {
      success: bool 表示是否正确执行
      error: object 错误描述
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
    const result = await db.collection('questionnaire_detail').where({
      _id: event.qid
    }).get()
    console.log('[完成]: 完成获取问卷详情')
    return {
      success: true,
      value: result
    }
  } catch (err) {
    console.log('[错误]: ', err)
    return {
      success: false,
      error: err
    }
  }
}