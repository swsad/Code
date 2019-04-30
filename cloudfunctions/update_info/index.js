/*
 功能：修改用户基本信息
 接受参数：
 user_type: num 表示用户类型
 user_info: object  用户或组织更新后的所有信息

 返回情况：
 {
   success: bool
   error: object  （假定前端传来的字段都是有效的）系统内部错误
 }
*/
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  console.log("[参数]: ", event)

  try {
    if (event.user_type == 0) {
      await db.collection('student_info').where({
        uid: wxContext.OPENID
      }).update({
        data: {
          collage: event.user_info.collage,
          major: event.user_info.major,
          sid: event.user_info.sid,
          sname: event.user_info.sname
        }
      });
      console.log('[完成]: 成功修改学生信息')
    }
    else {
      await db.collection('organization_info').where({
        uid: wxContext.OPENID
      }).update({
        data: {
          name: event.user_info.name
        }
      });
      console.log('[完成]: 成功修改机构信息')
    }
    return {
      success: true
    }
  }
  catch(err) {
    console.log('[错误]: ', err)
    return {
      success: false,
      error: err      
    }
  }
}