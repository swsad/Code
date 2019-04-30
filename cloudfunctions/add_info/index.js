/*
 功能：添加用户基本信息
 接受参数：
 user_type: num 表示用户类型
 user_info: object  用户或组织的所有信息

 返回情况：
 {
   success: bool
   error: object  系统内部错误
 }
*/
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("[参数]: ", event)

  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  try {
    await db.collection('users').where({
      uid: wxContext.OPENID
    }).update({
      data: {
        type: event.user_type
      }
    });
    if (event.user_type == 0) {
      //student
      await db.collection('student_info').add({
        data: {
          collage: event.user_info.collage,
          major: event.user_info.major,
          uid: wxContext.OPENID,
          sid: event.user_info.sid,
          sname: event.user_info.sname
        }
      });
    }
    else {
      await db.collection('organization_info').add({
        data: {
          name: event.user_info.name,
          uid: wxContext.OPENID
        }
      });
    }
    console.log('[完成]: 成功添加信息')
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