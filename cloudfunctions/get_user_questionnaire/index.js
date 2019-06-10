/*
  功能：获取与当前用户相关的问卷
  接受参数：
    self_publish: bool 该用户发布的问卷
    self_fill_in: bool 该用户填写过的问卷
  返回情况：
    {
      success: bool 表示是否正确执行
      value: array 问卷信息数组
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
    if (!(event.self_publish ^ event.self_fill_in)) {
      throw '两个参数中有且仅有一个为真'
    }
    var result = new Array()
    if (event.self_publish == true) {
      console.log('[self_publish]')
      const qidArr = await db.collection('qu_relation').where({
        uid: wxContext.OPENID
      }).get()
      console.log('[qidArr]: ', qidArr)
      const data = qidArr.data
      for (var i = 0; i < data.length; i++) {
        const info = await db.collection('questionnaire_info').where({
          _id: data[i].qid
        }).get()
        console.log('[info]: ', info)
        result[i] = info.data[0];
      }
      console.log('[完成]: 完成获取当前用户发布的所有问卷')
    }
    else {
      console.log('[self_fill_in]')
      const qidArr = await db.collection('au_relation').where({
        uid: wxContext.OPENID
      }).get()
      console.log('[qidArr]: ', qidArr)
      const data = qidArr.data
      for (var i = 0; i < data.length; i++) {
        const info = await db.collection('questionnaire_info').where({
          _id: data[i].qid
        }).get()
        console.log('[info]: ', info)
        result[i] = info.data[0];
      }
      console.log('[完成]: 完成获取当前用户填过的所有问卷')
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