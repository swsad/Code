/*
 接收并验证用户输入的验证码
 接受参数：
 code: num 用户输入验证码

 返回情况:
 {
   success: bool
   error: string/object  系统内部错误/worng code验证码不正确/code out of date验证码已过期(5分钟时效)
 }
*/
const cloud = require('wx-server-sdk')


cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  try{
    const ver_info = await db.collection('verification').where({
      uid: wxContext.OPENID
    }).get();
  // ver_info.data.length == 0 信任客户端
    console.log("left time", ((Date.parse(Date()) - Date.parse(ver_info.data[0].send_date)) / 1000 / 60));
    if (((Date.parse(Date()) - Date.parse(ver_info.data[0].send_date)) / 1000 / 60) < 5) {
      if(ver_info.data[0].ver_code == event.code) {
        await db.collection('users').where({
          uid: wxContext.OPENID
        }).update({
          data: {
            is_verified: true
          }
        })
        await db.collection('verification').where({
          uid: wxContext.OPENID
        }).remove();
        return {
          success: true
        }
      }
      else {
        throw "worng code";
      }
    }
    else {
      throw "code out of date";
    }
  } catch(err){
    return {
      success: false,
      error: err
    }
  }
}