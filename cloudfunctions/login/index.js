const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  const basicInfo = await db.collection('users').where({
    uid: wxContext.OPENID,
  }).get();
  // if(basicInfo.data.length == 0) {
  //   console("add new user ", wxContext.OPENID)
  //   var addResult = await db.collection("users").add({
  //     uid: wxContext.OPENID,
  //     type: -1,
  //     is_verified: false,
  //     points: 100      
  //   })
  //   return {
  //     isNew: true,
  //     openid: wxContext.OPENID
  //   }
  // }
  // else {
  //   if(basicInfo.data[0].type == 0) {
  //     var userInfo = await db.collection("s_info").where({
  //       uid: wxContext.OPENID
  //     }).get()
  //     console.log("return student info")
  //     return {
  //       isNew: false,
  //       openid: wxContext.OPENID,
  //       type: 0,
  //       info: userInfo.data
  //     }
  //   }
  //   else {
  //     var userInfo = await db.collection("o_info").where({
  //       uid: wxContext.OPENID
  //     }).get();
  //     console.log("return organization info")
  //     return {
  //       isNew: false,
  //       openid: wxContext.OPENID,
  //       type: 1,
  //       info: userInfo.data
  //     }
  //   }
  // }
}
