/*
  功能：获取当前用户余额
  接受参数：
    无
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
    const user = await db.collection('users').where({
      uid: wxContext.OPENID
    }).get()
    console.log('[user]: ', user)
    console.log('[完成]: 完成获取当前用户余额')
    return {
      success: true,
      balance: user.data[0].points
    }
  } catch (err) {
    console.log('[错误]: ', err)
    return {
      success: false,
      error: err
    }
  }
}