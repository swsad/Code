/*
  功能：发布问卷
  接受参数： 
    name: string 问卷名
    publish_time: string 问卷的发布时间
    deadline: string 问卷的截止时间
    reward: string 报酬
    position: string 地点
    total_amount: number 问卷发布的总份数
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
  const _ = db.command
  console.log('[参数]: ', event)

  try {
    const result = await db.collection('questionnaire_info').add({
      data: {
        name: event.name,
        description: event.description,
        publish_time: event.publish_time,
        deadline: event.deadline,
        reward: event.reward,
        position: event.position,
        total_amount: event.total_amount,
        completed_amount: 0,
        is_all_completed: false
      }
    })
    await db.collection('questionnaire_detail').add({
      data: {
        content: event.content,
        qid: result._id
      }
    }) 
    await db.collection('qu_relation').add({
      data: {
        qid: result._id,
        uid: wxContext.OPENID
      }
    })
    const user = await db.collection('users').where({
      uid: wxContext.OPENID
    }).get()
    console.log('[user]: ', user)
    const balance = user.data.points
    if (balance < event.total_amount * event.reward) {
      throw '余额不足，无法发布问卷'
    }
    await db.collection('users').where({
      uid: wxContext.OPENID
    }).update({
      data: {
        points: _.inc(-event.total_amount * event.reward)
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