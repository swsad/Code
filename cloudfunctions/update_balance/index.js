/*
  功能：更新用户余额（充值/提现）
  接受参数：
    amount: number 充值为正数，提现为负数
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
    const user = await db.collection('users').where({
      uid: wxContext.OPENID
    }).get()
    console.log('[user]: ', user)
    const balance = user.data.points
    if (event.amount < 0 && balance + event.amount < 0) {
      throw '余额不足，无法提现'
    }
    await db.collection('users').where({
      uid: wxContext.OPENID
    }).update({
      data: {
        points: _.inc(event.amount)
      }
    })

    console.log('[完成]: 完成余额更新')
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