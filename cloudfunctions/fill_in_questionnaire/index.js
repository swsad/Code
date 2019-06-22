/*
  功能：填写问卷
  接受参数：
    qid: string 所填写的问卷id
    content: string 填写的内容（JSON转string）
    time: string 填写问卷的时间
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
    // 发布者对问卷的填写情况
    const quResult = await db.collection('qu_relation').where({
      qid: event.qid
    }).get();
    console.log(quResult);
    const uid = quResult.data[0]['uid'];
    if (wxContext.OPENID == uid) {
      throw "发布者不能填写问卷哦~";
    }

    // 重复填写情况
    const auResult = await db.collection('au_relation').where({
      qid: event.qid,
      uid: wxContext.OPENID
    }).count();
    console.log(auResult);
    if (auResult.total > 0) {
      throw "不能重复填写问卷哦~";
    }
    var questionnaire = await db.collection('questionnaire_info').doc(event.qid).get()
    var completed = (questionnaire.data.total_amount - questionnaire.data.completed_amount == 1)
    console.log('[completed]: ', completed)
    if (completed == true) {
      throw '该问卷已被填完'
    }
    await db.collection('questionnaire_info').doc(event.qid).update({
      data: {
        completed_amount: _.inc(1),
        is_all_completed: completed
      }
    })
    const result = await db.collection('answer').add({
      data: {
        content: event.content,
        qid: event.qid
      }
    })
    console.log('[result]: ', result)
    await db.collection('au_relation').add({
      data: {
        anid: result._id,
        qid: event.qid,
        uid: wxContext.OPENID
      }
    })
    // 给填问卷的用户加钱
    const reward = questionnaire.data.reward
    await db.collection('users').where({
      uid: wxContext.OPENID
    }).update({
      data: {
        points: _.inc(reward)
      }
    })
    await db.collection('balance_record').add({
      data: {
        uid: wxContext.OPENID,
        title: questionnaire.data.title,
        amount: reward,
        time: event.time
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