/*
  功能：获取所有问卷
  接受参数：
    无
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
  const db = cloud.database()
  console.log('[参数]: ', event)

  try {
    const result = await db.collection('questionnaire').get()
    console.log('[完成]: 完成获取所有问卷')
    return {
      success: true,
      results: result
    }
  } catch (err) {
    console.log('[错误]: ', err)
    return {
      success: false,
      error: err
    }
  }
}