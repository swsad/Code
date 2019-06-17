/*
  功能：获取与当前用户相关的问答
  接受参数：
    self_ask: bool 该用户发布的问答
    self_answer: bool 该用户填写过的问答
  返回情况：
    {
      success: bool 表示是否正确执行
      value: array 问答信息数组
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
  console.log('[OPENID]: ', wxContext.OPENID)

  try {
    if (!(event.self_ask ^ event.self_answer)) {
      throw '两个参数中有且仅有一个为真'
    }
    var result = new Array()   
    if (event.self_ask == true) {
      console.log('[self_ask]')
      const qArr = await db.collection('question').where({
        uid: wxContext.OPENID
      }).get()
      console.log('[qArr]: ', qArr)
      const qData = qArr.data
      for (var i = 0; i < qData.length; i++) {
        result[i] = {
          qid: qData[i]._id,
          question_title: qData[i].title,
          question_content: qData[i].content
        }
      }
      console.log('[完成]: 完成获取当前用户提问的所有问题')
    }
    else {
      console.log('[self_answer]')
      const aArr = await db.collection('reply').where({
        uid: wxContext.OPENID
      }).get()
      console.log('[aArr]: ', aArr)
      const aData = aArr.data
      for (var i = 0; i < aData.length; i++) {
        const q = await db.collection('question').where({
          _id: aData[i].qid
        }).get()
        console.log('[question]: ', q)
        result[i] = {
          rid: aData[i]._id,
          reply: aData[i].content,
          qid: q.data[0]._id,
          question_title: q.data[0].title,
          question_content: q.data[0].content
        }
      }
      console.log('[完成]: 完成获取当前用户回答的所有问题')
    }
    console.log('[result]: ', result)
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