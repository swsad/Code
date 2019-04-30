/*
  功能：程序登入调用函数，如果用户为新用户则进入注册页面，否则返回用户所有数据，发生内部错误调用失败
  接受参数:
  无

  返回情况:
  {
    success: bool 是否调用成功
    isNew: bool 是否为新用户
    type: num 用户类型
    info: object 用户所有信息(学生：年级专业/机构：名字)
    openid: string
    error：系统内部错误
  }
*/
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    const basicInfo = await db.collection('users').where({
      uid: wxContext.OPENID
    }).get();
    if (basicInfo.data.length == 0) {
      console.log("add new user ", wxContext.OPENID)
      var addResult = await db.collection("users").add({
        data: {
          type: -1,
          is_verified: false,
          points: 100,
          uid: wxContext.OPENID
        }
      })
      return {
        success: true,
        isNew: true,
        openid: wxContext.OPENID
      }
    }
    else {
      if (basicInfo.data[0].type == 0) {
        var userInfo = await db.collection("student_info").where({
          uid: wxContext.OPENID
        }).get()
        console.log("return student info")
        return {
          success: true,
          isNew: false,
          openid: wxContext.OPENID,
          type: 0,
          info: userInfo.data
        }
      }
      else {
        var userInfo = await db.collection("organization_info").where({
          uid: wxContext.OPENID
        }).get();
        console.log("return organization info")
        return {
          success: true,
          isNew: false,
          openid: wxContext.OPENID,
          type: 1,
          info: userInfo.data
        }
      }
    }
  } catch(err) {
    return {
      success: false,
      error: err
    }
  }

}